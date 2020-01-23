const yargs = require('yargs');
const { getFormatter } = require('./formatters');
const { readFile, readInput } = require('./core/input');
const { parse } = require('./core/parser');
const { request } = require('./core/request');

const flags = yargs

  // curlf options
  .option('stdin', {
    alias: [ 'in' ],
    desc: 'Read from stdin',
    type: 'boolean'
  })

  // curl options
  .option('insecure', {
    alias: [ 'k' ],
    desc: 'Allow insecure server connections when using SSL',
    type: 'boolean',
    default: false
  })
  .option('location', {
    alias: [ 'L' ],
    desc: 'Follow location',
    type: 'boolean',
    default: false
  })
  .option('verbose', {
    alias: [ 'v' ],
    desc: 'Make the operation more talkative',
    type: 'boolean'
  })
  .group([ 'stdin' ], 'curlf own options:')
  .group([ 'insecure', 'location', 'verbose' ], 'curl options:')
  .alias('V', 'version')
  .alias('h', 'help')
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
