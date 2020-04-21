import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
/**
 * useEffect will be called whenever count state changes
 * the second parameter in hooks functions works in the same way
 * and compares values with previous ones to be run.
 */
function App() {
  const [data, setData] = useState();
  const [loaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!loaded) {
      const startDate = "2020.04.15";
      const previousDate = new Date(startDate).getTime() / 1000;
      const currentDate = (new Date().getTime() / 1000).toFixed(0);
      const stockSymbols = ["TSLA", "MSFT", "XPO"].join(",");
      const proxyUrl = "https://cors-anywhere.herokuapp.com/";
      // const targetUrl = `https://query1.finance.yahoo.com/v8/finance/chart/TSLA?period1=${previousDate}&period2=${currentDate}&interval=1d`;
      const targetUrl = `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${stockSymbols}`;
      fetch(proxyUrl + targetUrl)
        .then(blob => blob.json())
        .then(data => {
          console.table(data);
          // document.querySelector("pre").innerHTML = JSON.stringify(
          //   data,
          //   null,
          //   2
          // );
          setIsLoaded(true);
          setData(data);
          return data;
        })
        .catch(e => {
          console.log(e);
          return e;
        });
    }
  }, [loaded]);

  return (
    <>
      <p>Hello</p>
      <div>Quantity: 2</div>
      <div>
        Tesla Price:{" "}
        {data?.quoteResponse?.result[0].regularMarketPrice.toFixed(2)}
      </div>
      <button
        onClick={() => {
          setIsLoaded(false);
          setData(null);
        }}
      >
        Refresh
      </button>
      {/* <pre /> */}
    </>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
