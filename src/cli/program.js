'use strict';

(function () {

  var fs = require('fs');
  var vm = require('vm');
  var glob = require('glob');
  var chalk = require('chalk');

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

  function fail (message, error, prefix, suffix) {
    prefix = utils.getDefault(prefix, '');
    suffix = utils.getDefault(suffix, '');

    console.error(
      prefix +
      CONSTANTS.CROSS_CHAR + ' ' + chalk.red(message + ' Failed!') +
      '\n\n' +
      chalk.red(error.message) + // TODO: Stack trace
      suffix
    );
  }

  function pass (message, prefix, suffix) {
    prefix = utils.getDefault(prefix, '');
    suffix = utils.getDefault(suffix, '');

    console.log(
      prefix +
      CONSTANTS.TICK_CHAR + ' ' + chalk.green(message + ' Passed!') +
      suffix
    );
  }

  function describe (name, fn) {
    currentSuite = name;

    console.log('  ' + name);

    try {
      fn();
    } catch (error) {
      fail(currentSuite, error, '\n  ', '\n');
      return;
    }
  }

  function it (name, fn) {
    currentTest = name;

    try {
      fn();
    } catch (error) {
      fail(currentSuite + ' ' + currentTest, error, '    ');
      return;
    }

    pass(currentSuite + ' ' + currentTest, '    ');
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
      xdescribe: utils.noop, // TODO: Run tests but do not fail?
      xit: utils.noop // TODO: Log skipped tests
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
        console.error(chalk.red(error.message));
      }
    });

    console.log('Complete');
  }

  module.exports = program;

})();
