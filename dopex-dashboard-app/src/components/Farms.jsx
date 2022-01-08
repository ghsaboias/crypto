import React from "react";

function Farms({ tvl, tvlByContract }) {
  const { dpxFarmTvl, rebateDpxFarmTvl, dpxWethFarmTvl, rebateDpxWethFarmTvl } = tvlByContract;
  
  const formattedTvl = (Math.round((tvl + Number.EPSILON) * 100) / 100).toLocaleString();
  const formattedDpxFarmTvl = (Math.round((dpxFarmTvl + Number.EPSILON) * 100) / 100).toLocaleString();
  const formattedDpxWethFarmTvl = (Math.round((dpxWethFarmTvl + Number.EPSILON) * 100) / 100).toLocaleString();
  const formattedRebateDpxFarmTvl = (Math.round((rebateDpxFarmTvl + Number.EPSILON) * 100) / 100).toLocaleString();
  const formattedRebateDpxWethFarmTvl = (Math.round((rebateDpxWethFarmTvl + Number.EPSILON) * 100) / 100).toLocaleString();

  return (
    <div className="farms-container">
      <h2>Farms</h2>
      <p>
          <b>Farms TVL: </b>{ tvl ? `$${formattedTvl}` : 'Loading...' }
      </p>
      <div className="farms-data-container">
        <div className="dpx-farms-container">
          <p>
            <b>DPX Farm: </b>{ dpxFarmTvl ? `$${formattedDpxFarmTvl}` : 'Loading...' }
          </p>
          <p>
            <b>DPX/WETH Farm: </b>{ dpxWethFarmTvl ? `$${formattedDpxWethFarmTvl}` : 'Loading...' }
          </p>
        </div>
        <div className="rdpx-farms-container">
          <p>
            <b>rDPX Farm: </b>{ rebateDpxFarmTvl ? `$${formattedRebateDpxFarmTvl}` : 'Loading...' }
          </p>
          <p>
            <b>rDPX/WETH Farm: </b>{ rebateDpxWethFarmTvl ? `$${formattedRebateDpxWethFarmTvl}` : 'Loading...' }
          </p>
        </div>
      </div>
    </div>
  )
}

export default Farms;
