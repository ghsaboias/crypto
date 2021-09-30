const fetch = require('node-fetch')

const BASE_URL = 'api.coincap.io/v2/';

// Getting data
async function getData(endpoint, isFilter) {
  const address = `https://${BASE_URL}${endpoint}`;
  fetch(address, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept-Encoding': 'gzip',
      'Authorization': 'Bearer XXXX',
    },
  })
  .then((response) => response.json())
  .then((responseJSON) => parseResponse(responseJSON.data, isFilter))
  .catch((err) => console.log(err));
}

// Parsing response
function parseResponse(responseArr, isFilter) {
  const arrWithNumbers = responseArr.map((item) => {
    // Converting Unix to regular time: https://stackoverflow.com/a/50255425
    const mappedItem = {
      'name': item.name,
      'rank': item.rank,
      'daily_volume': Math.round(item.volumeUsd * 100) / 100,
      'percent_total_volume': Math.round(item.percentTotalVolume * 100) / 100,
      'updated': new Date(item.updated).toLocaleTimeString("en-US"),
      'socket': item.socket,
      'website': item.exchangeUrl,
    }
    return mappedItem;
  })
  if (isFilter) {
    const filteredArr = arrWithNumbers.filter((item) => item.rank <= 10);
    prettyResponse(filteredArr);
    return filteredArr;
  }
  prettyResponse(arrWithNumbers);
  return arrWithNumbers;
}

// Prettying response
function prettyResponse(arrWithNumbers) {
  const prettyArr = arrWithNumbers.map((item) => {
    const prettyItem = {
      'name': item.name,
      'rank': item.rank, 
      'daily_volume': `$${item.daily_volume.toLocaleString()}`,
      'percent_total_volume': item.percent_total_volume,
      'updated': item.updated,
      'socket': item.socket,
      'website': item.website,
    }
    return prettyItem;
  })
  console.log(prettyArr)
  return prettyArr;
}

getData('exchanges', true)

