const { getFormatter } = require('./formatters');
const { readFile, readInput } = require('./core/input');
const { parse } = require('./core/parser');
const { request } = require('./core/request');

const flags = {
  readFromInput: false
};

(async () => {
  const formatter = getFormatter(flags);

  formatter.init();

  try {
    const contents = await (
      flags.readFromInput
        ? readInput()
        : readFile()
    );

    const requestOptions = parse(contents);

    formatter.formatRequest(requestOptions);

    const response = await request(requestOptions);

    formatter.formatResponse(response);
  } catch (error) {
    formatter.formatError(error);
  }
})();
