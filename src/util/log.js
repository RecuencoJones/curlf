const levelMap = {
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
};

const DEFAULT_LEVEL = 3;

let currentLevel = DEFAULT_LEVEL;

const setLevel = (level) => { currentLevel = levelMap[level.toUpperCase()] || DEFAULT_LEVEL; };

const log = (level, ...args) => { level <= currentLevel && console.log(...args); };

const verbose = (...args) => log(4, ...args);

const info = (...args) => log(3, ...args);

const quiet = (...args) => log(2, ...args);

const error = (...args) => log(1, ...args);

module.exports = { setLevel, verbose, info, quiet, error };
