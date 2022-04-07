import fs from 'fs';
import converter from 'json-2-csv';

export function getDeepProp(object, propChain) {
  return propChain.split('.')
    .reduce((obj, prop) => obj[prop] || obj, object);
}

export function saveCSV(data, fn, option) {
  converter.json2csvAsync(data, option)
    .then((d) => {
      fs.writeFile(fn, d, function(err) {
        if (err) throw err;
        console.log('\x1b[46m%s\x1b[0m', 'file saved', fn);
      });
    })
    .catch((err) => console.log('ERROR: ' + err.message));
}

export function outputJSON(json = {}, fileName, jsonSpace = 2) {
  let fileContent = JSON.stringify(json, null, jsonSpace);
  fs.writeFileSync(fileName, fileContent);
  console.log('\x1b[46m%s\x1b[0m', `JSON saved as ${fileName}! ( ${fileContent.length / 1000} kb )`);
};

export function getArgs() {
  return process.argv.slice(2).reduce((all, i) => {
    let pair = i.split('=');
    all[pair[0]] = pair[1];
    return all;
  }, {});
}
