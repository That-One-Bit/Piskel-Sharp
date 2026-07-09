/**
 * @provide pskl.tools.drawing.Eraser
 *
 * @require Constants
 * @require pskl.utils
 */
(function() {
  var ns = $.namespace('pskl.tools.drawing');

  ns.Eraser = function(i18n) {
    this.superclass.constructor.call(this, i18n);

    this.toolId = 'tool-eraser';
    this.helpText = i18n.eraserDrawingTool();
    this.shortcut = pskl.service.keyboard.Shortcuts.TOOL.ERASER;
  };

  pskl.utils.inherit(ns.Eraser, ns.SimplePen);

  /**
   * @override
   */
  ns.Eraser.prototype.getToolColor = function() {
    return Constants.TRANSPARENT_COLOR;
  };
})();
