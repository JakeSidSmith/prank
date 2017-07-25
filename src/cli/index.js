#! /usr/bin/env node

'use strict';

(function () {

  var jargs = require('jargs');
  // var glob = require('glob');

  var program = require('./program');
  // var CONSTANTS = require('./constants');

  var Program = jargs.Program;
  var Help = jargs.Help;
  var Arg = jargs.Arg;
  // var KWArg = jargs.KWArg;

  jargs.collect(
    Help(
      'help',
      {
        alias: 'h',
        description: 'Display help & usage'
      },
      Program(
        'prank',
        {
          description: 'Run javascript tests',
          usage: 'prank [glob]',
          examples: [
            'prank "tests/**/*.js"'
          ],
          callback: program
        },
        Arg(
          'pattern',
          {
            type: 'glob',
            description: 'Pattern to match tests'
          }
        )// ,
        // KWArg(
        //   'coverage',
        //   {
        //     alias: 'c',
        //     description: 'Pattern to collect coverage from',
        //     type: 'glob'
        //   }
        // )
      )
    )
  );

})();
