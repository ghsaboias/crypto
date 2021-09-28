const fetch = require('node-fetch');

const url = 'https://api.coingecko.com/api/v3'

// Ping
async function getEndpoint(url, endpoint) {
  const response = await fetch(url + endpoint, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  });
  const responseJSON = await response.json();
  return responseJSON;
}

// getEndpoint(url, '/ping')

// Get coins IDs
async function getIDs() {
  const coinsArray = await getEndpoint(url, '/coins/list');
  const retArr = coinsArray.map((coin) => {
    const retObj = {
      id: coin.id,
      symbol: coin.symbol,
      name: coin.name,
    }
    return retObj
  })
  const filteredArr = retArr.filter((coin) => coin.name.length <= 10)
  filteredArr.sort((coinA, coinB) => coinA.id - coinB.id)
  console.log(filteredArr)
  return retArr;
}

getIDs()
