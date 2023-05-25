const fs = require('fs');
const path = require('path');

const paths = [];
const getFiles = (uri) => {
  if (fs.existsSync(uri) && fs.statSync(uri).isFile() && path.extname(uri) === '.md') {
    if (path.isAbsolute(uri)) return [uri];
    return [path.resolve(uri)];
  }
  if (fs.existsSync(uri) && fs.lstatSync(uri).isDirectory()) {
    fs.readdir(uri, (err, files) => {
      if (err) {
        return `no allowed read folder: ${err}`;
      }
      files.forEach((file) => {
        if (fs.statSync(uri).isFile() && path.extname(uri) === '.md') paths.push(file);
        if (fs.lstatSync(uri).isDirectory()) console.log(path.resolve(file));
        if (fs.lstatSync(uri).isDirectory()) getFiles(path.resolve(file));
      });
    });
    return paths;
  }
  return undefined;
};

console.log(getFiles('/Users/macbookpro/Developer/personal/DEV005-md-links/ejemplo'));

module.exports = {
  getFiles,
};
