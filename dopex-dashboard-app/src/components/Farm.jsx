import React from "react";

function Farm({ token, tvl, tvlByContract }) {
  const [symbol, pair] = token === 'dpx' ? ['DPX', 'DPX/WETH'] : ['rDPX', 'rDPX/WETH'];

  const { dpxFarmTvl, rebateDpxFarmTvl, dpxWethFarmTvl, rebateDpxWethFarmTvl } = tvlByContract;
  
  const formattedTvl = (Math.round((tvl + Number.EPSILON) * 100) / 100).toLocaleString();
  const formattedDpxFarmTvl = (Math.round((dpxFarmTvl + Number.EPSILON) * 100) / 100).toLocaleString();
  const formattedDpxWethFarmTvl = (Math.round((dpxWethFarmTvl + Number.EPSILON) * 100) / 100).toLocaleString();
  const formattedRebateDpxFarmTvl = (Math.round((rebateDpxFarmTvl + Number.EPSILON) * 100) / 100).toLocaleString();
  const formattedRebateDpxWethFarmTvl = (Math.round((rebateDpxWethFarmTvl + Number.EPSILON) * 100) / 100).toLocaleString();

  return (
    <div className="farms-container">
      <div className="farm-container">
        <p>
          <b>{ `${symbol} farm: ` }</b>{ dpxFarmTvl ? `$${formattedDpxFarmTvl}` : 'Loading...' }
        </p>
        <p>
          <b>{ `${pair} farm: ` }</b>{ dpxWethFarmTvl ? `$${formattedDpxWethFarmTvl}` : 'Loading...' }
        </p>
      </div>
    </div>
  )
}

export default Farm;
