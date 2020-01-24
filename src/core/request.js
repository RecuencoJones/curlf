const { Curl } = require('node-libcurl');
const HttpStatus = require('http-status-codes');
const { fromMapToRawList, fromObjectToMap } = require('../util/headers');

// `node-libcurl` supports most curl options, reference for the available options
// can be found at https://curl.haxx.se/libcurl/c/curl_easy_setopt.html

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
    curl.setOpt(Curl.option.CUSTOMREQUEST, method);
    curl.setOpt(Curl.option.URL, url);
    curl.setOpt(Curl.option.FOLLOWLOCATION, flags.location);
    curl.setOpt(Curl.option.SSL_VERIFYPEER, !flags.insecure);

    if (headers.size) {
      curl.setOpt(Curl.option.HTTPHEADER, fromMapToRawList(headers));
    }

    if (body) {
      curl.setOpt(Curl.option.POSTFIELDS, body);
    }

    // Omit `result` from response headers
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
