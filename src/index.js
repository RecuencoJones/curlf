const yargs = require('yargs');
const { getFormatter } = require('./formatters');
const { readFile, readInput } = require('./core/input');
const { parse } = require('./core/parser');
const { request } = require('./core/request');

const flags = yargs
  .option('i', {
    alias: [ 'stdin' ],
    desc: 'Read from stdin',
    type: 'boolean'
  })
  .option('v', {
    alias: [ 'verbose' ],
    desc: 'Make the operation more talkative',
    type: 'boolean'
  })
  .option('L', {
    alias: [ 'location' ],
    desc: 'Follow location',
    type: 'boolean',
    default: false
  })
  .group([ 'i' ], 'curlf own options:')
  .group([ 'v', 'L' ], 'curl options:')
  .version()
  .help()
  .wrap(yargs.terminalWidth())
  .argv;

(async () => {
  const formatter = getFormatter(flags);

  formatter.init(flags);

  try {
    const contents = await (flags.stdin ? readInput() : readFile());
    const requestOptions = parse(contents);

    formatter.formatRequest(requestOptions);

    const response = await request(requestOptions, flags);

    formatter.formatResponse(response);
  } catch (error) {
    formatter.formatError(error);
  }
})();
