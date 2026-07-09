/**
 * @provide pskl.tools.drawing.TogglePen
 *
 * @require pskl.utils
 */
(function() {
  var ns = $.namespace('pskl.tools.drawing');

  ns.TogglePen = function(i18n) {
    this.toolId = 'tool-toggle-pen';
    this.helpText = i18n.pencilDrawingTool();
    this.tooltipDescriptors = [
      {
        description: i18n.pencilDrawingToolDescriptorDescription() },
    ];
    this.shortcut = pskl.service.keyboard.Shortcuts.TOOL.TOGGLE_PEN;

    this.previousCol = null;
    this.previousRow = null;
    
    // track active color during stroke
    this.activeColor = null;

    this.pixels = [];
  };

  pskl.utils.inherit(ns.TogglePen, ns.BaseTool);

  ns.TogglePen.prototype.supportsDynamicPenSize = function() {
    return true;
  };

  /**
   * @override
   */
  ns.TogglePen.prototype.applyToolAt = function(col, row, frame, overlay, event) {
    this.previousCol = col;
    this.previousRow = row;

    // if we're not tracking the active color this is a new stroke
    if (this.activeColor == null) {
      // get color under cursor
      this.activeColor = pskl.utils.intToColor(frame.getPixel(col, row));
      // draw the opposite color
      if (this.activeColor == pskl.app.selectedColorsService.getPrimaryColor()) {
        this.activeColor = pskl.app.selectedColorsService.getSecondaryColor();
      } else {
        // default to primary color
        this.activeColor = pskl.app.selectedColorsService.getPrimaryColor();
      }
    }

    this.drawUsingPenSize(this.activeColor, col, row, frame, overlay);
  };

  ns.TogglePen.prototype.drawUsingPenSize = function(color, col, row, frame, overlay) {
    var penSize = pskl.app.penSizeService.getPenSize();
    var points = pskl.PixelUtils.resizePixel(col, row, penSize);
    points.forEach(function (point) {
      this.draw(this.activeColor, point[0], point[1], frame, overlay);
    }.bind(this));
  };

  ns.TogglePen.prototype.draw = function(color, col, row, frame, overlay) {

    overlay.setPixel(col, row, this.activeColor);
    if (this.activeColor === Constants.TRANSPARENT_COLOR) {
      frame.setPixel(col, row, this.activeColor);
    }
    this.pixels.push({
      col : col,
      row : row,
      color : this.activeColor
    });
  };

  /**
   * @override
   */
  ns.TogglePen.prototype.moveToolAt = function(col, row, frame, overlay, event) {
    if ((Math.abs(col - this.previousCol) > 1) || (Math.abs(row - this.previousRow) > 1)) {
      // The pen movement is too fast for the mousemove frequency, there is a gap between the
      // current point and the previously drawn one.
      // We fill the gap by calculating missing dots (simple linear interpolation) and draw them.
      var interpolatedPixels = pskl.PixelUtils.getLinePixels(col, this.previousCol, row, this.previousRow);
      for (var i = 0, l = interpolatedPixels.length ; i < l ; i++) {
        var coords = interpolatedPixels[i];
        this.applyToolAt(coords.col, coords.row, frame, overlay, event);
      }
    } else {
      this.applyToolAt(col, row, frame, overlay, event);
    }

    this.previousCol = col;
    this.previousRow = row;
  };

  ns.TogglePen.prototype.releaseToolAt = function(col, row, frame, overlay, event) {
    // apply on real frame
    this.setPixelsToFrame_(frame, this.pixels);

    // stop tracking active color
    this.activeColor = null;

    // save state
    this.raiseSaveStateEvent({
      pixels : this.pixels.slice(0),
      color : this.getToolColor()
    });

    // reset
    this.resetUsedPixels_();
  };

  ns.TogglePen.prototype.replay = function (frame, replayData) {
    this.setPixelsToFrame_(frame, replayData.pixels, replayData.color);
  };

  ns.TogglePen.prototype.setPixelsToFrame_ = function (frame, pixels, color) {
    pixels.forEach(function (pixel) {
      frame.setPixel(pixel.col, pixel.row, pixel.color);
    });
  };

  ns.TogglePen.prototype.resetUsedPixels_ = function() {
    this.pixels = [];
  };
})();
