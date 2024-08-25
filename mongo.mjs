import { MongoClient } from 'mongodb'; 

// MongoDB 连接字符串
const url = 'mongodb://192.168.6.2:27015';
const client = new MongoClient(url);

// async function main() {
//   try {
//     // 连接到 MongoDB 服务器
//     await client.connect();
//     console.log('成功连接到服务器');

//     const db = client.db(dbName);
//     const collection = db.collection('testcollection');

//     // 插入文档
//     const insertResult = await collection.insertOne({ name: 'Alice', age: 25 });
//     console.log('插入的文档:', insertResult.insertedId);

//     // 查询文档
//     const findResult = await collection.find({}).toArray();
//     console.log('查询的文档:', findResult);

//     // 更新文档
//     const updateResult = await collection.updateOne({ name: 'Alice' }, { $set: { age: 26 } });
//     console.log('更新的文档:', updateResult.modifiedCount);

//     // 删除文档
//     const deleteResult = await collection.deleteOne({ name: 'Alice' });
//     console.log('删除的文档:', deleteResult.deletedCount);
//   } finally {
//     // 关闭连接
//     await client.close();
//   }
// }

// main().catch(console.error);

export default client