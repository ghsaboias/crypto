import React, { useEffect, useState } from 'react';
import fetchEndpoint from './services/fetchEndpoint';
import Tvl from './components/Tvl';
import DopexPrice from './components/DopexPrice';
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
  const [appTvl, setAppTvl] = useState(0);
  const [dpxPrice, setDpxPrice] = useState({});
  const [dpxSupply, setDpxSupply] = useState({});
  const [dpxMarketCap, setDpxMarketCap] = useState(0);

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

  useEffect(() => {
    fetchTvl();
    fetchDpxPrice();
    fetchDpxSupply();
    fetchDpxMarketCap();
  }, [])
  
  return (
    <div className="App">
      <h1>Dopex Dashboard</h1>
      <Tvl tvl={ Number(appTvl) } />
      <DopexPrice
        price={ dpxPrice }
        supply={ dpxSupply }
        marketCap={ dpxMarketCap }
      />
    </div>
  );
}

export default App;
