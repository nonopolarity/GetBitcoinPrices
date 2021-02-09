import { useEffect, useState } from "react";
import pluralize from "pluralize";

import './App.css';

// Demo: 
// https://u5jxv.csb.app/
// https://codesandbox.io/s/dazzling-hodgkin-u5jxv

function App() {
  const [data, setData] = useState({});
  const [numBitcoin, setNumBitcoin] = useState("");
  // const [equivUSD, setEquivUSD] = useState(0);
  const [bitcoinToUSDRatio, setBitcoinToUSDRatio] = useState(0);
  const [timeSliceID, setTimeSliceID] = useState(0);
  let foo = 0;

  const equivUSD = () => (numBitcoin * bitcoinToUSDRatio);

  useEffect(() => {
    console.log("Fetching")
    fetch("https://api.coindesk.com/v1/bpi/currentprice.json")
      .then(res => res.json())
      .then(dataFetched => {
        setData(dataFetched);
        console.log("NUM", dataFetched?.bpi?.USD?.rate);
        const ratio = dataFetched?.bpi?.USD?.rate && parseFloat(dataFetched?.bpi?.USD?.rate.replace(",", ""))
        setBitcoinToUSDRatio(ratio);
      });
  }, [timeSliceID]);

  useEffect(() => {
    setInterval(() => {
      console.log("INTERVAL", timeSliceID, foo);
      // timeSliceID++;
      foo++;
      setTimeSliceID(timeSliceID => timeSliceID + 1);
    }, 60000 * 5);
  }, []);

  //http://worldtimeapi.org/api/timezone/America/Los_Angeles

  const convertToUSD = (ev) => {
    console.log("IN convertToUSD", ev.target.value);
    const n = ev.target.value;
    setNumBitcoin(n);
    // setEquivUSD(n * bitcoinToUSDRatio);
  };

  const isNumeric = a => {
    return (a !== "" && !isNaN(a));
  };

  console.log("isNumeric(numBitcoin)", JSON.stringify(numBitcoin), isNumeric(numBitcoin));
  return (
    <div className="App">
      <form>
        Convert <input type="text" placeholder="number of" value={numBitcoin} onChange={convertToUSD} />
        {pluralize("bitcoin", +numBitcoin)} to {isNumeric(numBitcoin) ? "" : "US$"}{isNumeric(numBitcoin) ? `US${new Intl.NumberFormat('us', { style: 'currency', currency: 'USD' }).format(equivUSD())}` : ""}
        <div>
          {isNumeric(numBitcoin) ? <span>{pluralize("bitcoin", +numBitcoin, true)} is USD {
            new Intl.NumberFormat('us', { style: 'currency', currency: 'USD' }).format(equivUSD())}</span>
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
