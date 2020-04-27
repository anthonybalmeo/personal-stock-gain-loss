import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { stockDataMap, stockDataSymbolsList, stockList } from "./stock";

function App() {
  const [data, setData] = useState();
  const [loaded, setIsLoaded] = useState(false);
  // const [stockTotal, setStockTotal] = useState(0);
  let investedTotal = 0;
  stockList.forEach(({ purchasedPrice, shares }) => {
    investedTotal += purchasedPrice * shares;
  });

  /******************************************************
     *EDIT STOCKS HERE
     EX: TSLA is Tesla
     TSLA: { symbol: "TSLA", shares: 2, purchasedPrice: 390 },

  ******************************************************/

  useEffect(() => {
    if (!loaded) {
      // const startDate = "2020.04.15";
      // const previousDate = new Date(startDate).getTime() / 1000;
      // const currentDate = (new Date().getTime() / 1000).toFixed(0);

      const proxyUrl = "https://cors-anywhere.herokuapp.com/";
      // const targetUrl = `https://query1.finance.yahoo.com/v8/finance/chart/TSLA?period1=${previousDate}&period2=${currentDate}&interval=1d`;
      const targetUrl = `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${stockDataSymbolsList}`;
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

  const stockArray = data?.quoteResponse?.result ?? undefined;

  const gainLossStyle = value => {
    if (Math.sign(value) === 1)
      return {
        color: "green"
      };
    if (Math.sign(value) === -1)
      return {
        color: "red"
      };
    return {
      color: "black"
    };
  };

  return (
    <>
      <div>
        <table>
          <tbody>
            <tr>
              <td>
                <b>Symbol</b>
              </td>
              <td>
                <b>Current Price</b>
              </td>
              <td>
                <b>Purchased Price</b>
              </td>
              <td>
                <b>Quantity</b>
              </td>
              <td>
                <b>Gain/Loss</b>
              </td>
            </tr>
            {stockArray &&
              stockArray.map(stock => {
                const symbol = stock.symbol;
                const shares = stockDataMap[symbol].shares;
                const purchasedPrice = stockDataMap[symbol].purchasedPrice;
                const currentPrice = stock.regularMarketPrice;

                const gainLossValue = (
                  currentPrice * shares -
                  purchasedPrice * shares
                ).toFixed(2);

                return (
                  <tr>
                    <td>{symbol}</td>
                    <td>${currentPrice.toFixed(2)}</td>
                    <td>${purchasedPrice.toFixed(2)}</td>
                    <td>{shares}</td>
                    <td>
                      <span style={gainLossStyle(gainLossValue)}>
                        {gainLossValue}
                      </span>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      <p>Investment Total: {investedTotal.toFixed(2)}</p>
      {/* <p>Personal Gain {investedTotal.toFixed(2)}</p> */}
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
