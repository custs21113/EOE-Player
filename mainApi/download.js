const path = require("path");
const fs = require("fs");
const request = require("request");
const download = require("download");

const { app, BrowserWindow, Menu, MenuItem, Tray, remote } = require('electron')
module.exports = async function downloadFileToFolder(id, fileName, fileType = 'mp3') {
  //设置保存路径
  let targetFolder = "";
  let err = "";
  //  = path.join(__dirname, './download');
  // console.log(targetFolder);
  // console.log(path.resolve(app.getAppPath(), './download'));
  // console.log(path.join(targetFolder, `${fileName}.${fileType}`));
  // console.log(path.join(targetFolder, `./${fileName}.${fileType}`));
  // console.log(path.resolve(targetFolder, `./${fileName}.${fileType}`));
  try {
    if (process.env.NODE_ENV === 'production') {
      // targetFolder = path.resolve(app.getAppPath(), '');
      targetFolder = "C:\\Users\\MixJa\\Desktop\\"
    } else {
      targetFolder = path.join(__dirname, './download');
    }
    if (!fs.existsSync(targetFolder)) {
      err = await fs.mkdir(targetFolder, { recursive: true });
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