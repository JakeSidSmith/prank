'use strict';

(function () {

  function getDefault (value, defaultValue) {
    return typeof value === 'undefined' ? defaultValue : value;
  }

  function forEach (obj, fn) {
    if (typeof obj === 'object') {
      if (typeof obj === 'string' || Array.isArray(obj)) {
        for (var i = 0; i < obj.length; i += 1) {
          fn(obj[i], i);
        }
      } else {
        for (var key in obj) {
          fn(obj[key], key);
        }
      }
    }
  }

  module.exports = {
    getDefault: getDefault,
    forEach: forEach
  };

})();
