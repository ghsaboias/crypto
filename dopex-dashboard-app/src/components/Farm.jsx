import React from "react";

function Farm({ token, tvlByContract }) {
  const pair = token === 'DPX' ? 'DPX/WETH' : 'rDPX/WETH';

  const { dpxFarmTvl, rebateDpxFarmTvl, dpxWethFarmTvl, rebateDpxWethFarmTvl } = tvlByContract;
  
  const formattedDpxFarmTvl = (Math.round((dpxFarmTvl + Number.EPSILON) * 100) / 100).toLocaleString();
  const formattedDpxWethFarmTvl = (Math.round((dpxWethFarmTvl + Number.EPSILON) * 100) / 100).toLocaleString();
  const formattedRebateDpxFarmTvl = (Math.round((rebateDpxFarmTvl + Number.EPSILON) * 100) / 100).toLocaleString();
  const formattedRebateDpxWethFarmTvl = (Math.round((rebateDpxWethFarmTvl + Number.EPSILON) * 100) / 100).toLocaleString();

  const isTvlByContractFetched = Object.keys(tvlByContract).length > 0;

  const tvlObj = {
    DPX: {
      singleFarmTvl: formattedDpxFarmTvl,
      poolFarmTvl: formattedDpxWethFarmTvl,
    },
    rDPX: {
      singleFarmTvl: formattedRebateDpxFarmTvl,
      poolFarmTvl: formattedRebateDpxWethFarmTvl,
    }
  }

  const { singleFarmTvl, poolFarmTvl } = tvlObj[token];

  return (
    <div className="farm-container">
      <p>
        <b>{ `${token} farm: ` }</b>{ isTvlByContractFetched ? `$${ singleFarmTvl }` : 'Loading...' }
      </p>
      <p>
        <b>{ `${pair} farm: ` }</b>{ isTvlByContractFetched ? `$${ poolFarmTvl }` : 'Loading...' }
      </p>
    </div>
  )
}

export default Farm;
