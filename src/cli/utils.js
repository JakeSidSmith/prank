'use strict';

(function () {

  function getDefault (value, defaultValue) {
    return typeof value === 'undefined' ? defaultValue : value;
  }

  module.exports = {
    getDefault: getDefault
  };

})();
