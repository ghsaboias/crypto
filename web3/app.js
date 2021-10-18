const Web3 = require('web3')

const url = 'https://mainnet.infura.io/v3/a0fec1f1ddb449768d0646ea800e0b4c';

const web3 = new Web3(url);
const address = '0x13e965baafda80c7501c23cbed282d5e53e3066b';

// web3.eth.getBalance(address).then((result) => { const balanceEth = web3.utils.fromWei(result) });

async function obtainBalance(address) {
  const balanceWei =  await web3.eth.getBalance(address);
  const balanceEth = web3.utils.fromWei(balanceWei);
  return balanceEth;
}

// obtainBalance(address)

web3.eth.getGasPrice().then((priceWei) => { const price = web3.utils.fromWei(priceWei, 'gwei'); console.log(price); return price })