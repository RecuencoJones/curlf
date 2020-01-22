# Curlf

File based, persistent and aesthetically pleasing HTTP requests!
Just like curl, but with file templates.

## Usage

```
npx curlf ./request.curlf
```

## `.curlf` file format

```
[<protocol>] <method> <url>
[<headerKey>: <headerValue>]*

[<body>]
```

> Environment variables can be used anywhere within the file!

### `<protocol>`

Allowed values:

- `HTTP/1.0`
- `HTTP/1.1`
- `HTTP/2`
- `HTTP/3`

### `<method>`

Allowed values:

- `GET`
- `POST`
- `PUT`
- `DELETE`
- `HEAD`
- `OPTIONS`

### `<url>`

You know, a full url

## Logging

Can be set through env variable `LOGLEVEL`, which can take any of the following values:

- `VERBOSE`, `SILLY`, `4`: Log detailed response (like request headers, request body and response headers)
- `DEFAULT`, `INFO`, `3`: Log basic response (url, status, response content)
- `QUIET`, `2`: Log response content only
- `ERROR`, `1`: Log errors only
- `SILENT`, `0`: Log nothing ¯\\\_(ツ)\_/¯

## Todo

- Support for flags (like -k)
- Support for multiple HTTP protocols
- Custom renderers 
