const { resolve } = require('path');
const { readFileSync } = require('fs');
const axios = require('axios').default;
const { setLevel, verbose, info, quiet, error } = require('./log');

const logLevel = process.env.LOGLEVEL;

logLevel && setLevel(logLevel);

const [ file ] = process.argv.slice(2);
const contents = readFileSync(resolve(file), 'utf8');
const contentsResolved = contents.replace(/\$([a-zA-Z0-9_]+)/gm, (match, $1) => process.env[$1]);

function parseFirstLine(line) {
  const [ $0, $1, $2 ] = firstLine.split(' ');

  return $2 ? { protocol: $0, method: $1, url: $2 } : { method: $0, url: $1 };
}

const [ head, body ] = contentsResolved.split('\n\n');
const [ firstLine, ...headers ] = head.trim().split('\n');
const { protocol, method, url } = parseFirstLine(firstLine);

const headersMap = new Map(
  headers.map((rawHeader) => 
    rawHeader
      .split(':')
      .map((_) => _.trim())
  )
);

info(method, url);
headersMap.size && verbose(headersMap);
body && verbose(body);
info();

axios({
  method,
  url,
  headers: headersMap,
  data: body,
  responseType: 'arraybuffer'
})
.then(({ status, statusText, headers, data }) => {
  const responseHeadersMap = new Map(Object.entries(headers));
  const responseText = data && data.toString();

  info(status, statusText);
  responseHeadersMap.size && verbose(responseHeadersMap);
  responseText && info();
  responseText && quiet(responseText);
})
.catch((e) => {
  error(e);
});
