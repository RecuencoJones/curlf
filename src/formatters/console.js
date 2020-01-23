const { setLevel, verbose, quiet, error } = require('../util/log');
const { fromMapToRawList } = require('../util/headers');

const formatHeaders = (headers) => fromMapToRawList(headers).sort().join('\n');

function init(flags) {
  let logLevel = process.env.LOGLEVEL;

  if (flags.verbose) {
    logLevel = 'VERBOSE';
  }

  logLevel && setLevel(logLevel);
}

function formatRequest({ protocol, method, url, headers, body }) {
  protocol ? verbose(protocol, method, url) : verbose(method, url);
  headers.size && verbose(formatHeaders(headers));
  body && verbose(body);
  verbose();
}

function formatResponse({ statusCode, statusText, headers, body }) {
  verbose(statusCode, statusText);
  headers.size && verbose(formatHeaders(headers));
  body && verbose();
  body && quiet(body);
}

function formatError({ message }) {
  error(message);
}

module.exports = { init, formatRequest, formatResponse, formatError };
