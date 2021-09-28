const BASE_URL = 'https://api.coingecko.com/api/v3'
const oneBillion = 1000000000;
const coinsSection = document.querySelector('.coins-section');
const loading = document.querySelector('.loading');
const totalMarketCap = document.querySelector('.total-market-cap');

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
      name: coin.name,
      symbol: coin.symbol,
      price: coin.current_price,
      market_cap: coin.market_cap,
      price_change_24h: coin.price_change_percentage_24h,
      high_24h: coin.high_24h,
      low_24h: coin.low_24h,
    }
  })
  coinsArray.filter((coin) => coin.index <= 10)
  return coinsArray;
}

// Sum all top 100 coins market cap
function get100MarketCap(array) {
  const top100MarketCap = array.reduce((acc, coin) => acc + coin.market_cap, 0)
  return top100MarketCap;
}

// Render coins
function renderCoin(coin, top100MarketCap) {
  let { index, name, symbol, price, market_cap, price_change_24h, high_24h, low_24h } = coin;
  const percentageOfTop100 = Math.round((market_cap / top100MarketCap) * 10000) / 100;
  price_change_24h = Math.round((price_change_24h) * 100) / 100;

  const newCoin = document.createElement('div');
  const newCoinGenInfo = document.createElement('span');
  const newCoinPriceInfo = document.createElement('span');

  newCoin.className = 'coin-item';
  newCoinGenInfo.className = 'coin-general-info';
  newCoinPriceInfo.className = 'coin-price-info';

  newCoinGenInfo.innerText = `${index}. ${name} (${symbol.toUpperCase()})\n`;
  newCoinPriceInfo.innerText = `Price: $${price.toLocaleString()}\nMarket Cap: $${market_cap.toLocaleString()}\nPrice change 24h: ${price_change_24h}%\nHigh 24h: $${high_24h.toLocaleString()}\nLow 24h: $${low_24h.toLocaleString()}\nDominance in top 100: ${percentageOfTop100}%`;
  
  newCoin.appendChild(newCoinGenInfo);
  newCoin.appendChild(newCoinPriceInfo);
  coinsSection.appendChild(newCoin);
}

function renderTop100(total) {
  totalMarketCap.innerText = `Top 100 Market Cap: $${total.toLocaleString()}`;
}

function renderCoins (array) {
  loading.remove();
  const top100MarketCap = get100MarketCap(array);
  renderTop100(top100MarketCap);
  array.forEach((coin) => renderCoin(coin, top100MarketCap));
}

window.onload = async () => {
  const coinsObj = await getCoinsInfo(BASE_URL, '/coins/markets?vs_currency=usd');
  renderCoins(coinsObj);
}