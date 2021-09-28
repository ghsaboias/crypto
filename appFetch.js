const BASE_URL = 'https://api.coingecko.com/api/v3'
const oneBillion = 1000000000;
const coinsSection = document.querySelector('.coins-section')

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
async function getCoinsInfo(url, endpoint) {
  const response = await getEndpoint(url, endpoint);
  const coinsArray = response.map((coin, index) => {
    return {
      index: index + 1,
      symbol: coin.symbol,
      market_cap: coin.market_cap,
    }
  })
  console.log(coinsArray)
  coinsArray.filter((coin) => coin.market_cap >= oneBillion)
  return coinsArray;
}

// Render coins
function renderCoin({ index, symbol, market_cap }) {
  const newCoin = document.createElement('p');
  newCoin.innerText = `${index}. ${symbol.toUpperCase()}: $${market_cap.toLocaleString()} USD`;
  newCoin.className = 'coin-item';
  coinsSection.appendChild(newCoin);
}

function renderCoins (array) {
  array.forEach((coin) => renderCoin(coin));
}

window.onload = async () => {
  const coinsObj = await getCoinsInfo(BASE_URL, '/coins/markets?vs_currency=usd');
  renderCoins(coinsObj);
}