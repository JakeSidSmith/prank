'use strict';

(function () {

  var glob = require('glob');

  var utils = require('./utils');
  var CONSTANTS = require('./constants');

  function program (tree) {
    console.log(tree);

    var pattern = utils.getDefault(tree.args.pattern, CONSTANTS.DEFAULT_PATTERN);
    var files = glob(pattern);

    console.log(files);
  }

  module.exports = program;

})();
