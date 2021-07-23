const fs = require('fs');
const fetch = require('node-fetch');

let o_item = fs.readFileSync('./item.json', 'utf8') || [];
let data = JSON.parse(o_item);
let errLog = [];

getNext();

function getNext() {
  let start = data.length// || 1;
  console.log({start});
  outputJSON(data, 'item.json');
  Promise.all(
    Array(10).fill(0).map((v, i) => {
      return postData('https://orna.guide/api/v1/item', { id: i + start });
    })
  )
  .then(res => {
    if (!res) { return; }
    res.forEach((arrData, index) => {
      let itemData = arrData[0];
      if (itemData?.id) {
        console.log(`Get: item-${itemData.id}, ${itemData.name}`);
        data[itemData.id] = itemData;
      } else {
        // err
        errLog.push([start + index, arrData])
      }
    })
  })
  .finally(() => {
    outputJSON(data, 'items.json');
    outputJSON(errLog, 'itemsErr.json');
    if (checkContinusErr()) {
      console.log('GG');
    } else {
      console.log('___ keep going ___');
      getNext();
    }
  })
}

function checkContinusErr() {
  return errLog.length > 20;
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

function outputJSON(json = {}, fileName, jsonSpace = 2) {
  let fileContent = JSON.stringify(json, null, jsonSpace);
  fs.writeFileSync(fileName, fileContent);
  console.log(`JSON saved as ${fileName}! ( ${fileContent.length / 1000} kb )`);
};
