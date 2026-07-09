(function () {
  var ns = $.namespace('pskl.devtools');

  ns.TestRecordController = function (testRecorder) {
    this.testRecorder = testRecorder;
    $.subscribe(Events.TEST_RECORD_END, this.onTestRecordEnd_.bind(this));
    $.subscribe(Events.TEST_MENU_CLOSE, this.onTestMenuClose_.bind(this));
  };

  ns.TestRecordController.prototype.init  = function () {
    var fileInput = document.createElement('input');
    fileInput.setAttribute('type', 'file');
    fileInput.addEventListener('change', this.onFileInputChange_.bind(this));
    fileInput.style.display = 'none';

    var column = document.getElementsByClassName('main-column');

    var container = document.createElement('div');
    container.classList.add('dev-container')
    container.innerHTML = 'Sharp Testing Suite <br><br> ';
    document.body.appendChild(container);

    column[0].prepend(container);

    var loadInput = document.createElement('button');
    loadInput.classList.add('dev-button')
    loadInput.title = "Load a testing script of the JSON format. Examples found on official Piskel Github."
    loadInput.innerHTML = 'Load Test Script';
    loadInput.addEventListener('click', this.onLoadInputClick_.bind(this));

    var startInput = document.createElement('button');
    startInput.classList.add('dev-button')
    startInput.title = "Start recording the testing session."
    startInput.innerHTML = 'Start record';
    startInput.addEventListener('click', this.onStartInputClick_.bind(this));

    var stopInput = document.createElement('button');
    stopInput.classList.add('dev-button')
    stopInput.title = "Stop recording the testing session and save the session log file."
    stopInput.innerHTML = 'Stop record';
    stopInput.addEventListener('click', this.onStopInputClick_.bind(this));
    stopInput.setAttribute('disabled', 'disabled');

    var closeInput = document.createElement('button');
    closeInput.classList.add('dev-button')
    closeInput.title = "Close the testing menu."
    closeInput.innerHTML = 'Close Suite';
    closeInput.addEventListener('click', this.closeSuiteInput_.bind(this));

    this.container = container;
    this.fileInput = this.container.appendChild(fileInput);
    this.loadInput = this.container.appendChild(loadInput);
    this.startInput = this.container.appendChild(startInput);
    this.stopInput = this.container.appendChild(stopInput);
    this.closeInput = this.container.appendChild(closeInput);
  };

  ns.TestRecordController.prototype.onLoadInputClick_  = function () {
    this.fileInput.click();
  };

  ns.TestRecordController.prototype.onFileInputChange_  = function () {
    var files = this.fileInput.files;
    if (files.length == 1) {
      var file = files[0];
      pskl.utils.FileUtils.readFile(file, function (content) {
        var testRecord = JSON.parse(window.atob(content.replace(/data\:.*?\;base64\,/, '')));
        var testPlayer = new ns.DrawingTestPlayer(testRecord);
        testPlayer.start();
      }.bind(this));
    }
  };

  ns.TestRecordController.prototype.onStartInputClick_  = function () {
    this.testRecorder.startRecord();
    this.startInput.setAttribute('disabled', 'disabled');
    this.stopInput.removeAttribute('disabled');
  };

  ns.TestRecordController.prototype.onStopInputClick_  = function () {
    var testRecord = this.testRecorder.stopRecord();

    pskl.utils.BlobUtils.stringToBlob(testRecord, function(blob) {
      pskl.utils.FileUtils.downloadAsFile(blob, 'record_piskel.json');
    }.bind(this), 'application/json');

    this.startInput.removeAttribute('disabled');
    this.stopInput.setAttribute('disabled', 'disabled');
  };

  ns.TestRecordController.prototype.onTestRecordEnd_  = function (evt, success) {
    window.alert('Test finished : ' + (success ? 'success' : 'failed'));
  };

  ns.TestRecordController.prototype.onTestMenuClose_  = function (evt, success) {
    window.alert('Test menu close : ' + (success ? 'success' : 'failed'));
  };

  ns.TestRecordController.prototype.closeSuiteInput_  = function () {
    var remove = document.getElementsByClassName('dev-container');

    Array.from(remove).forEach(element => {
      element.remove();
  })};

})();
