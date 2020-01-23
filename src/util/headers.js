const HEADER_VALUE_SEPARATOR = ':';

function fromRawListToMap(rawHeaders) {
  return new Map(
    rawHeaders.map((rawHeader) =>
      rawHeader
        .split(HEADER_VALUE_SEPARATOR)
        .map((_) => _.trim())
    )
  );
}

function fromObjectToMap(headersObj) {
  return new Map(Object.entries(headersObj));
}

function fromMapToRawList(headersMap) {
  const rawHeaders = [];

  headersMap.forEach((value, key) => {
    rawHeaders.push(`${ key }${ HEADER_VALUE_SEPARATOR } ${ value }`);
  });

  return rawHeaders;
}

module.exports = { fromRawListToMap, fromMapToRawList, fromObjectToMap };
