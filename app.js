const chartContainer = document.getElementById("chart");

const chart = LightweightCharts.createChart(
  chartContainer,
  {
    layout: {
      background: {
        color: "#0d1117"
      },
      textColor: "#d1d4dc"
    },

    grid: {
      vertLines: {
        color: "#1f2937"
      },
      horzLines: {
        color: "#1f2937"
      }
    },

    rightPriceScale: {
      borderColor: "#374151"
    },

    timeScale: {
      borderColor: "#374151"
    },

    width: chartContainer.clientWidth,
    height: chartContainer.clientHeight
  }
);

window.addEventListener("resize", () => {

  chart.applyOptions({
    width: chartContainer.clientWidth,
    height: chartContainer.clientHeight
  });

});

const candleSeries =
  chart.addCandlestickSeries();

const candles = [];

let price = 3300;

for(let i = 0; i < 500; i++){

  const open = price;

  const high =
    open +
    Math.random() * 15;

  const low =
    open -
    Math.random() * 15;

  const close =
    low +
    Math.random() *
    (high - low);

  candles.push({

    time:
      1710000000 +
      i * 60,

    open:
      Number(open.toFixed(2)),

    high:
      Number(high.toFixed(2)),

    low:
      Number(low.toFixed(2)),

    close:
      Number(close.toFixed(2))
  });

  price = close;
}

let currentIndex = 30;

candleSeries.setData(
  candles.slice(
    0,
    currentIndex
  )
);

let replayTimer = null;

let replaySpeed = 1000;

let tradeMode = null;

let trades = [];

let wins = 0;

let losses = 0;

function updateStats(){

  document.getElementById(
    "totalTrades"
  ).textContent =
    trades.length;

  document.getElementById(
    "wins"
  ).textContent =
    wins;

  document.getElementById(
    "losses"
  ).textContent =
    losses;

  let winRate = 0;

  if(trades.length > 0){

    winRate =
      (
        wins /
        trades.length
      ) * 100;
  }

  document.getElementById(
    "winRate"
  ).textContent =
    winRate.toFixed(1) + "%";

  document.getElementById(
    "candleNumber"
  ).textContent =
    currentIndex;
}

function redrawChart(){

  candleSeries.setData(
    candles.slice(
      0,
      currentIndex
    )
  );

  updateStats();
}

function playReplay(){

  clearInterval(
    replayTimer
  );

  replayTimer =
    setInterval(()=>{

      if(
        currentIndex <
        candles.length
      ){

        currentIndex++;

        redrawChart();

      }else{

        clearInterval(
          replayTimer
        );
      }

    }, replaySpeed);
}

function stopReplay(){

  clearInterval(
    replayTimer
  );
}

document.getElementById(
  "playBtn"
).onclick =
  playReplay;

document.getElementById(
  "pauseBtn"
).onclick =
  stopReplay;

document.getElementById(
  "speed1Btn"
).onclick =
  () => replaySpeed = 1000;

document.getElementById(
  "speed2Btn"
).onclick =
  () => replaySpeed = 500;

document.getElementById(
  "speed5Btn"
).onclick =
  () => replaySpeed = 200;

document.getElementById(
  "speed10Btn"
).onclick =
  () => replaySpeed = 100;

document.getElementById(
  "speed15Btn"
).onclick =
  () => replaySpeed = 60;

document.getElementById(
  "longBtn"
).onclick =
  () => {

    tradeMode = "LONG";

    document.getElementById(
      "statusText"
    ).textContent =
      "Select candle for LONG";
  };

document.getElementById(
  "shortBtn"
).onclick =
  () => {

    tradeMode = "SHORT";

    document.getElementById(
      "statusText"
    ).textContent =
      "Select candle for SHORT";
  };

chart.subscribeClick(
  function(param){

    if(
      !param.time
    ) return;

    if(
      !tradeMode
    ) return;

    const sl =
      prompt(
        "Enter Stop Loss"
      );

    if(sl === null)
      return;

    const tp =
      prompt(
        "Enter Take Profit"
      );

    if(tp === null)
      return;

    const trade = {

      type:
        tradeMode,

      candle:
        currentIndex,

      sl:
        sl,

      tp:
        tp,

      result:
        "OPEN"
    };

    trades.push(
      trade
    );

    addTradeToLog(
      trade
    );

    tradeMode = null;

    document.getElementById(
      "statusText"
    ).textContent =
      "Trade Saved";

    updateStats();
  }
);

function addTradeToLog(
  trade
){

  const log =
    document.getElementById(
      "tradeLog"
    );

  const row =
    document.createElement(
      "div"
    );

  row.className =
    "tradeRow open";

  row.innerHTML =
    `
    <b>${trade.type}</b>
    | Candle ${trade.candle}
    | SL ${trade.sl}
    | TP ${trade.tp}
    <br><br>
    <button class="winBtn">
    WIN
    </button>

    <button class="lossBtn">
    LOSS
    </button>
    `;

  const winBtn =
    row.querySelector(
      ".winBtn"
    );

  const lossBtn =
    row.querySelector(
      ".lossBtn"
    );

  winBtn.onclick =
    () => {

      wins++;

      trade.result =
        "WIN";

      row.className =
        "tradeRow win";

      updateStats();
    };

  lossBtn.onclick =
    () => {

      losses++;

      trade.result =
        "LOSS";

      row.className =
        "tradeRow loss";

      updateStats();
    };

  log.appendChild(
    row
  );
}

updateStats();