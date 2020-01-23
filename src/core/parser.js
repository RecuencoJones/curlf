const { fromRawListToMap } = require('../util/headers');

const HEADER_LINE_SEPARATOR = '\n';
const BODY_SEPARATOR = '\n{2,}';
const HEAD_MATCHER = new RegExp(`(.*?)${ BODY_SEPARATOR }`, 's');
const BODY_MATCHER = new RegExp(`${ BODY_SEPARATOR }(.*)`, 's');
const VARIABLE_MATCHER = /\$([a-zA-Z0-9_]+)/gm;

function parseFirstLine(line) {
  const [ $0, $1, $2 ] = line.replace(/\s+/g, ' ').split(' ');

  return $2
    ? { protocol: $0, method: $1, url: $2 }
    : $1
      ? { method: $0, url: $1 }
      : { method: 'GET', url: $0 };
}

function splitHeadAndBody(content) {
  const _content = content.trim();
  const { 1: $headMatch } = _content.match(HEAD_MATCHER) || {};
  const { 1: $bodyMatch } = _content.match(BODY_MATCHER) || {};

  return {
    head: $headMatch || _content,
    body: $bodyMatch
  };
}

function parse(contents) {
  const contentsResolved = contents
    .trim()
    .replace(VARIABLE_MATCHER, (_, $1) => process.env[$1]);

  const { head, body } = splitHeadAndBody(contentsResolved);

  const [ firstLine, ...rawHeaders ] = head
    .trim()
    .split(HEADER_LINE_SEPARATOR);

  const { protocol, method, url } = parseFirstLine(firstLine);

  if (!url) {
    throw new Error('URL is mandatory!');
  }

  const headers = fromRawListToMap(rawHeaders);

  return { protocol, method, url, headers, body };
}

module.exports = { parse };
