import './App.css';
import { createClient } from 'urql'
import { useEffect, useState } from 'react'
import Swap from './components/Swap';


const APIURL = "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2";

const query = `
  {
    swaps(first: 100, orderBy: timestamp, orderDirection: desc, where:
      {
        pair: "0xa478c2975ab1ea89e8196811f51a7b7ade33eb11"
      }
    ) {
        pair {
          token0 {
            symbol
          }
          token1 {
            symbol
          }
        }
        amount0In
        amount0Out
        amount1In
        amount1Out
        amountUSD
        to
    }
  }
  `


// amount0Out
// amount1Out
// sender
// to
// pair {
//   token0 {
//     id
//     symbol
//   }
//   token1 {
//     id
//     symbol
//   }
// }
// }

const client = createClient({
  url: APIURL
})

function App() {
  const [swaps, setSwaps] = useState([]);
  const [symbols, setSymbols] = useState({});

  useEffect(() => {
    fetchData();
    console.log('useEffect');
  }, []);

  function adjustFormat(swaps) {
    swaps.forEach((swap, i) => {
      const {
        amount0In,
        amount0Out,
        amount1In,
        amount1Out,
        amountUsd,
        pair,
        to,
      } = swap
      const { token0, token1 } = pair;
      const { symbol: symbol0 } = token0;
      const { symbol: symbol1 } = token1;
      setSymbols({
        ...symbols,
        symbol0,
        symbol1,
      });
    });
  }

  async function fetchData() {
    console.log('fetching');
    const response = await client.query(query).toPromise();
    const { data } = response;
    const { swaps } = data;
    adjustFormat(swaps);
    setSwaps(swaps);
  }

  return (
    <div className="App">
      <span>{ symbols.symbol0 }</span>
      <span>{ symbols.symbol1 }</span>
      <Swap
        swaps={ swaps }
        symbols={ symbols }
      />
    </div>
  );
}

export default App;
