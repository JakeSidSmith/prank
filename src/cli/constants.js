'use strict';

(function () {

  module.exports = {
    CWD: process.cwd(),
    DEFAULT_PATTERN: '!(node_modules)**{@(tests|spec)/**/,@(test|spec)}*.@(js|ts)?(x)'
  };

})();
