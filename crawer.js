const fs = require('fs');
const fetch = require('node-fetch');

// let o_items = fs.readFileSync('./items.json', 'utf8') || [];
// let data = [...o_items];

let data = [];
let start = 1;
let errLog = [];

getNextItems();

function getNextItems() {
  let start = data.length// || 1;
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
    if (errLog.length > 5) {
      outputJSON(data, 'items.json');
      outputJSON(errLog, 'itemsErr.json');
    } else {
      getNextItems();
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
