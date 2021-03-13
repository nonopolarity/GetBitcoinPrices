import { useEffect, useState } from "react";
// import pluralize from "pluralize";

import './App.css';

// Demo: 
// https://u5jxv.csb.app/
// https://codesandbox.io/s/dazzling-hodgkin-u5jxv

const source = (new URLSearchParams(document.location.search)).get("source") === "coinbase" ? "coinbase" : "coindesk";

const dataIO = {};

console.log("start");
console.log(`source is ${source}`);

if (source === "coinbase") {
  dataIO.url = "https://api.coinbase.com/v2/prices/spot?currency=USD";
  dataIO.getPriceFromData = data => {


    if (!data?.data?.amount) return "";

    // console.log("PRICE", data?.bpi?.USD?.rate);
    const priceString = data?.data?.amount;
    const price = +(priceString !== undefined ? priceString.replace(",", "") : null);
    // const priceRounded = Math.round(+price * 100) / 100;

    // return priceRounded.toLocaleString(undefined, {minimumFractionDigits: 2});
    // Math.round(+(data?.bpi?.USD?.rate) * 100) / 100;

    return `$${Math.round(price)}`;
  };
} else {
  // console.log("source is coindesk");
  dataIO.url = "https://api.coindesk.com/v1/bpi/currentprice.json";
  dataIO.getPriceFromData = data => {
    if (!data?.bpi) return "";

    // console.log("PRICE", data?.bpi?.USD?.rate);
    const priceString = data?.bpi?.USD?.rate;
    const price = +(priceString !== undefined ? priceString.replace(",", "") : null);
    // const priceRounded = Math.round(+price * 100) / 100;

    // return priceRounded.toLocaleString(undefined, {minimumFractionDigits: 2});
    // Math.round(+(data?.bpi?.USD?.rate) * 100) / 100;

    return `$${Math.round(price)}`;
  }
}

function App() {
  const [data, setData] = useState({});
  const [timeSliceID, setTimeSliceID] = useState(0);


  // https://api.coinbase.com/v2/prices/spot?currency=USD

  useEffect(() => {
    // console.log("Fetching");
    // fetch("https://api.coindesk.com/v1/bpi/currentprice.json")
    fetch(dataIO.url)
      .then(res => res.json())
      .then(
        setData
        // console.log("NUM", dataFetched?.bpi?.USD?.rate);
        // const ratio = dataFetched?.bpi?.USD?.rate && parseFloat(dataFetched?.bpi?.USD?.rate.replace(",", ""))
        // setBitcoinToUSDRatio(ratio);
      )
      .catch(console.error);
  }, [timeSliceID]);

  useEffect(() => {
    setInterval(() => {
      // console.log("INTERVAL", timeSliceID, foo);
      setTimeSliceID(timeSliceID => timeSliceID + 1);
    }, 15 * 1000);
  }, []);

  const priceOfBitcoin = () => {

    return dataIO.getPriceFromData(data);

    // return data?.data?.amount;

    // if (!data?.bpi) return "";

    // // console.log("PRICE", data?.bpi?.USD?.rate);
    // const priceString = data?.bpi?.USD?.rate;
    // const price = +(priceString !== undefined ? priceString.replace(",", "") : null);
    // // const priceRounded = Math.round(+price * 100) / 100;

    // // return priceRounded.toLocaleString(undefined, {minimumFractionDigits: 2});
    // // Math.round(+(data?.bpi?.USD?.rate) * 100) / 100;

    // return `$${Math.round(price)}`;
  }


  // const isNumeric = a => {
  //   return (a !== "" && !isNaN(a));
  // };

  return (
    <div className="App">

      { priceOfBitcoin()}
      {/* <pre className="data">
        {{JSON.stringify(data, null, 4)}}
        {source}
      </pre> */}
    </div>
  );
}

export default App;
