/**
 * @provide pskl.tools.drawing.Rectangle
 *
 * @require pskl.utils
 */
(function() {
  var ns = $.namespace('pskl.tools.drawing');

  ns.Rectangle = function(i18n) {
    ns.ShapeTool.call(this, i18n);

    this.toolId = 'tool-rectangle';
    this.helpText = i18n.rectangleDrawingTool();
    this.shortcut = pskl.service.keyboard.Shortcuts.TOOL.RECTANGLE;
  };

  pskl.utils.inherit(ns.Rectangle, ns.ShapeTool);

  /**
   * @override
   */
  ns.Rectangle.prototype.draw = function (col, row, color, targetFrame, penSize) {
    var rectangle = pskl.PixelUtils.getOrderedRectangleCoordinates(this.startCol, this.startRow, col, row);

    if (event.ctrlKey) {
      for (var x = rectangle.x0; x <= rectangle.x1; x++) {
      for (var y = rectangle.y0; y <= rectangle.y1; y++) {
        targetFrame.setPixel(x, y, color);
    }}} else {
      for (var x = rectangle.x0; x <= rectangle.x1; x++) {
      for (var y = rectangle.y0; y <= rectangle.y1; y++) {
        if (
          x > rectangle.x1 - penSize ||
          x < rectangle.x0 + penSize ||
          y > rectangle.y1 - penSize ||
          y < rectangle.y0 + penSize
        ) {
          targetFrame.setPixel(x, y, color);
        }
      }
    }
    }
  };
})();
