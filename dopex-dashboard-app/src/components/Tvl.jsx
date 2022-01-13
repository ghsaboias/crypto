import React from "react";

function Tvl({ tvl, type }) {
  const titleObj = {
    total: '',
    farms: 'Farms',
    ssov: 'SSOV',
  }

  const formattedTvl = (Math.round((tvl + Number.EPSILON) * 100) / 100).toLocaleString();

  return (
    <div className="tvl-container">
      <h3>{ titleObj[type] }</h3>
      <b>TVL</b> {tvl ? `$${formattedTvl}` : 'Loading...'}
    </div>
  )
}

export default Tvl;
