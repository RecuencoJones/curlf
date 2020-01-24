const { setLevel, verbose, quiet, error } = require('../util/log');
const { fromMapToRawList } = require('../util/headers');

const formatHeaders = (headers) => fromMapToRawList(headers).sort().join('\n');

function init(flags) {
  let logLevel = process.env.CURLF_LOGLEVEL;

  if (flags.verbose) {
    logLevel = 'VERBOSE';
  }

  logLevel && setLevel(logLevel);
}

function formatRequest({ version, method, url, headers, body }) {
  verbose([ version, method, url ].filter(Boolean).join(' '));
  headers.size && verbose(formatHeaders(headers));
  body && verbose(body);
  verbose();
}

function formatResponse({ statusCode, statusText, headers, body }) {
  verbose(`${ statusCode } ${ statusText }`);
  headers.size && verbose(formatHeaders(headers));
  body && verbose();
  body && quiet(body, { skipNewLine: true });
}

function formatError({ message }) {
  error(message);
}

module.exports = { init, formatRequest, formatResponse, formatError };
