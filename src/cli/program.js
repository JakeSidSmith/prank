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

  var currentSuite = '';
  var currentTest = '';

  function describe (name, fn) {
    currentSuite = name;

    try {
      fn();
    } catch (error) {
      console.error(currentSuite + ' Failed!');
      console.error(error.message);
      return;
    }
  }

  function it (name, fn) {
    currentTest = name;

    try {
      fn();
    } catch (error) {
      console.error(currentSuite + ' ' + currentTest + ' Failed!');
      console.error(error.message);
      return;
    }

    console.log(currentSuite + ' ' + currentTest + ' Passed!');
  }

  var SANDBOX = {
    console: {
      log: fakeConsole('log'),
      warn: fakeConsole('warn'),
      info: fakeConsole('info'),
      error: fakeConsole('error')
    },
    setTimeout: setTimeout, // TOTO: Fake timeouts
    prank: {
      describe: describe,
      it: it,
      xdescribe: utils.noop,
      xit: utils.noop
    }
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
