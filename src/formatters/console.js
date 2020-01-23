const { setLevel, verbose, info, quiet, error } = require('../util/log');

function init() {
  const logLevel = process.env.LOGLEVEL;

  logLevel && setLevel(logLevel);
}

function formatRequest({ protocol, method, url, headers, body }) {
  protocol ? info(protocol, method, url) : info(method, url);
  headers.size && verbose(headers);
  body && verbose(body);
  info();
}

function formatResponse({ statusCode, statusText, headers, body }) {
  info(statusCode, statusText);
  headers.size && verbose(headers);
  body && info();
  body && quiet(body);
}

function formatError({ message }) {
  error(message);
}

module.exports = { init, formatRequest, formatResponse, formatError };
