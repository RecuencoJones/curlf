const axios = require('axios').default;

async function request({ method, url, headers, body }) {
  const response = await axios({
    method,
    url,
    headers,
    data: body,
    responseType: 'arraybuffer'
  });

  const responseHeadersMap = new Map(Object.entries(response.headers));
  const responseText = response.data && response.data.toString();

  return {
    statusCode: response.status,
    statusText: response.statusText,
    headers: responseHeadersMap,
    body: responseText
  };
}

module.exports = { request };
