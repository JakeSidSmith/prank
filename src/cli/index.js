#! /usr/bin/env node

'use strict';

(function () {

  var fs = require('fs');

  var CONSTANTS = require('./constants');

  var args = [].concat(process.argv);
  args.shift(); // Node location
  args.shift(); // This location

  console.log(args);

  if (!args.length) {
    console.error('No test path / regex specified');
    process.exit(1);
  }

  if (args.length > 1) {
    var argString = args.map().join(' ');
    var hasCoverageArg = CONSTANTS.MATCHES_COVERAGE.exec(argString);
    var hasCoveragePath = CONSTANTS.MATCHES_COVERAGE_PATH.exec(argString);

    if (hasCoverageArg && !hasCoveragePath) {
      console.error('No coverage path / regex specified');
      process.exit(1);
    }
  }

})();
