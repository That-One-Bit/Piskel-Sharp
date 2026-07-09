( function switchLocale(localeCode) {
  var ns = $.namespace('pskl.controller');
  window.piskel_locale = localeCode;
  window.i18n = window.piskel_locales[localeCode];

  // Re-init controllers
  pskl.app.previewController.init();
  pskl.app.previewActionsController.init();
  pskl.app.toolController.init();
  pskl.app.toolboxController.init();
  pskl.app.framesListController.init();
  pskl.app.layersListController.init();
  pskl.app.settingsController.init();
  pskl.app.paletteController.init();

  // Rebuild UI
  pskl.app.toolController.createToolPanels_();
  pskl.app.toolboxController.createToolboxPanels_();
  pskl.app.framesListController.render();
  pskl.app.layersListController.render();
})();