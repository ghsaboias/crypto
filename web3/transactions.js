// create new Web3 object
const Web3 = require('web3');

// create connection to ganache
const web3 = new Web3('http://127.0.0.1:7545');

const account1 = '0x1f369F5f50784634fC501CE1aaDc01145920ff3A';
const account2 = '0x5977346aC44bC7713394faa0F9103440d255C1f1';

const fetchBalance = async (address) => {
  let balance = await web3.eth.getBalance(address).then((bal) => web3.utils.fromWei(bal));
  console.log(balance)
  return balance;
}

const sendEth = (from, to, value) => {
  let transactionObject = {
    from,
    to,
    value: web3.utils.toWei(String(value), 'ether'),
  }
  web3.eth.sendTransaction(transactionObject);
}

console.log('balance1 before transaction');
fetchBalance(account1)
sendEth(account2, account1, 1);
setTimeout(() => {
  console.log('balance1 after transaction');
  fetchBalance(account1);
}, 1000);