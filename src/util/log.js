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

const setLevel = (level) => { currentLevel = levels[`${ level }`.toUpperCase()] || DEFAULT_LEVEL; };

const log = (level, ...args) => { level <= currentLevel && console.log(...args); };

const verbose = (...args) => log(levels.VERBOSE, ...args);

const info = (...args) => log(levels.INFO, ...args);

const quiet = (...args) => log(levels.QUIET, ...args);

const error = (...args) => log(levels.NONE, ...args);

module.exports = { levels, setLevel, verbose, info, quiet, error };
