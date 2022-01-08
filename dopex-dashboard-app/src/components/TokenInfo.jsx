import React from "react";

function TokenInfo({ token, price, supply, marketCap }) {
  const symbol = token === 'dpx' ? 'DPX' : 'rDPX';

  const { usd: usdPrice, eth: ethPrice } = price;
  const { totalSupply, circulatingSupply } = supply;

  const formattedUsd = (Math.round((usdPrice + Number.EPSILON) * 100) / 100).toLocaleString();
  const formattedEth = (Math.round((ethPrice + Number.EPSILON) * 100) / 100).toLocaleString();
  const formattedTotalSupply = (Math.round((totalSupply + Number.EPSILON) * 100) / 100).toLocaleString();
  const formattedCirculatingSupply = (Math.round((circulatingSupply + Number.EPSILON) * 100) / 100).toLocaleString();
  const formattedMarketCap = (Math.round((marketCap + Number.EPSILON) * 100) / 100).toLocaleString();

  return (
    <div className="token-info-container">
      <h2>{ symbol }</h2>
      <p>
        <b>Market cap: </b>{ marketCap ? `$${formattedMarketCap}` : 'Loading...'}
      </p>
      <p>
        <b>USD price: </b>{ usdPrice ? `$${formattedUsd}` : 'Loading...'}
      </p>
      <p>
        <b>ETH price: </b>{ ethPrice ? `Ξ${formattedEth}` : 'Loading...' }
      </p>
      <p>
        <b>Circulating supply: </b>{ circulatingSupply ? `${formattedCirculatingSupply}` : 'Loading...' }
      </p>
      <p>
        <b>Total supply: </b>{ totalSupply ? `${formattedTotalSupply}` : 'Loading...' }
      </p>
    </div>
  )
}

export default TokenInfo;
