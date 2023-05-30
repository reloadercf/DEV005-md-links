#!/usr/bin/env node
const { argv } = require('node:process');
const { mdLinks } = require('../index');

const validate = argv.includes('--validate');
const stats = argv.includes('--stats');
const options = { validate, stats };
const path = argv[2];

mdLinks(path, options)
  .then((res) => console.log(res))
  .catch((err) => console.error(err));
