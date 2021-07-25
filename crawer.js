const fs = require('fs');
const fetch = require('node-fetch');

var args = process.argv.slice(2).reduce((all, i) => {
  let pair = i.split('=');
  all[pair[0]] = pair[1];
  return all;
}, {})

let errLog = [];
let data;
let target = [
  /* 0 */ 'item',
  /* 1 */ 'skill',
  /* 2 */ 'class',
  /* 3 */ 'specialization',
  /* 4 */ 'pet',
  /* 5 */ 'monster',
  /* 6 */ 'quest',
  /* 7 */ 'achievement',
  /* 8 */ 'npc',
][args?.target || 0];

getNext();

function getData(type) {
  console.log({type});
  if (!data) {
    try {
      let o_data = fs.readFileSync(`./raw-data/${type}.json`, 'utf8');
      data = JSON.parse(o_data);
    } catch (err) {
      data = []
    }
  }
}

function getNext(type = target) {
  getData(type);
  let start = data.length// || 1;
  console.log({start});
  outputJSON(data, `./raw-data/${type}.json`);
  Promise.all(
    Array(50).fill(0).map((v, i) => {
      return postData(`https://orna.guide/api/v1/${type}`, { id: i + start });
    })
  )
  .then(res => {
    if (!res) { return; }
    res.forEach((arrData, index) => {
      let _data = arrData[0];
      if (_data?.id) {
        console.log(`Get: ${type}-${_data.id}, ${_data.name}`);
        data[_data.id] = _data;
      } else {
        // err
        errLog.push([start + index, arrData])
      }
    })
  })
  .finally(() => {
    outputJSON(data, `./raw-data/${type}.json`);
    outputJSON(data, `./raw-data/${type}.min.json`, 0);
    outputJSON(errLog, `./raw-data/${type}.err.json`);
    if (checkContinusErr()) {
      console.log('GG');
    } else {
      console.log('___ keep going ___');
      getNext(target);
    }
  })
}

function checkContinusErr() {
  return errLog.length > 40;
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
