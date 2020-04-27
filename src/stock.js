export const stockDataMap = {
  TSLA: { symbol: "TSLA", shares: 2, purchasedPrice: 390 },
  PLUG: { symbol: "PLUG", shares: 15, purchasedPrice: 2.94 },
  GE: { symbol: "GE", shares: 2, purchasedPrice: 7.36 },
  XPO: { symbol: "XPO", shares: 2, purchasedPrice: 53.26 },
  MSFT: { symbol: "MSFT", shares: 3, purchasedPrice: 142.33 },
  DOW: { symbol: "DOW", shares: 10, purchasedPrice: 23.97 },
  UAL: { symbol: "UAL", shares: 5, purchasedPrice: 31.66 },
  DAL: { symbol: "DAL", shares: 10, purchasedPrice: 24.43 },
  BABA: { symbol: "BABA", shares: 2, purchasedPrice: 206.81 },
  CPRX: { symbol: "CPRX", shares: 10, purchasedPrice: 4.38 },
  CRBP: { symbol: "CRBP", shares: 7, purchasedPrice: 5.98 },
  INO: { symbol: "INO", shares: 10, purchasedPrice: 6.9 },
  DVAX: { symbol: "DVAX", shares: 10, purchasedPrice: 3.58 },
  VIR: { symbol: "VIR", shares: 1, purchasedPrice: 31.38 },
  KOS: { symbol: "KOS", shares: 3, purchasedPrice: 0.87 }
};

export const stockDataSymbolsList = Object.keys(stockDataMap)
  .map(stock => stock)
  .join(",");

export const stockList = Object.keys(stockDataMap).map(
  stock => stockDataMap[stock]
);
