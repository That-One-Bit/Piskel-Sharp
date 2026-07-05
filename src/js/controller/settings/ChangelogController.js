(function () {
  var ns = $.namespace('pskl.controller.settings');

  ns.ChangelogController = function (piskelController) {
    this.piskelController = piskelController;
  };

  pskl.utils.inherit(ns.ChangelogController, pskl.controller.settings.AbstractSettingController);

  ns.ChangelogController.prototype.init = function() {
    var container = document.querySelector('.settings-section-changelog');
    
	this.addEventListener('.changelog-sharp-button', 'click', this.viewPiskelSharpChangelog_);
    this.addEventListener('.changelog-button', 'click', this.viewPiskelChangelog_);
    this.addEventListener('.future-plans-button', 'click', this.viewFuturePlans_);
    this.addEventListener('.credits-button', 'click', this.viewCredits_);
    };

  ns.ChangelogController.prototype.destroy = function () {
	console.log('ChangelogController closed successfully!')
  };

  ns.ChangelogController.prototype.closeDrawer = function () {
	$.publish(Events.CLOSE_SETTINGS_DRAWER);
  };

   ns.ChangelogController.prototype.viewPiskelSharpChangelog_ = function (evt) {
    $.publish(Events.DIALOG_SHOW, {
      dialogId : 'changelog-sharp'
    });
    this.closeDrawer_();
  };

  ns.ChangelogController.prototype.viewPiskelChangelog_ = function (evt) {
    $.publish(Events.DIALOG_SHOW, {
      dialogId : 'changelog-piskel'
    });
    this.closeDrawer_();
  };

  ns.ChangelogController.prototype.viewFuturePlans_ = function (evt) {
    $.publish(Events.DIALOG_SHOW, {
      dialogId : 'changelog-future'
    });
    this.closeDrawer_();
  };

  ns.ChangelogController.prototype.viewCredits_ = function (evt) {
    $.publish(Events.DIALOG_SHOW, {
      dialogId : 'credits'
    });
    this.closeDrawer_();
  };
})();
