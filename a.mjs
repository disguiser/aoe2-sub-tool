import path from 'path';
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('拖入文件: ', (filePath) => {
  if (filePath.startsWith('& ')) {
    filePath = filePath.slice(3, -1);
  }
  console.log(`你拖入的是: ${filePath}`);
  const { dir, ext, name } = path.parse(filePath);
  console.log(path.join(dir, name + '.replaced' + ext))
  rl.close();
});
console.log()