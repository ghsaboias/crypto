import fetch from 'node-fetch';

// returns DPX price as object with usd and eth keys
async function getPrice() {
  const ENDPOINT = 'https://api.dopex.io/api/v1/dpx/price';
  const response = await fetch(ENDPOINT);
  const responseJSON = await response.json();
  const { price } = responseJSON;
  console.log(price);
  return price;
}

getPrice();
