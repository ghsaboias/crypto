// Source: https://medium.com/coinmonks/monitoring-an-ethereum-address-with-web3-js-970c0a3cf96d
const Web3 = require('web3'); // class
const abiDecoder = require('abi-decoder');

const INFURA_ADDRESS = 'https://mainnet.infura.io/v3/a0fec1f1ddb449768d0646ea800e0b4c';
const UNISWAP_ROUTER = '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D';
const ABI = [{ inputs: [{ internalType: 'address', name: '_factory', type: 'address' }, { internalType: 'address', name: '_WETH', type: 'address' }], stateMutability: 'nonpayable', type: 'constructor' }, {
  inputs: [], name: 'WETH', outputs: [{ internalType: 'address', name: '', type: 'address' }], stateMutability: 'view', type: 'function',
}, {
  inputs: [{ internalType: 'address', name: 'tokenA', type: 'address' }, { internalType: 'address', name: 'tokenB', type: 'address' }, { internalType: 'uint256', name: 'amountADesired', type: 'uint256' }, { internalType: 'uint256', name: 'amountBDesired', type: 'uint256' }, { internalType: 'uint256', name: 'amountAMin', type: 'uint256' }, { internalType: 'uint256', name: 'amountBMin', type: 'uint256' }, { internalType: 'address', name: 'to', type: 'address' }, { internalType: 'uint256', name: 'deadline', type: 'uint256' }], name: 'addLiquidity', outputs: [{ internalType: 'uint256', name: 'amountA', type: 'uint256' }, { internalType: 'uint256', name: 'amountB', type: 'uint256' }, { internalType: 'uint256', name: 'liquidity', type: 'uint256' }], stateMutability: 'nonpayable', type: 'function',
}, {
  inputs: [{ internalType: 'address', name: 'token', type: 'address' }, { internalType: 'uint256', name: 'amountTokenDesired', type: 'uint256' }, { internalType: 'uint256', name: 'amountTokenMin', type: 'uint256' }, { internalType: 'uint256', name: 'amountETHMin', type: 'uint256' }, { internalType: 'address', name: 'to', type: 'address' }, { internalType: 'uint256', name: 'deadline', type: 'uint256' }], name: 'addLiquidityETH', outputs: [{ internalType: 'uint256', name: 'amountToken', type: 'uint256' }, { internalType: 'uint256', name: 'amountETH', type: 'uint256' }, { internalType: 'uint256', name: 'liquidity', type: 'uint256' }], stateMutability: 'payable', type: 'function',
}, {
  inputs: [], name: 'factory', outputs: [{ internalType: 'address', name: '', type: 'address' }], stateMutability: 'view', type: 'function',
}, {
  inputs: [{ internalType: 'uint256', name: 'amountOut', type: 'uint256' }, { internalType: 'uint256', name: 'reserveIn', type: 'uint256' }, { internalType: 'uint256', name: 'reserveOut', type: 'uint256' }], name: 'getAmountIn', outputs: [{ internalType: 'uint256', name: 'amountIn', type: 'uint256' }], stateMutability: 'pure', type: 'function',
}, {
  inputs: [{ internalType: 'uint256', name: 'amountIn', type: 'uint256' }, { internalType: 'uint256', name: 'reserveIn', type: 'uint256' }, { internalType: 'uint256', name: 'reserveOut', type: 'uint256' }], name: 'getAmountOut', outputs: [{ internalType: 'uint256', name: 'amountOut', type: 'uint256' }], stateMutability: 'pure', type: 'function',
}, {
  inputs: [{ internalType: 'uint256', name: 'amountOut', type: 'uint256' }, { internalType: 'address[]', name: 'path', type: 'address[]' }], name: 'getAmountsIn', outputs: [{ internalType: 'uint256[]', name: 'amounts', type: 'uint256[]' }], stateMutability: 'view', type: 'function',
}, {
  inputs: [{ internalType: 'uint256', name: 'amountIn', type: 'uint256' }, { internalType: 'address[]', name: 'path', type: 'address[]' }], name: 'getAmountsOut', outputs: [{ internalType: 'uint256[]', name: 'amounts', type: 'uint256[]' }], stateMutability: 'view', type: 'function',
}, {
  inputs: [{ internalType: 'uint256', name: 'amountA', type: 'uint256' }, { internalType: 'uint256', name: 'reserveA', type: 'uint256' }, { internalType: 'uint256', name: 'reserveB', type: 'uint256' }], name: 'quote', outputs: [{ internalType: 'uint256', name: 'amountB', type: 'uint256' }], stateMutability: 'pure', type: 'function',
}, {
  inputs: [{ internalType: 'address', name: 'tokenA', type: 'address' }, { internalType: 'address', name: 'tokenB', type: 'address' }, { internalType: 'uint256', name: 'liquidity', type: 'uint256' }, { internalType: 'uint256', name: 'amountAMin', type: 'uint256' }, { internalType: 'uint256', name: 'amountBMin', type: 'uint256' }, { internalType: 'address', name: 'to', type: 'address' }, { internalType: 'uint256', name: 'deadline', type: 'uint256' }], name: 'removeLiquidity', outputs: [{ internalType: 'uint256', name: 'amountA', type: 'uint256' }, { internalType: 'uint256', name: 'amountB', type: 'uint256' }], stateMutability: 'nonpayable', type: 'function',
}, {
  inputs: [{ internalType: 'address', name: 'token', type: 'address' }, { internalType: 'uint256', name: 'liquidity', type: 'uint256' }, { internalType: 'uint256', name: 'amountTokenMin', type: 'uint256' }, { internalType: 'uint256', name: 'amountETHMin', type: 'uint256' }, { internalType: 'address', name: 'to', type: 'address' }, { internalType: 'uint256', name: 'deadline', type: 'uint256' }], name: 'removeLiquidityETH', outputs: [{ internalType: 'uint256', name: 'amountToken', type: 'uint256' }, { internalType: 'uint256', name: 'amountETH', type: 'uint256' }], stateMutability: 'nonpayable', type: 'function',
}, {
  inputs: [{ internalType: 'address', name: 'token', type: 'address' }, { internalType: 'uint256', name: 'liquidity', type: 'uint256' }, { internalType: 'uint256', name: 'amountTokenMin', type: 'uint256' }, { internalType: 'uint256', name: 'amountETHMin', type: 'uint256' }, { internalType: 'address', name: 'to', type: 'address' }, { internalType: 'uint256', name: 'deadline', type: 'uint256' }], name: 'removeLiquidityETHSupportingFeeOnTransferTokens', outputs: [{ internalType: 'uint256', name: 'amountETH', type: 'uint256' }], stateMutability: 'nonpayable', type: 'function',
}, {
  inputs: [{ internalType: 'address', name: 'token', type: 'address' }, { internalType: 'uint256', name: 'liquidity', type: 'uint256' }, { internalType: 'uint256', name: 'amountTokenMin', type: 'uint256' }, { internalType: 'uint256', name: 'amountETHMin', type: 'uint256' }, { internalType: 'address', name: 'to', type: 'address' }, { internalType: 'uint256', name: 'deadline', type: 'uint256' }, { internalType: 'bool', name: 'approveMax', type: 'bool' }, { internalType: 'uint8', name: 'v', type: 'uint8' }, { internalType: 'bytes32', name: 'r', type: 'bytes32' }, { internalType: 'bytes32', name: 's', type: 'bytes32' }], name: 'removeLiquidityETHWithPermit', outputs: [{ internalType: 'uint256', name: 'amountToken', type: 'uint256' }, { internalType: 'uint256', name: 'amountETH', type: 'uint256' }], stateMutability: 'nonpayable', type: 'function',
}, {
  inputs: [{ internalType: 'address', name: 'token', type: 'address' }, { internalType: 'uint256', name: 'liquidity', type: 'uint256' }, { internalType: 'uint256', name: 'amountTokenMin', type: 'uint256' }, { internalType: 'uint256', name: 'amountETHMin', type: 'uint256' }, { internalType: 'address', name: 'to', type: 'address' }, { internalType: 'uint256', name: 'deadline', type: 'uint256' }, { internalType: 'bool', name: 'approveMax', type: 'bool' }, { internalType: 'uint8', name: 'v', type: 'uint8' }, { internalType: 'bytes32', name: 'r', type: 'bytes32' }, { internalType: 'bytes32', name: 's', type: 'bytes32' }], name: 'removeLiquidityETHWithPermitSupportingFeeOnTransferTokens', outputs: [{ internalType: 'uint256', name: 'amountETH', type: 'uint256' }], stateMutability: 'nonpayable', type: 'function',
}, {
  inputs: [{ internalType: 'address', name: 'tokenA', type: 'address' }, { internalType: 'address', name: 'tokenB', type: 'address' }, { internalType: 'uint256', name: 'liquidity', type: 'uint256' }, { internalType: 'uint256', name: 'amountAMin', type: 'uint256' }, { internalType: 'uint256', name: 'amountBMin', type: 'uint256' }, { internalType: 'address', name: 'to', type: 'address' }, { internalType: 'uint256', name: 'deadline', type: 'uint256' }, { internalType: 'bool', name: 'approveMax', type: 'bool' }, { internalType: 'uint8', name: 'v', type: 'uint8' }, { internalType: 'bytes32', name: 'r', type: 'bytes32' }, { internalType: 'bytes32', name: 's', type: 'bytes32' }], name: 'removeLiquidityWithPermit', outputs: [{ internalType: 'uint256', name: 'amountA', type: 'uint256' }, { internalType: 'uint256', name: 'amountB', type: 'uint256' }], stateMutability: 'nonpayable', type: 'function',
}, {
  inputs: [{ internalType: 'uint256', name: 'amountOut', type: 'uint256' }, { internalType: 'address[]', name: 'path', type: 'address[]' }, { internalType: 'address', name: 'to', type: 'address' }, { internalType: 'uint256', name: 'deadline', type: 'uint256' }], name: 'swapETHForExactTokens', outputs: [{ internalType: 'uint256[]', name: 'amounts', type: 'uint256[]' }], stateMutability: 'payable', type: 'function',
}, {
  inputs: [{ internalType: 'uint256', name: 'amountOutMin', type: 'uint256' }, { internalType: 'address[]', name: 'path', type: 'address[]' }, { internalType: 'address', name: 'to', type: 'address' }, { internalType: 'uint256', name: 'deadline', type: 'uint256' }], name: 'swapExactETHForTokens', outputs: [{ internalType: 'uint256[]', name: 'amounts', type: 'uint256[]' }], stateMutability: 'payable', type: 'function',
}, {
  inputs: [{ internalType: 'uint256', name: 'amountOutMin', type: 'uint256' }, { internalType: 'address[]', name: 'path', type: 'address[]' }, { internalType: 'address', name: 'to', type: 'address' }, { internalType: 'uint256', name: 'deadline', type: 'uint256' }], name: 'swapExactETHForTokensSupportingFeeOnTransferTokens', outputs: [], stateMutability: 'payable', type: 'function',
}, {
  inputs: [{ internalType: 'uint256', name: 'amountIn', type: 'uint256' }, { internalType: 'uint256', name: 'amountOutMin', type: 'uint256' }, { internalType: 'address[]', name: 'path', type: 'address[]' }, { internalType: 'address', name: 'to', type: 'address' }, { internalType: 'uint256', name: 'deadline', type: 'uint256' }], name: 'swapExactTokensForETH', outputs: [{ internalType: 'uint256[]', name: 'amounts', type: 'uint256[]' }], stateMutability: 'nonpayable', type: 'function',
}, {
  inputs: [{ internalType: 'uint256', name: 'amountIn', type: 'uint256' }, { internalType: 'uint256', name: 'amountOutMin', type: 'uint256' }, { internalType: 'address[]', name: 'path', type: 'address[]' }, { internalType: 'address', name: 'to', type: 'address' }, { internalType: 'uint256', name: 'deadline', type: 'uint256' }], name: 'swapExactTokensForETHSupportingFeeOnTransferTokens', outputs: [], stateMutability: 'nonpayable', type: 'function',
}, {
  inputs: [{ internalType: 'uint256', name: 'amountIn', type: 'uint256' }, { internalType: 'uint256', name: 'amountOutMin', type: 'uint256' }, { internalType: 'address[]', name: 'path', type: 'address[]' }, { internalType: 'address', name: 'to', type: 'address' }, { internalType: 'uint256', name: 'deadline', type: 'uint256' }], name: 'swapExactTokensForTokens', outputs: [{ internalType: 'uint256[]', name: 'amounts', type: 'uint256[]' }], stateMutability: 'nonpayable', type: 'function',
}, {
  inputs: [{ internalType: 'uint256', name: 'amountIn', type: 'uint256' }, { internalType: 'uint256', name: 'amountOutMin', type: 'uint256' }, { internalType: 'address[]', name: 'path', type: 'address[]' }, { internalType: 'address', name: 'to', type: 'address' }, { internalType: 'uint256', name: 'deadline', type: 'uint256' }], name: 'swapExactTokensForTokensSupportingFeeOnTransferTokens', outputs: [], stateMutability: 'nonpayable', type: 'function',
}, {
  inputs: [{ internalType: 'uint256', name: 'amountOut', type: 'uint256' }, { internalType: 'uint256', name: 'amountInMax', type: 'uint256' }, { internalType: 'address[]', name: 'path', type: 'address[]' }, { internalType: 'address', name: 'to', type: 'address' }, { internalType: 'uint256', name: 'deadline', type: 'uint256' }], name: 'swapTokensForExactETH', outputs: [{ internalType: 'uint256[]', name: 'amounts', type: 'uint256[]' }], stateMutability: 'nonpayable', type: 'function',
}, {
  inputs: [{ internalType: 'uint256', name: 'amountOut', type: 'uint256' }, { internalType: 'uint256', name: 'amountInMax', type: 'uint256' }, { internalType: 'address[]', name: 'path', type: 'address[]' }, { internalType: 'address', name: 'to', type: 'address' }, { internalType: 'uint256', name: 'deadline', type: 'uint256' }], name: 'swapTokensForExactTokens', outputs: [{ internalType: 'uint256[]', name: 'amounts', type: 'uint256[]' }], stateMutability: 'nonpayable', type: 'function',
}, { stateMutability: 'payable', type: 'receive' }];

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
      const { input, value } = tx;
      if (recipient === contract) {
        console.log(tx);

        abiDecoder.addABI(ABI);

        const ethValue = web3.utils.fromWei(value);
        const decodedData = abiDecoder.decodeMethod(input);
        const { params } = decodedData;
        console.log(decodedData);
        const tokenValue = web3.utils.fromWei(params.filter((param) => param.name === 'amountOutMin')[0].value, 'Gwei');

        console.log(`traded ${ ethValue }ETH for ${ tokenValue } tokens`);
      }
    }
  }
}

checkLastBlock();
