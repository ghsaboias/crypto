import fetch from 'node-fetch';

// returns DPX price as object with usd and eth keys
async function getPriceObj() {
  const ENDPOINT = 'https://api.dopex.io/api/v1/dpx/price';
  const response = await fetch(ENDPOINT);
  const responseJSON = await response.json();
  const { price } = responseJSON;
  return price;
}

async function getUsdEthPrice() {
  const { usd, eth } = await getPriceObj();
  return { usd, eth };
}

getUsdEthPrice();
