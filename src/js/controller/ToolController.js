(function () {
  var ns = $.namespace('pskl.controller');

  ns.ToolController = function (i18n) {

    this.tools = [
      new pskl.tools.drawing.TogglePen(i18n),
      new pskl.tools.drawing.SimplePen(i18n),
      new pskl.tools.drawing.VerticalMirrorPen(i18n),
      new pskl.tools.drawing.Eraser(i18n),
      new pskl.tools.drawing.ColorSwap(i18n),
      new pskl.tools.drawing.Stroke(i18n),
      new pskl.tools.drawing.Rectangle(i18n),
      new pskl.tools.drawing.Circle(i18n),
      new pskl.tools.drawing.Move(i18n),
      new pskl.tools.drawing.selection.ShapeSelect(i18n),
      new pskl.tools.drawing.selection.RectangleSelect(i18n),
      new pskl.tools.drawing.selection.LassoSelect(i18n),
      new pskl.tools.drawing.Lighten(i18n),
      new pskl.tools.drawing.ShiftIndex(i18n),
      new pskl.tools.drawing.DitheringTool(i18n),
      new pskl.tools.drawing.ColorPicker(i18n),
      new pskl.tools.drawing.PaintBucket(i18n),
      new pskl.tools.drawing.Outliner(i18n)
    ];

    this.toolIconBuilder = new pskl.tools.ToolIconBuilder();
  };

  /**
   * @public
   */
  ns.ToolController.prototype.init = function() {
    this.createToolsDom_();
    this.addKeyboardShortcuts_();

    // Initialize tool:
    // Set SimplePen as default selected tool:
    this.selectTool_(this.tools[0]);
    // Activate listener on tool panel:
    var toolSection = document.querySelector('#tool-section');
    toolSection.addEventListener('mousedown', this.onToolIconClicked_.bind(this));

    $.subscribe(Events.SELECT_TOOL, this.onSelectToolEvent_.bind(this));
    $.subscribe(Events.SHORTCUTS_CHANGED, this.createToolsDom_.bind(this));
  };

  /**
   * @private
   */
  ns.ToolController.prototype.activateToolOnStage_ = function(tool) {
    var stage = document.body;
    var previousSelectedToolClass = stage.dataset.selectedToolClass;
    if (previousSelectedToolClass) {
      stage.classList.remove(previousSelectedToolClass);
      stage.classList.remove(pskl.tools.drawing.Move.TOOL_ID);
    }
    stage.classList.add(tool.toolId);
    stage.dataset.selectedToolClass = tool.toolId;
  };

  ns.ToolController.prototype.onSelectToolEvent_ = function(event, toolId) {
    var tool = this.getToolById_(toolId);
    if (tool) {
      this.selectTool_(tool);
    }
  };

  /**
   * @private
   */
  ns.ToolController.prototype.selectTool_ = function(tool) {
    this.currentSelectedTool = tool;
    this.activateToolOnStage_(this.currentSelectedTool);

    var selectedToolElement = document.querySelector('#tool-section .tool-icon.selected');
    if (selectedToolElement) {
      selectedToolElement.classList.remove('selected');
    }

    var toolElement = document.querySelector('[data-tool-id=' + tool.toolId + ']');
    toolElement.classList.add('selected');

    $.publish(Events.TOOL_SELECTED, [tool]);
  };

  /**
   * @private
   */
  ns.ToolController.prototype.onToolIconClicked_ = function(evt) {
    var target = evt.target;
    var clickedTool = pskl.utils.Dom.getParentWithData(target, 'toolId');

    if (clickedTool) {
      var toolId = clickedTool.dataset.toolId;
      var tool = this.getToolById_(toolId);
      if (tool) {
        this.selectTool_(tool);
      }
    }
  };

  ns.ToolController.prototype.onKeyboardShortcut_ = function(toolId, charkey) {
    var tool = this.getToolById_(toolId);
    if (tool !== null) {
      this.selectTool_(tool);
    }
  };

  ns.ToolController.prototype.getToolById_ = function (toolId) {
    return pskl.utils.Array.find(this.tools, function (tool) {
      return tool.toolId == toolId;
    });
  };

  /**
   * @private
   */
  ns.ToolController.prototype.createToolsDom_ = function() {
    var html = '';
    for (var i = 0 ; i < this.tools.length ; i++) {
      var tool = this.tools[i];
      html += this.toolIconBuilder.createIcon(tool);
    }
    document.querySelector('#tools-container').innerHTML = html;
  };

  ns.ToolController.prototype.addKeyboardShortcuts_ = function () {
    for (var i = 0 ; i < this.tools.length ; i++) {
      var tool = this.tools[i];
      pskl.app.shortcutService.registerShortcut(tool.shortcut, this.onKeyboardShortcut_.bind(this, tool.toolId));
    }
  };
})();
