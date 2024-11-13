import { Client } from "@gradio/client";
import fs from 'fs';
import path from 'path';
import { getInputFromTerminal, readLines } from './fuc.mjs';

const inputFilePath = await getInputFromTerminal('拖入文件: ');
// const inputFilePath = 'E:/youtube/How good is the new Warrior Priest？ (Armenian unique unit)/How good is the new Warrior Priest？ (Armenian unique unit).zh.srt';
const { dir } = path.parse(inputFilePath);
const chineseDir = path.join(dir, 'chinese');
fs.mkdirSync(chineseDir, { recursive: true });

const data = fs.readFileSync("./example.wav");
// 将 Buffer 转换为 Blob
const exampleAudio = new Blob([data], { type: 'application/octet-stream' });

const client = await Client.connect("http://127.0.0.1:9886/");
let textArr = [];
let lastText = '';
await readLines(inputFilePath, line => {
  if (line) {
    if (
      line &&
      /^\d{2}:\d{2}:\d{2},\d{3} --> \d{2}:\d{2}:\d{2},\d{3}$/.test(line)
    ) {
      lastText = line
    } else if (
      /^\d{2}:\d{2}:\d{2},\d{3} --> \d{2}:\d{2}:\d{2},\d{3}$/.test(lastText)
    ) {
      lastText = line
    } else if (/^\d+$/.test(line)) {
      textArr.push(lastText)
      lastText = ''
    } else if (lastText) {
      lastText = lastText + '，' + line
    }
  }
});
for (let index = 0; index < textArr.length; index++) {
  const result = await generateAudio(textArr[index].replace(/\+/g, '加'))
  fs.copyFileSync(result.data[0].path, path.join(chineseDir, index + '.wav'));
  fs.unlinkSync(result.data[0].path);
}
async function generateAudio(text) {
  return await client.predict("/generate_audio", {
    tts_text: text,
    mode_checkbox_group: "跨语种复刻",
    speed_factor: 1,
    new_dropdown: "SOTL",
    prompt_wav_upload: exampleAudio, 	// blob in '选择prompt音频文件，注意采样率不低于16khz' Audio component
    prompt_wav_record: exampleAudio
  });
}