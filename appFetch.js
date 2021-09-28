const BASE_URL = 'https://api.coingecko.com/api/v3'
const oneBillion = 1000000000;
const coinsSection = document.querySelector('.coins-section');
const loading = document.querySelector('.loading');
const totalMarketCap = document.querySelector('.total-market-cap');
const heatmapBtn = document.querySelector('.heatmap');

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
  return coinsArray;
}

// Sum all top 100 coins market cap
function get100MarketCap(array) {
  const top100MarketCap = array.reduce((acc, coin) => acc + coin.market_cap, 0)
  return top100MarketCap;
}

// Render coins
function renderCoin(coin, top100MarketCap) {
  let { index, name, symbol, price, market_cap, price_change_24h } = coin;
  const percentageOfTop100 = Math.round((market_cap / top100MarketCap) * 10000) / 100;
  price_change_24h = Math.round((price_change_24h) * 100) / 100;

  const newCoin = document.createElement('div');
  const newCoinGenInfo = document.createElement('span');
  const newCoinPriceInfo = document.createElement('ul');

  newCoin.className = 'coin-item';
  newCoinGenInfo.className = 'coin-general-info';
  newCoinPriceInfo.className = 'coin-price-info';

  newCoinGenInfo.innerText = `${index}. ${name} (${symbol.toUpperCase()})\n`;

  const priceListItem = document.createElement('li');
  priceListItem.innerText = `Price: $${price.toLocaleString()}`;
  newCoinPriceInfo.appendChild(priceListItem);
  const marketCapListItem = document.createElement('li');
  marketCapListItem.innerText = `Market cap: $${market_cap.toLocaleString()}`;
  newCoinPriceInfo.appendChild(marketCapListItem);
  const priceChangeListItem = document.createElement('li');
  priceChangeListItem.innerText = `Price change 24h: ${price_change_24h.toLocaleString()}%`;
  newCoinPriceInfo.appendChild(priceChangeListItem);
  const percentageOfTop100ListItem = document.createElement('li');
  percentageOfTop100ListItem.innerText = `Dominance in top 100: ${percentageOfTop100.toLocaleString()}%`;
  newCoinPriceInfo.appendChild(percentageOfTop100ListItem);

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

function addHeatmap() {
  const isHeatmap = document.querySelector('.coin-item-green') || document.querySelector('.coin-item-red');
  const coinElements = Array.from(document.getElementsByClassName('coin-item'));
  coinElements.forEach((coin) => {
    if (isHeatmap) {
      coin.classList.remove('coin-item-green');
      coin.classList.remove('coin-item-red');
    } else {
      const coinInfo = Array.from(coin.children);
      const priceInfo = coinInfo[1];
      const priceInfoArr = Array.from(priceInfo.children);
      const priceChangeItem = priceInfoArr[2];
      const priceChange = priceChangeItem.innerText.split(' ').at(-1);
      const priceChangeNumber = Number(priceChange.substring(0, priceChange.length - 1));
      if (priceChangeNumber >= 0) {
        coin.classList.add('coin-item-green');
      } else {
        coin.classList.add('coin-item-red');
      }
    }
  })
}




window.onload = async () => {
  const coinsArr = await getCoinsInfo(BASE_URL, '/coins/markets?vs_currency=usd');
  renderCoins(coinsArr);
  heatmapBtn.addEventListener('click', addHeatmap);
}