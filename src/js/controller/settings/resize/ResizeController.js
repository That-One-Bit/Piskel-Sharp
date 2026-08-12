(function () {
  var ns = $.namespace('pskl.controller.settings.resize');

  ns.ResizeController = function (piskelController, i18n) {
    this.createResizeDom_(i18n);
    this.piskelController = piskelController;

    this.container = document.querySelector('.resize-canvas');

    var anchorWidgetContainer = this.container.querySelector('.resize-anchor-container');
    this.anchorWidget = new pskl.widgets.AnchorWidget(anchorWidgetContainer);
    this.defaultSizeController = new ns.DefaultSizeController(piskelController);
  };

  pskl.utils.inherit(ns.ResizeController, pskl.controller.settings.AbstractSettingController);

  ns.ResizeController.prototype.init = function () {
    this.widthInput = this.container.querySelector('[name="resize-width"]');
    this.heightInput = this.container.querySelector('[name="resize-height"]');
    this.resizeForm = this.container.querySelector('form');

    // Make sure that the classes are correct in the template, as this has been an issue before
    this.resizeContentCheckbox = this.container.querySelector('.resize-content-checkbox');
    this.maintainRatioCheckbox = this.container.querySelector('.resize-ratio-checkbox');

    this.sizeInputWidget = new pskl.widgets.SizeInput({
      widthInput: this.widthInput,
      heightInput: this.heightInput,
      initWidth: this.piskelController.getWidth(),
      initHeight: this.piskelController.getHeight(),
    });

    var settings = pskl.UserSettings.get('RESIZE_SETTINGS');
    var origin = pskl.widgets.AnchorWidget.ORIGIN[settings.origin] || 'TOPLEFT';
    this.anchorWidget.setOrigin(origin);

    if (settings.resizeContent) {
      this.resizeContentCheckbox.checked = true;
      this.anchorWidget.disable();
    }

    if (settings.maintainRatio) {
      this.maintainRatioCheckbox.checked = true;
    } else {
      // the SizeInput widget is enabled by default
      this.sizeInputWidget.disableSync();
    }

    this.addEventListener(this.resizeForm, 'submit', this.onResizeFormSubmit_);
    this.addEventListener(this.resizeContentCheckbox, 'change', this.onResizeContentChange_);
    this.addEventListener(this.maintainRatioCheckbox, 'change', this.onMaintainRatioChange_);

    this.defaultSizeController.init();
  };

  ns.ResizeController.prototype.destroy = function () {
    this.updateUserPreferences_();

    this.anchorWidget.destroy();
    this.sizeInputWidget.destroy();
    this.superclass.destroy.call(this);
  };

  ns.ResizeController.prototype.onResizeFormSubmit_ = function (evt) {
    evt.preventDefault();

    var currentPiskel = this.piskelController.getPiskel();
    var piskel = pskl.utils.ResizeUtils.resizePiskel(currentPiskel, {
      width :  parseInt(this.widthInput.value, 10),
      height :  parseInt(this.heightInput.value, 10),
      origin: this.anchorWidget.getOrigin(),
      resizeContent: this.resizeContentCheckbox.checked
    });

    pskl.app.piskelController.setPiskel(piskel, {
      preserveState: true
    });

    $.publish(Events.CLOSE_SETTINGS_DRAWER);
  };

  ns.ResizeController.prototype.onResizeContentChange_ = function (evt) {
    var target = evt.target;
    if (target.checked) {
      this.anchorWidget.disable();
    } else {
      this.anchorWidget.enable();
    }
  };

  ns.ResizeController.prototype.onMaintainRatioChange_ = function (evt) {
    var target = evt.target;
    if (target.checked) {
      this.sizeInputWidget.enableSync();
    } else {
      this.sizeInputWidget.disableSync();
    }
  };

  ns.ResizeController.prototype.updateUserPreferences_ = function () {
    pskl.UserSettings.set('RESIZE_SETTINGS', {
      origin : this.anchorWidget.getOrigin(),
      resizeContent : !!this.resizeContentCheckbox.checked,
      maintainRatio : !!this.maintainRatioCheckbox.checked
    });
  };

  ns.ResizeController.prototype.createResizeTitleDefault = function (i18n) {
    var templateData = {
      text: i18n.resizeSettingSectionDefaultTitle()
    };
    var templateId = 'resize-settings-template';
    return pskl.utils.Template.fillInTemplate(templateId, templateData);
  };

  ns.ResizeController.prototype.createResizeTitle = function (i18n) {
    var templateData = {
      text: i18n.resizeSettingSectionTitle()
    };
    var templateId = 'resize-settings-template';
    return pskl.utils.Template.fillInTemplate(templateId, templateData);
  };

  ns.ResizeController.prototype.createResizeCanvasForm = function (i18n) {
    var html = '';

    // Width
    // ----------------------------
    var templateData = {
      inputName: 'resize-width',
      spanText: i18n.resizeSettingSectionWidth()
    };
    var templateId = 'resize-tool-template';
    html += pskl.utils.Template.fillInTemplate(templateId, templateData);

    // Height
    // ----------------------------
    templateData = {
      inputName: 'resize-height',
      spanText: i18n.resizeSettingSectionHeight()
    };
    templateId = 'resize-tool-template';
    html += pskl.utils.Template.fillInTemplate(templateId, templateData);

    // Checkbox
    // ----------------------------
    templateData = {
      cssClass: 'resize-ratio-checkbox',
      spanText: i18n.resizeSettingSectionMaintainAspectRatio()
    };
    templateId = 'ratio-canvas-template';
    html += pskl.utils.Template.fillInTemplate(templateId, templateData);

    // Ratio
    // ----------------------------
    templateData = {
      cssClass: 'resize-content-checkbox',
      spanText: i18n.resizeSettingSectionResizeCanvasContent()
    };
    templateId = 'ratio-canvas-template';
    html += pskl.utils.Template.fillInTemplate(templateId, templateData);

    // Anchor
    // ----------------------------
    templateData = {
      spanText: i18n.resizeSettingSectionAnchor()
    };
    templateId = 'resize-anchor-template';
    html += pskl.utils.Template.fillInTemplate(templateId, templateData);

    // Submit Button
    // ----------------------------
    templateData = {
      valueText: i18n.resizeSettingSectionSubmitButton()
    };
    templateId = 'resize-button-template';
    html += pskl.utils.Template.fillInTemplate(templateId, templateData);

    return html;
  };

  ns.ResizeController.prototype.createResizeCanvasDefaultForm = function (i18n) {
    var html = '';

    // Default Width
    // ----------------------------
    var templateData = {
      spanText: i18n.resizeSettingSectionDefaultWidth(),
      inputName: 'default-width'
    };
    var templateId = 'resize-tool-template';
    html += pskl.utils.Template.fillInTemplate(templateId, templateData);

    // Default Height
    // ----------------------------
    templateData = {
      spanText: i18n.resizeSettingSectionDefaultHeight(),
      inputName: 'default-height'
    };
    templateId = 'resize-tool-template';
    html += pskl.utils.Template.fillInTemplate(templateId, templateData);

    // Default Submit Button
    // ----------------------------
    templateData = {
      valueText: i18n.resizeSettingSectionDefaultSubmitButton()
    };
    templateId = 'resize-button-template';
    html += pskl.utils.Template.fillInTemplate(templateId, templateData);

    return html;
  };

   /**
   * @private
   */
  ns.ResizeController.prototype.createResizeDom_ = function (i18n) {
    var html = '';
    var resizeTitleHtml = this.createResizeTitle(i18n);
    html += resizeTitleHtml;
    $('#settings-title').html(html);

    html = '';
    var resizeCanvasFormHtml = this.createResizeCanvasForm(i18n);
    html += resizeCanvasFormHtml;
    $('#resize-canvas-form').html(html);

    html = '';
    var resizeTitleDefaultHtml = this.createResizeTitleDefault(i18n);
    html += resizeTitleDefaultHtml;
    $('#settings-title-default').html(html);

    html = '';
    var resizeCanvasFormDefaultHtml = this.createResizeCanvasDefaultForm(i18n);
    html += resizeCanvasFormDefaultHtml;
    $('#default-size-form').html(html);
  };

  ns.ResizeController.prototype.switchLocale_ = function (i18n) {
    this.i18n = i18n;
    this.this = ns.ResizeController;

    var selection = document.querySelector(
      '.icon-settings-resize-white'
    );

    if (selection) {
      selection.setAttribute(
        'data-original-title',
        '<span class="highlight">' +
          this.i18n.resizeSetting() +
          '</span><br>' +
          this.i18n.resizeSettingDescriptorResizeTheDrawingArea()
      );
    }

    this.this(i18n);
  };
})();
