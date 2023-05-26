const fetch = require('node-fetch');

const validate = (link) => new Promise((resolve, reject) => {
  fetch(link.url)
    .then((res) => resolve({ ...link, status: `${res.status ? res.status : 404}`, message: `${res.statusText ? res.statusText : 'fail'}` }))
    .catch((err) => reject({ ...link, status: `${err ? '404' : null}`, message: 'fail' }));
});

module.exports = {
  validate,
};
