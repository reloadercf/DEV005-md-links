const { getFiles } = require('./getFiles');
const { getLinks } = require('./getLinks');
const { validate } = require('./validate');

const mdLinks = (path, options) => {
  const filesPath = getFiles(path);

  return new Promise((resolve, reject) => {
    if (options && options.validate && !options.stats && filesPath) {
      if (filesPath) {
        const linksPaths = filesPath.map((file) => getLinks(file));
        const linksValid = linksPaths[0].map((link) => validate(link)
          .then((obj) => obj)
          .catch((obj) => obj));
        resolve(Promise.all(linksValid));
      }
    }
    if ((!options && filesPath) || (!options.validate && !options.stats && filesPath)) {
      if (filesPath) {
        const linksPaths = filesPath.map((file) => getLinks(file));
        resolve(linksPaths);
      }
    }
    reject('Error al proporcionar ruta');
  });
};

mdLinks('./README.md').then((res) => {
  console.log(res);
}).catch((err) => {
  console.log(err);
});
