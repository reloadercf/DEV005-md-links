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
    const linksValidated = links.map((link) => validate(link).then((ok) => ok).catch((err) => {
      if (err) {
        console.log(err);
        broken += 1;
      }
      return err;
    }));
    Promise.all(linksValidated);
    result.Broken = broken;
    return result;
  }else{
    return result;
  }
  
};

module.exports = {
  stats,
};
