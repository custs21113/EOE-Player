// const path = require("path");
// const fs = require("fs");
// const request = require("request");
// const download = require("download");
import path from 'path';
import fs from 'fs';
import download from 'download';

export default async function downloadFileToFolder(id, fileName, fileType = 'mp3') {
  //设置保存路径
  let targetFolder = "";
  let err;
  try {
    if (process.env.NODE_ENV === 'production') {
      targetFolder = "C:\\Users\\MixJa\\Desktop\\"
    } else {
      targetFolder = path.join(__dirname, './download');
    }
    if (!fs.existsSync(targetFolder)) {
      err = fs.mkdir(targetFolder, { recursive: true } as any);
    }
    let url = `https://music.163.com/song/media/outer/url?id=${id}.mp3`;
    let data = download(url);
    await fs.promises.writeFile(`${targetFolder}\\${fileName}.${fileType}`, data);
    return `${targetFolder}\\${fileName}.${fileType}_${!fs.existsSync(targetFolder)}_${err} 下载完毕`;
  } catch (error) {
    console.log(error);
  }
  return `${targetFolder}_${!fs.existsSync(targetFolder)}_${err}`;
}