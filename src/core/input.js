const { resolve } = require('path');
const { readFileSync } = require('fs');

async function readInput() {
  return new Promise((resolve) => {
    let data = '';

    process.stdin.resume();
    process.stdin.setEncoding('utf8');

    process.stdin.on('data', (chunk) => {
      data += chunk;
    });

    process.stdin.on('end', () => {
      resolve(data);
    });
  });
}

async function readFile({ file }) {
  return readFileSync(resolve(file), 'utf8');
}

module.exports = { readInput, readFile };
