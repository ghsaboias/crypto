import React, { useEffect, useState } from 'react';
import fetchEndpoint from './services/fetchEndpoint';
import Tvl from './components/Tvl';
import './App.css';
import DpxTokenInfo from './components/DpxTokenInfo';
import RebateDpxTokenInfo from './components/RebateDpxTokenInfo';
import Farms from './components/Farms';

const DPX_PRICE_ENDPOINT = 'https://api.dopex.io/api/v1/dpx/price';
const DPX_SUPPLY_ENDPOINT = 'https://api.dopex.io/api/v1/dpx/supply';
const DPX_MARKETCAP_ENDPOINT = 'https://api.dopex.io/api/v1/dpx/market-cap';
const RDPX_PRICE_ENDPOINT = 'https://api.dopex.io/api/v1/rdpx/price';
const RDPX_SUPPLY_ENDPOINT = 'https://api.dopex.io/api/v1/rdpx/supply';
const RPDX_MARKETCAP_ENDPOINT = 'https://api.dopex.io/api/v1/rdpx/market-cap';
const FARMS_TVL_ENDPOINT = 'https://api.dopex.io/api/v1/farms/tvl';
const TVL_ENDPOINT = 'https://api.dopex.io/api/v1/tvl';
const TVL_CONTRACT_ENDPOINT = 'https://api.dopex.io/api/v1/tvl?include=';

function App() {
  const [appTvl, setAppTvl] = useState(0);
  const [dpxPrice, setDpxPrice] = useState({});
  const [dpxSupply, setDpxSupply] = useState({});
  const [dpxMarketCap, setDpxMarketCap] = useState(0);
  const [rebateDpxPrice, setRebateDpxPrice] = useState({});
  const [rebateDpxSupply, setRebateDpxSupply] = useState({});
  const [rebateDpxMarketCap, setRebateDpxMarketCap] = useState(0);
  const [farmsTvl, setFarmsTvl] = useState(0);

  async function fetchTvl() {
    // Source: https://stackoverflow.com/a/43881141
    const fetchedTvl = await fetchEndpoint(`https://quiet-wildwood-23140.herokuapp.com/${TVL_ENDPOINT}`);
    const { tvl } = fetchedTvl;
    setAppTvl(tvl);
  }

  async function fetchDpxPrice() {
    const fetchedDpxPrice = await fetchEndpoint(`https://quiet-wildwood-23140.herokuapp.com/${DPX_PRICE_ENDPOINT}`);
    const { price } = fetchedDpxPrice;
    setDpxPrice(price);
  }

  async function fetchDpxSupply() {
    const fetchedDpxSupply = await fetchEndpoint(`https://quiet-wildwood-23140.herokuapp.com/${DPX_SUPPLY_ENDPOINT}`);
    setDpxSupply(fetchedDpxSupply);
  }

  async function fetchDpxMarketCap() {
    const fetchedDpxMarketCap = await fetchEndpoint(`https://quiet-wildwood-23140.herokuapp.com/${DPX_MARKETCAP_ENDPOINT}`);
    const { marketCap } = fetchedDpxMarketCap;
    setDpxMarketCap(marketCap);
  }

  async function fetchRebateDpxPrice() {
    const fetchedRebateDpxPrice = await fetchEndpoint(`https://quiet-wildwood-23140.herokuapp.com/${RDPX_PRICE_ENDPOINT}`);
    const { price } = fetchedRebateDpxPrice;
    setRebateDpxPrice(price);
  }

  async function fetchRebateDpxSupply() {
    const fetchedRebateDpxSupply = await fetchEndpoint(`https://quiet-wildwood-23140.herokuapp.com/${RDPX_SUPPLY_ENDPOINT}`);
    setRebateDpxSupply(fetchedRebateDpxSupply);
  }

  async function fetchRebateDpxMarketCap() {
    const fetchedRebateDpxMarketCap = await fetchEndpoint(`https://quiet-wildwood-23140.herokuapp.com/${RPDX_MARKETCAP_ENDPOINT}`);
    const { marketCap } = fetchedRebateDpxMarketCap;
    setRebateDpxMarketCap(marketCap);
  }

  async function fetchFarmsTvl() {
    const fetchedFarmsTvl = await fetchEndpoint(`https://quiet-wildwood-23140.herokuapp.com/${FARMS_TVL_ENDPOINT}`);
    const { tvl } = fetchedFarmsTvl;
    setFarmsTvl(Number(tvl));
  }

  async function fetchTvlByContract() {
    const { tvl: dpxFarmTvl } = await fetchEndpoint(`https://quiet-wildwood-23140.herokuapp.com/${TVL_CONTRACT_ENDPOINT}`, 'dpx-farm');
    const { tvl: rebateDpxFarmTvl } = await fetchEndpoint(`https://quiet-wildwood-23140.herokuapp.com/${TVL_CONTRACT_ENDPOINT}`, 'rdpx-farm');
    const { tvl: dpxWethFarmTvl } = await fetchEndpoint(`https://quiet-wildwood-23140.herokuapp.com/${TVL_CONTRACT_ENDPOINT}`, 'dpx-weth-farm');
    const { tvl: rebateDpxWethFarmTvl } = await fetchEndpoint(`https://quiet-wildwood-23140.herokuapp.com/${TVL_CONTRACT_ENDPOINT}`, 'rdpx-weth-farm');
    const { tvl: dpxSsovTvl } = await fetchEndpoint(`https://quiet-wildwood-23140.herokuapp.com/${TVL_CONTRACT_ENDPOINT}`, 'dpx-ssov');
    const { tvl: rebateDpxSsovTvl } = await fetchEndpoint(`https://quiet-wildwood-23140.herokuapp.com/${TVL_CONTRACT_ENDPOINT}`, 'rdpx-ssov');
    const { tvl: wethSsovTvl } = await fetchEndpoint(`https://quiet-wildwood-23140.herokuapp.com/${TVL_CONTRACT_ENDPOINT}`, 'eth-ssov');
    const { tvl: gohmSsovTvl } = await fetchEndpoint(`https://quiet-wildwood-23140.herokuapp.com/${TVL_CONTRACT_ENDPOINT}`, 'gohm-ssov');
    const tvlByContract = {
      dpxFarmTvl,
      rebateDpxFarmTvl,
      dpxWethFarmTvl,
      rebateDpxWethFarmTvl,
      dpxSsovTvl,
      rebateDpxSsovTvl,
      wethSsovTvl,
      gohmSsovTvl,
    }
    console.log(tvlByContract);
  }

  useEffect(() => {
    fetchTvl();
    fetchDpxPrice();
    fetchDpxSupply();
    fetchDpxMarketCap();
    fetchRebateDpxPrice();
    fetchRebateDpxSupply();
    fetchRebateDpxMarketCap();
    fetchFarmsTvl();
    fetchTvlByContract();
  }, [])
  
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
      />
    </div>
  );
}

export default App;
