const UNISWAP_ROUTER = '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D';

module.exports = web3 => {
  const contract = UNISWAP_ROUTER.toLowerCase();

  return async function checkLastBlock() {
    let block = await web3.eth.getBlock(13774359);
    console.log(`Searching for block ${ block.number }`);
    if (block && block.transactions) {
      for (let txHash of block.transactions) {
        let tx = await web3.eth.getTransaction(txHash);
        const recipient = tx.to.toLowerCase();
        if (recipient === contract) console.log(tx);
      }
    }
  }
}
