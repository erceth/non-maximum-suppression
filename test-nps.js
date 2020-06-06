// https://dev.to/therealdanvega/creating-your-first-npm-package-2ehf
const nms = require('./non-maximum-suppression');

const fs = require('fs');
const NS_PER_SEC = 1e9

let rawdata = fs.readFileSync('locations.json');
let locations = JSON.parse(rawdata);

const results = [];
let totalTime = 0;

Object.keys(locations).forEach((key) => {
  const location = locations[key];
  const time = process.hrtime();
  pick = nms(location, 0.3); // make sure parameters match python version
  const diff = process.hrtime(time);
  totalTime += diff[0] * NS_PER_SEC + diff[1]
  const suppressed = location.length - pick.length;
  console.log('file', key, suppressed);
  results.push({
    file: key,
    suppressed
  })
})
console.log('total non-maximum suppression processing time:', totalTime, 'nanoseconds');
