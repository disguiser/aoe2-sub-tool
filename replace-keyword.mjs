import fs from 'fs/promises';
import path from 'path';
import { getInputFromTerminal, merge } from './fuc.mjs';
import words from './aoe2.json' with { type: 'json' }
// import client from './mongo.mjs';

(async () => {
  try {
    // await client.connect();
    // console.log('成功连接到服务器');
    // const db = client.db('aoe');
    // const namesCollection = db.collection('Names');
    // const [findResult] = await namesCollection.find({}).toArray();
    // console.log(findResult)
    // console.log(words)
    const ifMerge = !!await getInputFromTerminal('输入任何内容进行合并：');
    const inputFilePath = await getInputFromTerminal('拖入文件: ');
    const { dir, ext, name } = path.parse(inputFilePath);
    const flatWords = Object.entries(words)
      .reduce((a,b) => Object.assign(a, b[1]), {})
    let data;
    if (ifMerge) {
      data = await merge(inputFilePath);
      await fs.writeFile(path.join(dir, name + '.merged' + ext), data);
    } else {
      data = await fs.readFile(inputFilePath, 'utf8');
    }
    for (const [key, value] of Object.entries(flatWords)) {
      // console.log(key + ': ' + value)
      const pattern = new RegExp(`\\b${key}s?\\b` + 's?', 'ig');
      data = data.replace(pattern, value);
    }
    // console.log(data);
    await fs.writeFile(path.join(dir, name + '.replaced' + ext), data);
  } catch (err) {
    console.error('Error reading the file:', err);
  } finally {
    // client.close()
  }
})();
