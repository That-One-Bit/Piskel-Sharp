/**
 * @provide pskl.tools.drawing.ShiftIndex
 *
 * @require Constants
 * @require pskl.utils
 */
(function() {
  var ns = $.namespace('pskl.tools.drawing');

  ns.ShiftIndex = function(i18n) {
    this.superclass.constructor.call(this, i18n);

    this.toolId = 'tool-shift-index';
    this.helpText = i18n.shiftIndexDrawingTool();
    this.shortcut = pskl.service.keyboard.Shortcuts.TOOL.SHIFT_INDEX;

    this.tooltipDescriptors = [
      { description: i18n.shiftIndexDescriptorUsage() },
			{ key: 'ctrl', description: i18n.shiftIndexDescriptorShiftBack() },
    ];
  };

  pskl.utils.inherit(ns.ShiftIndex, ns.SimplePen);

	/**
	 * @Override
	 */
  ns.ShiftIndex.prototype.applyToolAt = function(col, row, frame, overlay, event) {
    if (row !== this.previousRow || col !== this.previousCol) {
      var penSize = pskl.app.penSizeService.getPenSize();
      var points = pskl.PixelUtils.resizePixel(col, row, penSize);
      points.forEach(
				function(point) {
  var modifiedColor = this.getModifiedColor_(point[0], point[1], frame, overlay, event);
  this.draw(modifiedColor, point[0], point[1], frame, overlay);
}.bind(this)
			);
    }
    this.previousCol = col;
    this.previousRow = row;
  };

  ns.ShiftIndex.prototype.getModifiedColor_ = function(col, row, frame, overlay, event) {
    var pixelColor = frame.getPixel(col, row);
    var isTransparent = pixelColor === pskl.utils.colorToInt(Constants.TRANSPARENT_COLOR);
    if (isTransparent) {
		// Ignore transparent pixels.
      return Constants.TRANSPARENT_COLOR;
    }

    var overlayColor = overlay.getPixel(col, row);
    var isPixelModified = overlayColor !== pskl.utils.colorToInt(Constants.TRANSPARENT_COLOR);
    if (isPixelModified) {
		// This pixel was already updated by the tool, reuse the current color
		// buffered in the overlay.
      return overlayColor;
    }

    var backward = pskl.utils.UserAgent.isMac ? event.metaKey : event.ctrlKey;
    var color = pskl.utils.intToHex(pixelColor);
    var colorPalette = pskl.app.palettesListController.getSelectedPaletteColors_();
    var startPoint = colorPalette.indexOf(pskl.app.selectedColorsService.getPrimaryColor());
    colorPalette.splice(0,startPoint);
    var index = colorPalette.indexOf(color);
    var range = colorPalette.indexOf(pskl.app.selectedColorsService.getSecondaryColor()) + 1;
    startPoint = index - (index % range);
    var colorsInCycleRange = colorPalette.slice(startPoint, startPoint + range);
    index = colorsInCycleRange.indexOf(color);
    if (index !== -1) {
      if (backward) {
        index -= 1;
      } else {
        index += 1;
      }
      if (index < 0) {
        index = 0;
      } else if (index > colorsInCycleRange.length - 1) {
        index = colorsInCycleRange.length - 1;
      }
      color = colorsInCycleRange[index];
    }
    return color;
  };
})();