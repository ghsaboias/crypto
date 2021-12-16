import React from 'react';

function Swaps({ swaps }) {
  function renderSwap() {
    console.log(swaps);
    const swapElement = swaps.map((swap, i) => {
      let { amount0, amount1, token0, token1, sender, transaction } = swap;
      const { symbol: symbol0 } = token0;
      const { symbol: symbol1 } = token1;
      const explorerAddress = `https://etherscan.io/tx/${transaction.id}`;
      amount0 = Number(amount0);
      amount1 = Number(amount1);

      const fromCoin = amount0 < 0 ? ({
        symbol: symbol0,
        amount: Math.abs(amount0),
      }) : ({
        symbol: symbol1,
        amount: Math.abs(amount1),
      });

      const toCoin = amount0 > 0 ? ({
        symbol: symbol0,
        amount: Math.abs(amount0),
      }) : ({
        symbol: symbol1,
        amount: Math.abs(amount1),
      });

      return (
        <div className="swap" key={ i }>
          <p>{ `From: ${fromCoin.symbol}` }</p>
          <p>{ `To: ${toCoin.symbol}` }</p>
          <p>{ `From amount: ${fromCoin.amount} ${fromCoin.symbol}` }</p>
          <p>{ `To amount: ${toCoin.amount} ${toCoin.symbol}` }</p>
          <p>{ `Sender: ${sender}` }</p>
          <a
            href={ explorerAddress }
            target="_blank"
            rel="noreferrer"
          >
            { `Transaction: ${explorerAddress}`}
          </a>
        </div>
      )
    })
    return swapElement;
  }

  return (
    <div className="swap">
      { swaps.length ? (
        renderSwap()
      ) : (
        <span>Loading...</span>
      )}
    </div>
  )
}

export default Swaps;
