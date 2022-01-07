import React from "react";

function Tvl({ tvl }) {
  const formattedTvl = (Math.round((tvl + Number.EPSILON) * 100) / 100).toLocaleString();
  return (
    <p>
      <b>TVL:</b> {tvl ? `$${formattedTvl}` : 'Loading...'}
    </p>
  )
}

export default Tvl;
