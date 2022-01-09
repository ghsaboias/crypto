import React from "react";

function Tvl({ tvl, type }) {
  const title = type === 'farms' ? 'Farms' : '';

  const formattedTvl = (Math.round((tvl + Number.EPSILON) * 100) / 100).toLocaleString();
  return (
    <div className="tvl-container">
      <span>
        <h3>{ title }</h3>
        <b>TVL</b> {tvl ? `$${formattedTvl}` : 'Loading...'}
      </span>
    </div>
  )
}

export default Tvl;
