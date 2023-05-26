const fs = require('fs');
const path = require('path');

const getFiles = (uri, paths = []) => {
  if (fs.existsSync(uri) && fs.statSync(uri).isFile() && path.extname(uri) === '.md') {
    if (path.isAbsolute(uri)) return [uri];
    return [path.resolve(uri)];
  }
  if (fs.existsSync(uri) && fs.lstatSync(uri).isDirectory()) {
    const folder = fs.readdirSync(uri);
    folder.forEach((file) => {
      const filePath = path.join(uri, file);
      const currentFile = fs.statSync(filePath);
      if (currentFile.isDirectory()) {
        getFiles(filePath, paths);
      } else if (path.extname(filePath) === '.md') {
        paths.push(path.resolve((filePath)));
      }
    });
    return paths;
  }
  return undefined;
};

module.exports = {
  getFiles,
};
