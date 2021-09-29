const WebSocket = require('ws');

const tradeWs = new WebSocket('wss://ws.coincap.io/trades/binance')

tradeWs.onmessage = async function (msg) {
  const coin_data = await JSON.parse(msg.data);
  if (coin_data.base === 'bitcoin') {
    console.log(coin_data)
  }
}