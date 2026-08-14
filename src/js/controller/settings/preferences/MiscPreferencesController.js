(function () {
  var ns = $.namespace('pskl.controller.settings.preferences');

  ns.MiscPreferencesController = function (piskelController, preferencesController) {
    this.piskelController = piskelController;
    this.preferencesController = preferencesController;
  };

  pskl.utils.inherit(ns.MiscPreferencesController, pskl.controller.settings.AbstractSettingController);

  ns.MiscPreferencesController.prototype.init = function () {
    this.backgroundContainer = document.querySelector('.background-picker-wrapper');
    this.addEventListener(this.backgroundContainer, 'click', this.onBackgroundClick_);

    // Highlight selected background
    var background = pskl.UserSettings.get(pskl.UserSettings.CANVAS_BACKGROUND);
    var selectedBackground = this.backgroundContainer.querySelector('[data-background=' + background + ']');
    if (selectedBackground) {
      selectedBackground.classList.add('selected');
    }

    // Max FPS
    var maxFpsInput = document.querySelector('.max-fps-input');
    maxFpsInput.value = pskl.UserSettings.get(pskl.UserSettings.MAX_FPS);
    this.addEventListener(maxFpsInput, 'change', this.onMaxFpsChange_);

    // === REFACTORED: Custom Color Format Dropdown ===
    var colorFormat = pskl.UserSettings.get(pskl.UserSettings.COLOR_FORMAT) || 'hex';
    var colorDisplay = document.getElementById('current-color-format-display');
    if (colorDisplay) {
      // Set initial loaded state text (Capitalize first letter safely for Hex/RGB presentation)
      colorDisplay.textContent = colorFormat === 'rgb' ? 'RGB' : 'Hex';
    }
    var colorOptionsList = document.querySelector('.color-format-options');
    if (colorOptionsList) {
      this.addEventListener(colorOptionsList, 'click', this.onColorFormatCustomClick_);
    }

    // === REFACTORED: Custom Language Dropdown ===
    var currentLocale = window.piskel_locale || 'en_US';
    var localeDisplay = document.getElementById('current-locale-display');
    if (localeDisplay) {
      // Set initial loaded state text
      localeDisplay.textContent = currentLocale;
    }
    var languageOptionsList = document.querySelector('.language-options');
    if (languageOptionsList) {
      this.addEventListener(languageOptionsList, 'click', this.onLanguageCustomClick_);
    }

    // Layer preview opacity
    var layerOpacityInput = document.querySelector('.layer-opacity-input');
    layerOpacityInput.value = pskl.UserSettings.get(pskl.UserSettings.LAYER_OPACITY);
    this.addEventListener(layerOpacityInput, 'change', this.onLayerOpacityChange_);
    this.addEventListener(layerOpacityInput, 'input', this.onLayerOpacityChange_);
    this.updateLayerOpacityText_(layerOpacityInput.value);

    // Ignore enabled
    var isEnabled = pskl.UserSettings.get(pskl.UserSettings.IGNORE_ENABLED);
    var ignoreWarningsCheckbox = document.querySelector('.ignore-warnings-checkbox');
    if (isEnabled) {
      ignoreWarningsCheckbox.setAttribute('checked', 'true');
    }
    this.addEventListener(ignoreWarningsCheckbox, 'change', this.onIgnoreWarningsChange_);
  };

  ns.MiscPreferencesController.prototype.onBackgroundClick_ = function (evt) {
    var target = evt.target;
    var background = target.dataset.background;
    if (background) {
      pskl.UserSettings.set(pskl.UserSettings.CANVAS_BACKGROUND, background);
      var selected = this.backgroundContainer.querySelector('.selected');
      if (selected) {
        selected.classList.remove('selected');
      }
      target.classList.add('selected');
    }
  };

  // === NEW HANDLER: Custom Color Format Option Click ===
  ns.MiscPreferencesController.prototype.onColorFormatCustomClick_ = function (evt) {
    var button = evt.target.closest('button');
    if (!button) return;

    var formatValue = button.getAttribute('data-value');
    if (formatValue) {
      // 1. Set values natively
      pskl.UserSettings.set(pskl.UserSettings.COLOR_FORMAT, formatValue);
      
      // 2. Refresh UI text and break CSS checkbox toggle loop to close layout
      document.getElementById('current-color-format-display').textContent = button.textContent;
      document.getElementById('color-format-toggle').checked = false;
    }
  };

  // === NEW HANDLER: Custom Language Option Click ===
  ns.MiscPreferencesController.prototype.onLanguageCustomClick_ = function (evt) {
    var button = evt.target.closest('button');
    if (!button) return;

    var localeValue = button.getAttribute('data-value');
    if (localeValue) {
      setTimeout(function() {
        pskl.app.switchLocale(localeValue);
      }, 1)

      // 2. Refresh UI text and break CSS checkbox toggle loop to close layout
      document.getElementById('current-locale-display').textContent = button.textContent;
      document.getElementById('locale-toggle').checked = false;
    }
  };

  ns.MiscPreferencesController.prototype.onMaxFpsChange_ = function (evt) {
    var target = evt.target;
    var fps = parseInt(target.value, 10);
    if (fps && !isNaN(fps)) {
      pskl.UserSettings.set(pskl.UserSettings.MAX_FPS, fps);
    } else {
      target.value = pskl.UserSettings.get(pskl.UserSettings.MAX_FPS);
    }
  };

  ns.MiscPreferencesController.prototype.onLayerOpacityChange_ = function (evt) {
    var target = evt.target;
    var opacity = parseFloat(target.value);
    if (!isNaN(opacity)) {
      pskl.UserSettings.set(pskl.UserSettings.LAYER_OPACITY, opacity);
      pskl.UserSettings.set(pskl.UserSettings.LAYER_PREVIEW, opacity !== 0);
      this.updateLayerOpacityText_(opacity);
    } else {
      target.value = pskl.UserSettings.get(pskl.UserSettings.LAYER_OPACITY);
    }
  };

  ns.MiscPreferencesController.prototype.updateLayerOpacityText_ = function (opacity) {
    var layerOpacityText = document.querySelector('.layer-opacity-text');
    layerOpacityText.innerHTML = (opacity * 1).toFixed(2);
  };

  ns.MiscPreferencesController.prototype.onIgnoreWarningsChange_ = function (evt) {
    pskl.UserSettings.set(pskl.UserSettings.IGNORE_ENABLED, evt.currentTarget.checked);
  };
})();
