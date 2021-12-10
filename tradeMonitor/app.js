// Source: https://medium.com/coinmonks/monitoring-an-ethereum-address-with-web3-js-970c0a3cf96d
const Web3 = require('web3');

const transactionChecker = require('./transactionChecker');
const createClient = require('./createClient');

const web3 = createClient(Web3);
const checkBlock = transactionChecker(web3);

checkBlock();