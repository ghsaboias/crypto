import React, { useEffect, useState } from 'react';
import fetchEndpoint from './services/fetchEndpoint';
import Tvl from './components/Tvl';
import './App.css';
import DpxTokenInfo from './components/DpxTokenInfo';
import RebateDpxTokenInfo from './components/RebateDpxTokenInfo';
import Farms from './components/Farms';

function App() {
  const DPX_PRICE_ENDPOINT = 'https://api.dopex.io/api/v1/dpx/price';
  const DPX_SUPPLY_ENDPOINT = 'https://api.dopex.io/api/v1/dpx/supply';
  const DPX_MARKETCAP_ENDPOINT = 'https://api.dopex.io/api/v1/dpx/market-cap';
  const RDPX_PRICE_ENDPOINT = 'https://api.dopex.io/api/v1/rdpx/price';
  const RDPX_SUPPLY_ENDPOINT = 'https://api.dopex.io/api/v1/rdpx/supply';
  const RPDX_MARKETCAP_ENDPOINT = 'https://api.dopex.io/api/v1/rdpx/market-cap';
  const FARMS_TVL_ENDPOINT = 'https://api.dopex.io/api/v1/farms/tvl';
  const TVL_ENDPOINT = 'https://api.dopex.io/api/v1/tvl';
  const TVL_CONTRACT_ENDPOINT = 'https://api.dopex.io/api/v1/tvl?include=';
  
  const HEROKU_URL = 'https://quiet-wildwood-23140.herokuapp.com/';

  const [appTvl, setAppTvl] = useState(0);
  const [dpxPrice, setDpxPrice] = useState({});
  const [dpxSupply, setDpxSupply] = useState({});
  const [dpxMarketCap, setDpxMarketCap] = useState(0);
  const [rebateDpxPrice, setRebateDpxPrice] = useState({});
  const [rebateDpxSupply, setRebateDpxSupply] = useState({});
  const [rebateDpxMarketCap, setRebateDpxMarketCap] = useState(0);
  const [farmsTvl, setFarmsTvl] = useState(0);
  const [tvlByContract, setTvlByContract] = useState({});

  async function fetchTvl() {
    // Source: https://stackoverflow.com/a/43881141
    const fetchedTvl = await fetchEndpoint(`${HEROKU_URL}${TVL_ENDPOINT}`);
    const { tvl } = fetchedTvl;
    setAppTvl(tvl);
  }

  async function fetchDpxPrice() {
    const fetchedDpxPrice = await fetchEndpoint(`${HEROKU_URL}${DPX_PRICE_ENDPOINT}`);
    const { price } = fetchedDpxPrice;
    setDpxPrice(price);
  }

  async function fetchDpxSupply() {
    const fetchedDpxSupply = await fetchEndpoint(`${HEROKU_URL}${DPX_SUPPLY_ENDPOINT}`);
    setDpxSupply(fetchedDpxSupply);
  }

  async function fetchDpxMarketCap() {
    const fetchedDpxMarketCap = await fetchEndpoint(`${HEROKU_URL}${DPX_MARKETCAP_ENDPOINT}`);
    const { marketCap } = fetchedDpxMarketCap;
    setDpxMarketCap(marketCap);
  }

  async function fetchRebateDpxPrice() {
    const fetchedRebateDpxPrice = await fetchEndpoint(`${HEROKU_URL}${RDPX_PRICE_ENDPOINT}`);
    const { price } = fetchedRebateDpxPrice;
    setRebateDpxPrice(price);
  }

  async function fetchRebateDpxSupply() {
    const fetchedRebateDpxSupply = await fetchEndpoint(`${HEROKU_URL}${RDPX_SUPPLY_ENDPOINT}`);
    setRebateDpxSupply(fetchedRebateDpxSupply);
  }

  async function fetchRebateDpxMarketCap() {
    const fetchedRebateDpxMarketCap = await fetchEndpoint(`${HEROKU_URL}${RPDX_MARKETCAP_ENDPOINT}`);
    const { marketCap } = fetchedRebateDpxMarketCap;
    setRebateDpxMarketCap(marketCap);
  }

  async function fetchFarmsTvl() {
    const fetchedFarmsTvl = await fetchEndpoint(`${HEROKU_URL}${FARMS_TVL_ENDPOINT}`);
    const { tvl } = fetchedFarmsTvl;
    setFarmsTvl(Number(tvl));
  }

  async function fetchTvlByContract() {
    const { tvl: dpxFarmTvl } = await fetchEndpoint(`${HEROKU_URL}${TVL_CONTRACT_ENDPOINT}`, 'dpx-farm');
    const { tvl: rebateDpxFarmTvl } = await fetchEndpoint(`${HEROKU_URL}${TVL_CONTRACT_ENDPOINT}`, 'rdpx-farm');
    const { tvl: dpxWethFarmTvl } = await fetchEndpoint(`${HEROKU_URL}${TVL_CONTRACT_ENDPOINT}`, 'dpx-weth-farm');
    const { tvl: rebateDpxWethFarmTvl } = await fetchEndpoint(`${HEROKU_URL}${TVL_CONTRACT_ENDPOINT}`, 'rdpx-weth-farm');
    const { tvl: dpxSsovTvl } = await fetchEndpoint(`${HEROKU_URL}${TVL_CONTRACT_ENDPOINT}`, 'dpx-ssov');
    const { tvl: rebateDpxSsovTvl } = await fetchEndpoint(`${HEROKU_URL}${TVL_CONTRACT_ENDPOINT}`, 'rdpx-ssov');
    const { tvl: gohmSsovTvl } = await fetchEndpoint(`${HEROKU_URL}${TVL_CONTRACT_ENDPOINT}`, 'gohm-ssov');
    const tvlByContract = {
      dpxFarmTvl: Number(dpxFarmTvl),
      rebateDpxFarmTvl: Number(rebateDpxFarmTvl),
      dpxWethFarmTvl: Number(dpxWethFarmTvl),
      rebateDpxWethFarmTvl: Number(rebateDpxWethFarmTvl),
      dpxSsovTvl,
      rebateDpxSsovTvl,
      gohmSsovTvl,
    }
    setTvlByContract(tvlByContract);
  }

  function fetchData() {
    fetchTvl();
    fetchDpxPrice();
    fetchDpxSupply();
    fetchDpxMarketCap();
    fetchRebateDpxPrice();
    fetchRebateDpxSupply();
    fetchRebateDpxMarketCap();
    fetchFarmsTvl();
    fetchTvlByContract();
  }

  // Source: https://stackoverflow.com/a/70506513
  useEffect(() => {
    fetchData();
    const intervalCall = setInterval(() => {
      fetchData();
    }, 10000);
    return () => {
      // clean up
      clearInterval(intervalCall);
    };
  }, []);
  
  return (
    <div className="App">
      <header>
        <h1>Dopex Dashboard</h1>
      </header>
      <Tvl tvl={ Number(appTvl) } />
      <div className="tokens-info-container">
        <DpxTokenInfo
          price={ dpxPrice }
          supply={ dpxSupply }
          marketCap={ dpxMarketCap }
        />
        <RebateDpxTokenInfo
          price={ rebateDpxPrice }
          supply={ rebateDpxSupply }
          marketCap={ rebateDpxMarketCap }
        />
      </div>
      <Farms
        tvl={ Number(farmsTvl) }
        tvlByContract={ tvlByContract }
      />
    </div>
  );
}

export default App;
