const stats = (file, getLinks, validate) => {
  const links = getLinks(file[0]);
  const result = { Total: links.length };

  const lookup = links.reduce((acc, current) => {
    acc[current.url] = ++acc[current.url] || 0;
    return acc;
  }, {});

  const repeat = links.filter((e) => lookup[e.url]).length;
  result.Unique = result.Total - repeat;
  if (validate) {
    let broken = 0;
    const linksValidated = links.map((link) => validate(link).then((ok) => ok).catch(() => {
      broken += 1;
    }));
    return Promise.all(linksValidated).then(() => {
      result.Broken = broken;
      return result;
    }).catch(() => result);
  }
  return result;
};

module.exports = {
  stats,
};
