//1. Import coingecko-api
const CoinGecko = require('coingecko-api');

//2. Initiate the CoinGecko API Client
const CoinGeckoClient = new CoinGecko();

//3. Make calls
const func = async() => {
  let data = await CoinGeckoClient.ping();
  console.log(data);
};

const get7DayChange = async() => {
  let requestAllCoins = await CoinGeckoClient.coins.all();
  let coins = requestAllCoins.data.map((coin) => coin.symbol)
  let coins7dChange = requestAllCoins.data.map((coin) => coin.market_data.price_change_percentage_7d_in_currency.usd)
  let newObj = {}
  coins.forEach((coin, index) => {
    newObj[coin] = coins7dChange[index];
  })
  console.log('symbol: 7dChange', newObj)
}


get7DayChange()