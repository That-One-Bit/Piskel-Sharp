(function () {
  var ns = $.namespace('pskl.tools.transform');

  ns.Center = function (i18n) {
    this.i18n = i18n;
    this.toolId = 'tool-center';
    this.helpText = this.i18n.centerTransformTool();
    this.tooltipDescriptors = [];
    if (Constants.ENABLE_MULTIPLE_LAYERS) {
      this.tooltipDescriptors.push({key : 'ctrl', description : i18n.centerTransformToolDescriptorApplyToAllLayers()});
    }
    this.tooltipDescriptors.push({key : 'shift', description : i18n.centerTransformToolDescriptorApplyToAllFrames()});
  };

  pskl.utils.inherit(ns.Center, ns.AbstractTransformTool);

  ns.Center.prototype.applyToolOnFrame_ = function (frame) {
    ns.TransformUtils.center(frame);
  };

})();