const consoleFormatter = require('./console');

function getFormatter(flags) {
  return consoleFormatter;
}

module.exports = { getFormatter };
