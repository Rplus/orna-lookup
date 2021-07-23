const fs = require('fs');
const fetch = require('node-fetch');

// let o_items = fs.readFileSync('./items.json', 'utf8') || [];
// let data = [...o_items];

let data = [];
let start = 1;
let errLog = [];

getNextItem();

function getNextItem() {
  postData('https://orna.guide/api/v1/item', { id: start })
    .then(data => {
      console.log(`Get: item-${start}, ${data[0]?.name}`);
      data[start] = data;
      start++;
    })
    .catch(error => {
      console.error('==ERROR==', error);
      errLog.push({ id: start, err: error })
    })
    .finally(() => {
      if (errLog.length > 5) {
        outputJSON(data, 'items.json');
        outputJSON(errLog, 'itemsErr.json');
      } else {
        getNextItem();
      }
    })
}

function postData(url, data) {
  // Default options are marked with *
  return fetch(url, {
    body: JSON.stringify(data), // must match 'Content-Type' header
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, same-origin, *omit
    headers: {
      'user-agent': 'Mozilla/4.0 MDN Example',
      'content-type': 'application/json'
    },
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, cors, *same-origin
    redirect: 'follow', // manual, *follow, error
    referrer: 'no-referrer', // *client, no-referrer
  })
  .then(response => response.json()) // 輸出成 json
}

const outputJSON = (json = {}, fileName, jsonSpace = 2) => {
  let fileContent = JSON.stringify(json, null, jsonSpace);
  fs.writeFileSync(fileName, fileContent);
  console.log(`JSON saved as ${fileName}! ( ${fileContent.length / 1000} kb )`);
};
