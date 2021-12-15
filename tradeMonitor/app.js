// Source: https://medium.com/coinmonks/monitoring-an-ethereum-address-with-web3-js-970c0a3cf96d
const Web3 = require('web3'); // class

const INFURA_ADDRESS = 'https://mainnet.infura.io/v3/a0fec1f1ddb449768d0646ea800e0b4c';
const UNISWAP_ROUTER = '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D';

const web3 = new Web3(INFURA_ADDRESS); // object
const contract = UNISWAP_ROUTER.toLowerCase();

async function checkLastBlock() {
  const block = await web3.eth.getBlock('latest');
  console.log(`Searching for block ${ block.number }`);
  const { transactions } = block;
  if (block && transactions) {
    for (const txHash of transactions) {
      const tx = await web3.eth.getTransaction(txHash);
      const recipient = tx.to.toLowerCase();
      if (recipient === contract) {
        const { hash } = tx;
        const { input } = tx;
        console.log('hash', hash);
        console.log('input', input);
      }
    }
  }
}

checkLastBlock();
