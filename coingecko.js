const BASE_URL = 'https://api.coingecko.com/api/v3'
const coins_section = document.querySelector('.coins-section');
const loading = document.querySelector('.loading');
const total_market_cap = document.querySelector('.total-market-cap');
const heatmap_btn = document.querySelector('.heatmap');

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
async function get_coins_info(url, endpoint) {
  const response = await getEndpoint(url, endpoint);
  const coins_array = response.map((coin, index) => {
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
  return coins_array;
}

// Sum all top 100 coins market cap
function get_100_market_cap(array) {
  const top_100_market_cap = array.reduce((acc, coin) => acc + coin.market_cap, 0)
  return top_100_market_cap;
}

// Render coins
function render_coin(coin, top_100_market_cap) {
  let { index, name, symbol, price, market_cap, price_change_24h } = coin;
  const percentage_of_top_100 = Math.round((market_cap / top_100_market_cap) * 10000) / 100;
  price_change_24h = Math.round((price_change_24h) * 100) / 100;

  const new_coin = document.createElement('div');
  const new_coin_gen_info = document.createElement('span');
  const new_coin_price_info = document.createElement('ul');

  new_coin.className = 'coin-item';
  new_coin_gen_info.className = 'coin-general-info';
  new_coin_price_info.className = 'coin-price-info';

  new_coin_gen_info.innerText = `${index}. ${name} (${symbol.toUpperCase()})\n`;

  const price_list_item = document.createElement('li');
  const market_cap_list_item = document.createElement('li');
  const price_change_list_item = document.createElement('li');
  const percentage_of_top_100_list_item = document.createElement('li');

  price_list_item.innerText = `Price: $${price.toLocaleString()}`;
  market_cap_list_item.innerText = `Market cap: $${market_cap.toLocaleString()}`;
  price_change_list_item.innerText = `Price change 24h: ${price_change_24h.toLocaleString()}%`;
  percentage_of_top_100_list_item.innerText = `Dominance in top 100: ${percentage_of_top_100.toLocaleString()}%`;

  new_coin_price_info.appendChild(price_list_item);
  new_coin_price_info.appendChild(market_cap_list_item);
  new_coin_price_info.appendChild(price_change_list_item);
  new_coin_price_info.appendChild(percentage_of_top_100_list_item);

  new_coin.appendChild(new_coin_gen_info);
  new_coin.appendChild(new_coin_price_info);
  coins_section.appendChild(new_coin);
}

function render_top_100(total) {
  total_market_cap.innerText = `Top 100 Market Cap: $${total.toLocaleString()}`;
}

function render_coins (array) {
  loading.remove();
  const top_100_market_cap = get_100_market_cap(array);
  render_top_100(top_100_market_cap);
  array.forEach((coin) => render_coin(coin, top_100_market_cap));
}

function add_heatmap() {
  const is_heatmap = document.querySelector('.coin-item-green') || document.querySelector('.coin-item-red');
  const coin_elements = Array.from(document.getElementsByClassName('coin-item'));
  coin_elements.forEach((coin) => {
    if (is_heatmap) {
      coin.classList.remove('coin-item-green');
      coin.classList.remove('coin-item-red');
    } else {
      const coin_info = Array.from(coin.children);
      const price_info = coin_info[1];
      const price_info_arr = Array.from(price_info.children);
      const price_change_item = price_info_arr[2];
      const price_change = price_change_item.innerText.split(' ').at(-1);
      const price_change_number = Number(price_change.substring(0, price_change.length - 1));
      if (price_change_number >= 0) {
        coin.classList.add('coin-item-green');
      } else {
        coin.classList.add('coin-item-red');
      }
    }
  })
}

window.onload = async () => {
  const coinsArr = await get_coins_info(BASE_URL, '/coins/markets?vs_currency=usd');
  render_coins(coinsArr);
  heatmap_btn.addEventListener('click', add_heatmap);
}
