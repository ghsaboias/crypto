const Web3 = require("web3");

const url = "https://mainnet.infura.io/v3/a0fec1f1ddb449768d0646ea800e0b4c";

const web3 = new Web3(url);
const MY_ADDRESS = "0x13e965baafda80c7501c23cbed282d5e53e3066b";

// let balanceEth;

// balance is stored in balanceEth global variable
// web3.eth.getBalance(MY_ADDRESS).then((result) => { balanceEth = web3.utils.fromWei(result) });

// setTimeout(() => console.log(balanceEth), 3000)

// async function fetchBalance(MY_ADDRESS) {
//   const balanceWei =  await web3.eth.getBalance(MY_ADDRESS);
//   const balanceEth = web3.utils.fromWei(balanceWei);
//   console.log(balanceEth);
//   return balanceEth;
// }

// const balance = fetchBalance(MY_ADDRESS);

// Get current gas price
// web3.eth.getGasPrice().then((priceWei) => { const price = web3.utils.fromWei(priceWei, 'gwei'); console.log('Current gas price:', price)})
