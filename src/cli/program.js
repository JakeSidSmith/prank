'use strict';

(function () {

  var fs = require('fs');
  var vm = require('vm');
  var glob = require('glob');

  var utils = require('./utils');
  var CONSTANTS = require('./constants');

  function program (tree) {
    console.log(tree);

    var pattern = utils.getDefault(tree.args.pattern, CONSTANTS.DEFAULT_PATTERN);
    var files = glob.sync(pattern);

    console.log(files);

    utils.forEach(files, function (filepath) {
      var content = '(function(){' + fs.readFileSync(filepath, 'utf8') + '})()';
      var context = {
        console: {
          log: function () {
            var args = Array.prototype.slice.call(arguments);
            console.log.apply(console, ['Hello!'].concat(args));
          }
        }
      };
      var options = {filename: filepath};
      var script = new vm.Script(content, options);

      try {
        script.runInNewContext(context, options);
      } catch (error) {
        console.error(error.message);
      }
    });

    console.log('Complete');
  }

  module.exports = program;

})();
