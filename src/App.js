import { useEffect, useState } from "react";
// import pluralize from "pluralize";

import './App.css';

// Demo: 
// https://u5jxv.csb.app/
// https://codesandbox.io/s/dazzling-hodgkin-u5jxv

function App() {
  const [data, setData] = useState({});
   const [timeSliceID, setTimeSliceID] = useState(0);

  useEffect(() => {
    // console.log("Fetching");
    fetch("https://api.coindesk.com/v1/bpi/currentprice.json")
      .then(res => res.json())
      .then(dataFetched => {
        setData(dataFetched);
        // console.log("NUM", dataFetched?.bpi?.USD?.rate);
        // const ratio = dataFetched?.bpi?.USD?.rate && parseFloat(dataFetched?.bpi?.USD?.rate.replace(",", ""))
        // setBitcoinToUSDRatio(ratio);
      });
  }, [timeSliceID]);

  useEffect(() => {
    setInterval(() => {
      // console.log("INTERVAL", timeSliceID, foo);
      setTimeSliceID(timeSliceID => timeSliceID + 1);
    }, 15 * 1000);
  }, []);

  const priceOfBitcoin = () => {
    if (!data?.bpi) return "";

    // console.log("PRICE", data?.bpi?.USD?.rate);
    const priceString = data?.bpi?.USD?.rate;
    const price = +(priceString !== undefined ? priceString.replace(",", "") : null);
    // const priceRounded = Math.round(+price * 100) / 100;

    // return priceRounded.toLocaleString(undefined, {minimumFractionDigits: 2});
    // Math.round(+(data?.bpi?.USD?.rate) * 100) / 100;

    return `$${Math.round(price)}`;
  }


  // const isNumeric = a => {
  //   return (a !== "" && !isNaN(a));
  // };

  return (
    <div className="App">

    { priceOfBitcoin() }
      {/* <pre className="data">
        {JSON.stringify(data, null, 4)}
      </pre> */}
    </div>
  );
}

export default App;
