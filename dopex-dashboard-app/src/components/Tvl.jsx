import React from "react";

function Tvl({ tvl }) {
  const formattedTvl = (Math.round((tvl + Number.EPSILON) * 100) / 100).toLocaleString();
  return (
    <div className="tvl-container">
      <span>
        <b>TVL:</b> {tvl ? `$${formattedTvl}` : 'Loading...'}
      </span>
    </div>
  )
}

export default Tvl;
