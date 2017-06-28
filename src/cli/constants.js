'use strict';

(function () {

  module.exports = {
    CWD: process.cwd(),
    MATCHES_COVERAGE: /\s(--coverage|-c)[\s=]/i,
    MATCHES_COVERAGE_PATH: /\s(--coverage|-c)[\s=][^\s]+/i
  };

})();
