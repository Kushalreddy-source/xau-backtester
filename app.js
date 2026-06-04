const chart = document.getElementById("chart");

const candles = [
  { open: 100, high: 130, low: 90, close: 120 },
  { open: 120, high: 140, low: 110, close: 100 },
  { open: 100, high: 150, low: 95, close: 140 },
  { open: 140, high: 145, low: 105, close: 110 },
  { open: 110, high: 180, low: 100, close: 170 }
];

let currentCandle = 1;

function drawChart() {

  chart.innerHTML = "";

  const wrapper = document.createElement("div");

  wrapper.style.display = "flex";
  wrapper.style.alignItems = "flex-end";
  wrapper.style.height = "100%";
  wrapper.style.gap = "20px";
  wrapper.style.padding = "20px";

  for (let i = 0; i < currentCandle; i++) {

    const c = candles[i];

    const candle = document.createElement("div");
    candle.style.width = "30px";
    candle.style.height = Math.abs(c.close - c.open) + "px";
    candle.style.background =
      c.close > c.open ? "limegreen" : "red";

    wrapper.appendChild(candle);
  }

  chart.appendChild(wrapper);

  document.getElementById(
    "candleNumber"
  ).textContent = currentCandle;
}

document
.getElementById("nextBtn")
.addEventListener("click", () => {

  if (currentCandle < candles.length) {
    currentCandle++;
    drawChart();
  }

});

document
.getElementById("prevBtn")
.addEventListener("click", () => {

  if (currentCandle > 1) {
    currentCandle--;
    drawChart();
  }

});

drawChart();