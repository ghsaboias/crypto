import React from "react";

function Farm({ token, tvlByContract }) {
  const [symbol, pair] = token === 'dpx' ? ['DPX', 'DPX/WETH'] : ['rDPX', 'rDPX/WETH'];

  const { dpxFarmTvl, rebateDpxFarmTvl, dpxWethFarmTvl, rebateDpxWethFarmTvl } = tvlByContract;
  
  const formattedDpxFarmTvl = (Math.round((dpxFarmTvl + Number.EPSILON) * 100) / 100).toLocaleString();
  const formattedDpxWethFarmTvl = (Math.round((dpxWethFarmTvl + Number.EPSILON) * 100) / 100).toLocaleString();
  const formattedRebateDpxFarmTvl = (Math.round((rebateDpxFarmTvl + Number.EPSILON) * 100) / 100).toLocaleString();
  const formattedRebateDpxWethFarmTvl = (Math.round((rebateDpxWethFarmTvl + Number.EPSILON) * 100) / 100).toLocaleString();

  const isTvlByContractFetched = Object.keys(tvlByContract).length > 0;

  const coinObj = token === 'dpx' ? ({
    singleFarmTvl: formattedDpxFarmTvl,
    poolFarmTvl: formattedDpxWethFarmTvl,
  }) : ({
    singleFarmTvl: formattedRebateDpxFarmTvl,
    poolFarmTvl: formattedRebateDpxWethFarmTvl,
  })

  const { singleFarmTvl, poolFarmTvl } = coinObj

  return (
    <div className="farm-container">
      <p>
        <b>{ `${symbol} farm: ` }</b>{ isTvlByContractFetched ? `$${ singleFarmTvl }` : 'Loading...' }
      </p>
      <p>
        <b>{ `${pair} farm: ` }</b>{ isTvlByContractFetched ? `$${ poolFarmTvl }` : 'Loading...' }
      </p>
    </div>
  )
}

export default Farm;
