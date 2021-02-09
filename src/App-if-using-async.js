import { useEffect, useState } from "react";
import pluralize from "pluralize";

import './App.css';

// Demo: 
// https://u5jxv.csb.app/
// https://codesandbox.io/s/dazzling-hodgkin-u5jxv

function App() {
  const [data, setData] = useState({});
  const [numBitcoin, setNumBitcoin] = useState("");
  const [equivUSD, setEquivUSD] = useState(0);
  const [bitcoinToUSDRatio, setBitcoinToUSDRatio] = useState(0);

  useEffect(async () => {
    const res = await fetch("https://api.coindesk.com/v1/bpi/currentprice.json"),
      dataFetched = await res.json();

    setData(dataFetched);
    const ratio = dataFetched?.bpi?.USD?.rate && parseFloat(dataFetched?.bpi?.USD?.rate.replace(",", ""))
    setBitcoinToUSDRatio(ratio);
  }, []);

  const convertToUSD = (ev) => {
    console.log("IN convertToUSD", ev.target.value);
    const n = ev.target.value;
    setNumBitcoin(n);
    setEquivUSD(n * bitcoinToUSDRatio);
  };

  const isNumeric = a => {
    return (a !== "" && !isNaN(a));
  };

  console.log("isNumeric(numBitcoin)", JSON.stringify(numBitcoin), isNumeric(numBitcoin));
  return (
    <div className="App">
      <form>
        Convert <input type="text" placeholder="number of" value={numBitcoin} onChange={convertToUSD} />
        {pluralize("bitcoin", +numBitcoin)} to {isNumeric(numBitcoin) ? "" : "US$"}{isNumeric(numBitcoin) ? `US${new Intl.NumberFormat('us', { style: 'currency', currency: 'USD' }).format(equivUSD)}` : ""}
        <div>
          {isNumeric(numBitcoin) ? <span>{pluralize("bitcoin", +numBitcoin, true)} is USD {
            new Intl.NumberFormat('us', { style: 'currency', currency: 'USD' }).format(equivUSD)}</span>
            : <span>&nbsp;</span>}
        </div>
      </form>
      {/* <pre className="data">
        {JSON.stringify(data, null, 4)}
      </pre> */}
    </div>
  );
}

export default App;
