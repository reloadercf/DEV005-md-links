const fs = require('fs');

const getLinks = (uri) => {
  const data = fs.readFileSync(uri, 'utf8');

  const getMdLinksFormatMd = data.match(/!?\[([^\]]*)\]\(([^\)]+)\)/gm);
  if (!getMdLinksFormatMd) return [];
  const onlyLinks = getMdLinksFormatMd.reduce((acc, currentLink) => {
    if (currentLink.includes('http://') || currentLink.includes('https://')) {
      const urlRegex = /\[(.*?)\]\((.*?)\)/;
      const matches = currentLink.match(urlRegex);
      if (matches) {
        const [, text, url] = matches;
        acc.push({ text, url, file: uri });
      }
    }
    return acc;
  }, []);

  return onlyLinks;
};

module.exports = {
  getLinks,
};
