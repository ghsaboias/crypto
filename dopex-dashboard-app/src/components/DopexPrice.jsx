import React from "react";

function DopexPrice({ price, supply, marketCap }) {
  const { usd: usdPrice, eth: ethPrice } = price;
  const { maxSupply, circulatingSupply } = supply;
  const formattedUsd = (Math.round((usdPrice + Number.EPSILON) * 100) / 100).toLocaleString();
  const formattedEth = (Math.round((ethPrice + Number.EPSILON) * 100) / 100).toLocaleString();
  const formattedMaxSupply = (Math.round((maxSupply + Number.EPSILON) * 100) / 100).toLocaleString();
  const formattedCirculatingSupply = (Math.round((circulatingSupply + Number.EPSILON) * 100) / 100).toLocaleString();
  const formattedMarketCap = (Math.round((marketCap + Number.EPSILON) * 100) / 100).toLocaleString();

  console.log(marketCap)
  return (
    <div className="dpx-price-container">
      <h2>DPX</h2>
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
        <b>Max supply: </b>{ maxSupply ? `${formattedMaxSupply}` : 'Loading...' }
      </p>
    </div>
  )
}

export default DopexPrice;
