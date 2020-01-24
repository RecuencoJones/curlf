const levels = Object.freeze({
  0: 0,
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  NONE: 0,
  ERROR: 1,
  QUIET: 2,
  INFO: 3,
  VERBOSE: 4,
  SILLY: 4
});

const DEFAULT_LEVEL = 3;

let currentLevel = DEFAULT_LEVEL;

function setLevel(level) {
  currentLevel = levels[`${ level }`.toUpperCase()] || DEFAULT_LEVEL;
}

function log(level, message, { skipNewLine } = {}) {
  let _message = message || '';

  if (!skipNewLine) {
    _message += '\n';
  }

  level <= currentLevel && process.stdout.write(_message);
}

const verbose = (message, opts) => log(levels.VERBOSE, message, opts);

const info = (message, opts) => log(levels.INFO, message, opts);

const quiet = (message, opts) => log(levels.QUIET, message, opts);

const error = (message, opts) => log(levels.NONE, message, opts);

module.exports = { levels, setLevel, verbose, info, quiet, error };
