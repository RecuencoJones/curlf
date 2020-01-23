const dedent = require('dedent');
const { parse } = require('../../../src/core/parser');

describe('Curlf parser', () => {
  it('should parse file with just url', () => {
    const result = parse(dedent `
      https://foo.com
    `);

    expect(result).toMatchObject({
      method: 'GET',
      url: 'https://foo.com'
    });
  });

  it('should parse file with method and url', () => {
    const result = parse(dedent `
      GET https://foo.com
    `);

    expect(result).toMatchObject({
      method: 'GET',
      url: 'https://foo.com'
    });
  });

  it('should parse file with protocol, method and url', () => {
    const result = parse(dedent `
      HTTP/1.1 GET https://foo.com
    `);

    expect(result).toMatchObject({
      protocol: 'HTTP/1.1',
      method: 'GET',
      url: 'https://foo.com'
    });
  });

  it('should parse file with method, url and headers', () => {
    const result = parse(dedent `
      GET https://foo.com
      Accept: application/json
      Authorization: Bearer token
    `);

    expect(result).toMatchObject({
      method: 'GET',
      url: 'https://foo.com',
      headers: new Map([
        [ 'Accept', 'application/json' ],
        [ 'Authorization', 'Bearer token' ]
      ])
    });
  });

  it('should parse file with method, url and body', () => {
    const result = parse(dedent `
      GET https://foo.com

      Foo
    `);

    expect(result).toMatchObject({
      method: 'GET',
      url: 'https://foo.com',
      body: 'Foo'
    });
  });

  it('should ignore trailing empty lines', () => {
    const result = parse(dedent `

      GET https://foo.com


    `);

    expect(result).toMatchObject({
      method: 'GET',
      url: 'https://foo.com'
    });
  });

  it('should allow multiple lines between headers and body', () => {
    const result = parse(dedent `
      GET https://foo.com



      Foo
    `);

    expect(result).toMatchObject({
      method: 'GET',
      url: 'https://foo.com',
      body: 'Foo'
    });
  });

  it('should not remove multiple empty lines in body', () => {
    const result = parse(dedent `
      GET https://foo.com



      Foo


      Bar
    `);

    expect(result).toMatchObject({
      method: 'GET',
      url: 'https://foo.com',
      body: 'Foo\n\n\nBar'
    });
  });

  it('should allow multiple spaces between protocol, method and url', () => {
    const result = parse(dedent `
      HTTP/1.1    GET      https://foo.com
    `);

    expect(result).toMatchObject({
      protocol: 'HTTP/1.1',
      method: 'GET',
      url: 'https://foo.com'
    });
  });

  it('should allow multiple spaces between header keys and values', () => {
    const result = parse(dedent `
      GET https://foo.com
      Accept    :   application/json
    `);

    expect(result).toMatchObject({
      method: 'GET',
      url: 'https://foo.com',
      headers: new Map([[ 'Accept', 'application/json' ]])
    });
  });
});
