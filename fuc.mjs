import readline from 'readline';
import fs from 'fs';

export async function getInputFromTerminal(question, callback) {
  return new Promise((resolve, reject) => {
    try {
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });
      rl.question(question, (filePath) => {
        rl.close();
        if (callback) {
          resolve(callback(filePath));
        } else {
          resolve(filePath);
        }
      });
    } catch (error) {
      reject(error);
    }
  });
}

export function readLines(filename, lineFuc) {
  return new Promise((resolve, reject) => {
    const rl = readline.createInterface({
      input: fs.createReadStream(filename, 'utf-8'),
      crlfDelay: Infinity
    });

    rl.on('line', (line) => {
      lineFuc(line)
    });

    rl.on('close', () => {
      resolve();
    });

    rl.on('error', (err) => {
      reject(err);
    });
  });
}

export async function merge(filePath) {
  let text = '';
  await readLines(filePath, line => {
    if (
      line &&
      !/\uFEFF/g.test(line) &&
      !/^\d+$/.test(line) &&
      !/^\d{2}:\d{2}:\d{2},\d{3} --> \d{2}:\d{2}:\d{2},\d{3}$/.test(line)
    ) {
      text += '\r\n' + line
    }
  })
  text = text.replace(/\s/g, ' ');
  text = text.replace(/  /g, ' ');
  text = text.replace(/i mean/gi, '');
  text = text.replace(/you know/gi, '');
  text = text.replace(/next up/g, '\r\nnext up');
  return text;
}