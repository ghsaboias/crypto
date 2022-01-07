import React from "react";

function Farms({ tvl }) {
  const formattedTvl = (Math.round((tvl + Number.EPSILON) * 100) / 100).toLocaleString();

  return (
    <div className="farms-container">
      <h2>Farms</h2>
      <div className="farms-data-container">
        <p>
          <b>Farms TVL: </b>{ `$${formattedTvl}` }</p>
      </div>
    </div>
  )
}

export default Farms;
