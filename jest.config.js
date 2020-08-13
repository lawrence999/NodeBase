const { jest: jestConfig } = require('cod-scripts/config');

module.exports = Object.assign(jestConfig, {
  rootDir: './build',
  coverageThreshold: null,
});
