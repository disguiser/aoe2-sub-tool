import words from './aoe2.json' assert { type: 'json' }
import fs from 'fs/promises';
import path from 'path';

(async () => {
  const flatWords = Object.entries(words)
      .reduce((a,b) => Object.assign(a, b[1]), {});

  const covertWords = Object.entries(flatWords).map(e  => {
    return {
      "Item1": e[0],
      "Item2": e[1]
    }
  })
  await fs.writeFile('converted.json', JSON.stringify(covertWords));
  // console.log(path.join(__dirname, 'converted.json'))
})()