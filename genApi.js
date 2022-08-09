const fs = require("fs");
// reddir读取目录 sync同步 意思是读取这个路径下的所有文件名

let files = fs.readdirSync(__dirname + "/cloudfunctions/fun/functions");
// writeFile写入文件 第一个参数是路径和文件名 第二个参数是内容 格式必须是string
fs.writeFileSync(
  __dirname + "/cloudfunctions/fun/apis.js",
  "module.exports=" + JSON.stringify(files)
);
