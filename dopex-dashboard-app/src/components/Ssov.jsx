import React from "react";

function Ssov({ token, tvlByContract }) {
  const { dpxSsovTvl, rebateDpxSsovTvl, gohmSsovTvl } = tvlByContract;

  const formattedDpxSsovTvl = (Math.round((dpxSsovTvl + Number.EPSILON) * 100) / 100).toLocaleString();
  const formattedRebateDpxSsovTvl = (Math.round((rebateDpxSsovTvl + Number.EPSILON) * 100) / 100).toLocaleString();
  const formattedGohmSsovTvl = (Math.round((gohmSsovTvl + Number.EPSILON) * 100) / 100).toLocaleString();

  const isTvlByContractFetched = Object.keys(tvlByContract).length > 0;

  return (
    <div className="ssov-container">
      
    </div>
  )
}

export default Ssov;
