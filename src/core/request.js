const { Curl } = require('node-libcurl');
const HttpStatus = require('http-status-codes');
const { fromMapToRawList, fromObjectToMap } = require('../util/headers');

async function request({ method, url, headers, body }, flags) {
  return new Promise((resolve, reject) => {
    const curl = new Curl();

    curl.setOpt('CUSTOMREQUEST', method);
    curl.setOpt('URL', url);
    curl.setOpt('FOLLOWLOCATION', flags.location)

    if (headers.size) {
      curl.setOpt(Curl.option.HTTPHEADER, fromMapToRawList(headers));
    }

    if (body) {
      curl.setOpt('POSTFIELDS', body);
    }

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
