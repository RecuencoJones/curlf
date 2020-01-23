const { Curl } = require('node-libcurl');
const HttpStatus = require('http-status-codes');
const { fromMapToRawList, fromObjectToMap } = require('../util/headers');

const httpVersions = Object.freeze({
  'default': 'CURL_HTTP_VERSION_NONE',
  'HTTP/1.0': 'CURL_HTTP_VERSION_1_0',
  'HTTP/1.1': 'CURL_HTTP_VERSION_1_1',
  'HTTP/1': 'CURL_HTTP_VERSION_1_1',
  'HTTP/2.0': 'CURL_HTTP_VERSION_2',
  'HTTP/2': 'CURL_HTTP_VERSION_2',
  'HTTP/3': 'CURL_HTTP_VERSION_3'
});

async function request({ version, method, url, headers, body }, flags) {
  return new Promise((resolve, reject) => {
    const curl = new Curl();

    const httpVersion = httpVersions[version ? version.toUpperCase() : 'default'];

    curl.setOpt(Curl.option.HTTP_VERSION, httpVersion);
    curl.setOpt('CUSTOMREQUEST', method);
    curl.setOpt('URL', url);
    curl.setOpt('FOLLOWLOCATION', flags.location);
    curl.setOpt('SSL_VERIFYPEER', !flags.insecure);

    if (headers.size) {
      curl.setOpt(Curl.option.HTTPHEADER, fromMapToRawList(headers));
    }

    if (body) {
      curl.setOpt('POSTFIELDS', body);
    }

    // Omit result from headers
    // eslint-disable-next-line no-unused-vars
    curl.on('end', (statusCode, data, [{ result, ...headers }]) => {
      curl.close();

      resolve({
        statusCode,
        statusText: HttpStatus.getStatusText(statusCode),
        headers: fromObjectToMap(headers),
        body: data
      });
    });
    curl.on('error', (error) => {
      curl.close();

      reject(error);
    });

    curl.perform();
  });
}

module.exports = { request };
