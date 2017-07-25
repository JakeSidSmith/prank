'use strict';

(function () {

  var fs = require('fs');
  var vm = require('vm');
  var glob = require('glob');

  var utils = require('./utils');
  var CONSTANTS = require('./constants');

  function fakeConsole (key) {
    return function () {
      var args = Array.prototype.slice.call(arguments);
      console[key].apply(console, ['Hello!'].concat(args));
    };
  }

  var SANDBOX = {
    console: {
      log: fakeConsole('log'),
      warn: fakeConsole('warn'),
      info: fakeConsole('info'),
      error: fakeConsole('error')
    },
    setTimeout: setTimeout // TOTO: Fake timeouts
  };

  function program (tree) {
    console.log(tree);

    var pattern = utils.getDefault(tree.args.pattern, CONSTANTS.DEFAULT_PATTERN);
    var files = glob.sync(pattern);

    console.log(files);

    utils.forEach(files, function (filepath) {
      var content = '(function(){' + fs.readFileSync(filepath, 'utf8') + '})()';
      var options = {filename: filepath, timeout: 5000};
      var script = new vm.Script(content, options);

      try {
        script.runInNewContext(SANDBOX, options);
      } catch (error) {
        console.error(error.message);
      }
    });

    console.log('Complete');
  }

  module.exports = program;

})();
