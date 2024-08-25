import client from './mongo.mjs'
import { readLines } from './fuc.mjs'

const enFile = 'C:/Program Files (x86)/Steam/steamapps/common/AoE2DE/resources/en/strings/key-value/key-value-strings-utf8.txt';
const zhFile = 'C:/Program Files (x86)/Steam/steamapps/common/AoE2DE/resources/zh/strings/key-value/key-value-strings-utf8.txt';
(async () => {
  try {
    await client.connect();
    console.log('成功连接到服务器');
    
    const db = client.db('aoe');
    const namesCollection = db.collection('Names');
    
    const zh = {}
    await readLines(zhFile, line => {
      if (/^\d+ "\p{Script=Han}+"$/u.test(line)) {
        const key = line.match(/^\d+/)[0]
        const value = line.match(/"(?:\p{Script=Han}+)"$/u)[0].slice(1, -1)
        // console.log(key)
        // console.log(value)
        zh[key] = value
      }
    })
    // console.log(zh)
    const en = {}
    await readLines(enFile, line => {
      if (/^\d+ "+[a-zA-Z\s]+"$/.test(line)) {
        const key = line.match(/^\d+/)[0]
        const value = line.match(/"(?:[a-zA-Z\s]+)"$/)[0].slice(1, -1)
        // console.log(key)
        // console.log(value)
        en[key] = value
      }
    })
    // console.log(en)
    const result = {}
    for (const [key, value] of Object.entries(zh)) {
      result[en[key]] = value
    }
    console.log(result)
    await namesCollection.insertOne(result)
    console.log('文件读取完成');
  } finally {
    await client.close()
  }
})()
// async function main() {
// }
// main().catch(console.error)
