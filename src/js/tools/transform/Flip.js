(function () {
  var ns = $.namespace('pskl.tools.transform');

  ns.Flip = function (i18n) {
    this.toolId = 'tool-flip';
    this.helpText = i18n.flipTransformToolVertAxis();

    this.tooltipDescriptors = [{key : 'alt', description : i18n.flipTransformToolDescriptorHorizAxis()}];
    if (Constants.ENABLE_MULTIPLE_LAYERS) {
      this.tooltipDescriptors.push({key : 'ctrl', description : i18n.flipTransformToolDescriptorApplyToAllLayers()});
    }
    this.tooltipDescriptors.push({key : 'shift', description : i18n.flipTransformToolDescriptorApplyToAllFrames()});
  };

  pskl.utils.inherit(ns.Flip, ns.AbstractTransformTool);

  ns.Flip.prototype.applyToolOnFrame_ = function (frame, altKey) {
    var axis;

    if (altKey) {
      axis = ns.TransformUtils.HORIZONTAL;
    } else {
      axis = ns.TransformUtils.VERTICAL;
    }

    ns.TransformUtils.flip(frame, axis);
  };

})();