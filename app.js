const chart = document.getElementById("chart");

const candles = [
  {open:100, high:130, low:90, close:120},
  {open:120, high:140, low:100, close:110},
  {open:110, high:160, low:105, close:150},
  {open:150, high:170, low:130, close:140},
  {open:140, high:190, low:135, close:180},
  {open:180, high:210, low:170, close:200},
  {open:200, high:220, low:180, close:190},
  {open:190, high:240, low:185, close:230}
];

let currentCandle = 1;
let replayTimer = null;
let replaySpeed = 1000;

let tradeMode = null;

const trades = [];

function updateStats() {

  const totalTradesElement =
    document.getElementById("totalTrades");

  if(totalTradesElement){
    totalTradesElement.textContent =
      trades.length;
  }

  let tradeLog =
    document.getElementById("tradeLog");

  if(!tradeLog){

    tradeLog =
      document.createElement("div");

    tradeLog.id = "tradeLog";

    tradeLog.style.marginTop = "20px";
    tradeLog.style.padding = "10px";
    tradeLog.style.border =
      "1px solid #555";

    document
      .querySelector(".container")
      .appendChild(tradeLog);
  }

  tradeLog.innerHTML =
    "<h2>Trade Log</h2>";

  trades.forEach((trade,index)=>{

    const row =
      document.createElement("p");

    row.textContent =
      (index + 1) +
      ". " +
      trade.type.toUpperCase() +
      " | Candle " +
      trade.candle +
      " | SL " +
      trade.sl +
      " | TP " +
      trade.tp;

    tradeLog.appendChild(row);
  });

}

function saveTrade(type,candleIndex){

  const sl =
    prompt("Enter Stop Loss");

  if(sl === null) return;

  const tp =
    prompt("Enter Take Profit");

  if(tp === null) return;

  trades.push({
    type:type,
    candle:candleIndex + 1,
    sl:sl,
    tp:tp
  });

  updateStats();

  alert("Trade Saved");
}

function drawChart(){

  chart.innerHTML = "";

  const wrapper =
    document.createElement("div");

  wrapper.style.display = "flex";
  wrapper.style.alignItems = "flex-end";
  wrapper.style.height = "100%";
  wrapper.style.padding = "20px";
  wrapper.style.gap = "12px";
  wrapper.style.overflowX = "auto";

  for(let i=0;i<currentCandle;i++){

    const c = candles[i];

    const candle =
      document.createElement("div");

    candle.style.position =
      "relative";

    candle.style.width =
      "24px";

    candle.style.height =
      "180px";

    candle.style.cursor =
      "pointer";

    const wick =
      document.createElement("div");

    wick.style.position =
      "absolute";

    wick.style.left = "10px";
    wick.style.bottom = "20px";
    wick.style.width = "3px";
    wick.style.height = "120px";
    wick.style.background =
      "white";

    const body =
      document.createElement("div");

    body.style.position =
      "absolute";

    body.style.left = "2px";
    body.style.bottom = "55px";
    body.style.width = "20px";
    body.style.height = "50px";

    body.style.background =
      c.close > c.open
      ? "limegreen"
      : "red";

    candle.appendChild(wick);
    candle.appendChild(body);

    candle.onclick = function(){

      if(tradeMode === "long"){

        saveTrade(
          "long",
          i
        );

        tradeMode = null;
      }

      if(tradeMode === "short"){

        saveTrade(
          "short",
          i
        );

        tradeMode = null;
      }

    };

    wrapper.appendChild(candle);
  }

  chart.appendChild(wrapper);

  document.getElementById(
    "candleNumber"
  ).textContent =
    currentCandle;
}

function startReplay(){

  clearInterval(
    replayTimer
  );

  replayTimer =
    setInterval(()=>{

      currentCandle++;

      drawChart();

      if(
        currentCandle >=
        candles.length
      ){

        clearInterval(
          replayTimer
        );
      }

    },replaySpeed);
}

document.getElementById(
  "playBtn"
).onclick = startReplay;

document.getElementById(
  "pauseBtn"
).onclick = function(){

  clearInterval(
    replayTimer
  );

};

document.getElementById(
  "nextBtn"
).onclick = function(){

  if(
    currentCandle <
    candles.length
  ){

    currentCandle++;

    drawChart();
  }

};

document.getElementById(
  "prevBtn"
).onclick = function(){

  if(
    currentCandle > 1
  ){

    currentCandle--;

    drawChart();
  }

};

document.getElementById(
  "speed1Btn"
).onclick = function(){

  replaySpeed = 1000;

};

document.getElementById(
  "speed2Btn"
).onclick = function(){

  replaySpeed = 500;

};

document.getElementById(
  "speed5Btn"
).onclick = function(){

  replaySpeed = 200;

};

document.getElementById(
  "longBtn"
).onclick = function(){

  tradeMode = "long";

  alert(
    "Tap a candle to place LONG"
  );

};

document.getElementById(
  "shortBtn"
).onclick = function(){

  tradeMode = "short";

  alert(
    "Tap a candle to place SHORT"
  );

};

drawChart();
updateStats();