import React, { useEffect, useState } from 'react';
import fetchEndpoint from './services/fetchEndpoint';
import './App.css';

const DPX_PRICE_ENDPOINT = 'https://api.dopex.io/api/v1/dpx/price';
const DPX_SUPPLY_ENDPOINT = 'https://api.dopex.io/api/v1/dpx/supply';
const DPX_MARKETCAP_ENDPOINT = 'https://api.dopex.io/api/v1/dpx/market-cap';
const RDPX_PRICE_ENDPOINT = 'https://api.dopex.io/api/v1/rdpx/price';
const RDPX_SUPPLY_ENDPOINT = 'https://api.dopex.io/api/v1/rdpx/supply';
const RPDX_MARKETCAP_ENDPOINT = 'https://api.dopex.io/api/v1/rdpx/market-cap';
const FARMS_TVL_ENDPOINT = 'https://api.dopex.io/api/v1/farms/tvl';
const FARMS_TVL_POOLS_ENDPOINT = 'https://api.dopex.io/api/v1/farms/tvl?pool=';
const TVL_ENDPOINT = 'https://api.dopex.io/api/v1/tvl';
const TVL_CONTRACT_ENDPOINT = 'https://api.dopex.io/api/v1/tvl?include=dpx-farm,rdpx-farm,dpx-weth-farm,rdpx-weth-farm,dpx-ssov,rdpx-ssov';

function App() {
  const [tvl, setTvl] = useState({});

  async function fetchTvl() {
    const fetchedTvl = fetchEndpoint(TVL_ENDPOINT);
    setTvl(fetchedTvl);
    console.log(tvl);
  }

  useEffect(() => {
    fetchTvl();
  }, [])
  
  return (
    <div className="App">
      <h1>Dopex Dashboard</h1>
    </div>
  );
}

export default App;
