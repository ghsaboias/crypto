const Web3 = require('web3');

const web3 = new Web3('HTTP://127.0.0.1:7545');
let balance;

web3.eth.getBalance('0x9F33bD349919AC69075eC546B3A169abC7D857Fd', (err, wei) => { balance = web3.utils.fromWei(wei, 'ether') });
