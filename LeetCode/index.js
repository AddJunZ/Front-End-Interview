// 使用node修改文件名
// 官网突然把面试题xxx 变成剑指Offer xxx了
// 强迫症 想要换

const fs = require('fs');
const path = './剑指offer';
let files = fs.readdirSync(path);
files.forEach(file => {
  fs.renameSync(`${path}/${file}`, `${path}/${file.replace('剑指offer', '')}`)
})