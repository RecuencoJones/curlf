const consoleFormatter = require('./console');

// Will be used for deciding formatter
// eslint-disable-next-line no-unused-vars
function getFormatter(flags) {
  return consoleFormatter;
}

module.exports = { getFormatter };
