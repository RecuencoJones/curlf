[![Build Status](https://travis-ci.com/RecuencoJones/curlf.svg?branch=master)](https://travis-ci.com/RecuencoJones/curlf)

# Curlf

File based, persistent and aesthetically pleasing HTTP requests!
Just like curl, but with file templates.

## Usage

```
npx curlf ./request.curlf
```

Or from `stdin`:

```
npx curlf --stdin <<EOF
GET http://some.url
EOF
```

## `.curlf` file format

```
[[<version>] <method>] <url>
[<headerKey>: <headerValue>]*

[<body>]
```

**NOTE!** At least one empty line must exist between headers block and body.

> Environment variables can be used anywhere within the file!

### `<version>`

Allowed values:

- `HTTP/1.0`
- `HTTP/1`, `HTTP/1.1`
- `HTTP/2`, `HTTP/2.0`
- `HTTP/3`

### `<method>`

Allowed values:

- `GET`
- `POST`
- `PUT`
- `PATCH`
- `DELETE`
- `HEAD`
- `OPTIONS`

### `<url>`

You know, a full url

## Logging

The following flags can be used to specify the logging level:

- `verbose`, `v`

It can also be set through env variable `CURLF_LOGLEVEL`, which can take any of the following values:

- `VERBOSE`, `SILLY`, `4`: Log detailed response (like request headers, request body and response headers)
- `DEFAULT`, `INFO`, `3`: Log basic response (url, status, response content)
- `QUIET`, `2`: Log response content only
- `ERROR`, `1`: Log errors only
- `SILENT`, `0`: Log nothing ¯\\\_(ツ)\_/¯

## Todo

- Support for further curl flags
- Custom renderers/formatters
