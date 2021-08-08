import fs from 'fs';
import converter from 'json-2-csv';

let data = fs.readFileSync('./public/raw-data/item.added.json', 'utf8');
data = JSON.parse(data).filter(Boolean);

converter.json2csvAsync(data, {emptyFieldValue: '---'})
  .then((d) => {
    fs.writeFile('./public/raw-data/item.added.json.csv', d, function(err) {
      if (err) throw err;
      console.log('file saved');
    });
  })
  .catch((err) => console.log('ERROR: ' + err.message));
