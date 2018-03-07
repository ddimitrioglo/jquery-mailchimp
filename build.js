'use strict';

const fs = require('fs');
const UglifyJS = require('uglify-es');
const { version, name } = require('./package');

const buildInfo = `/* ${name}@v${version} [${(new Date()).toISOString()}] */`;
const result = UglifyJS.minify(fs.readFileSync('src/index.js', 'utf8'), {});

if (result.error) {
  console.error(result.error);
  process.exit(1);
}

fs.writeFileSync('dist/jquery-mailchimp.min.js', `${buildInfo}\n${result.code}\n`, 'utf8');

console.log('Done!');
process.exit(0);
