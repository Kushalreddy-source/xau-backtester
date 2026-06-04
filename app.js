const chart = document.getElementById("chart");

const candles = [
  { open: 100, high: 130, low: 90, close: 120 },
  { open: 120, high: 140, low: 110, close: 100 },
  { open: 100, high: 150, low: 95, close: 140 },
  { open: 140, high: 145, low: 105, close: 110 },
  { open: 110, high: 180, low: 100, close: 170 },
  { open: 170, high: 190, low: 150, close: 160 },
  { open: 160, high: 210, low: 155, close: 200 }
];

let currentCandle = 1;

function drawChart() {

  chart.innerHTML = "";

  const wrapper = document.createElement("div");

  wrapper.style.display = "flex";
  wrapper.style.alignItems = "flex-end";
  wrapper.style.height = "100%";
  wrapper.style.gap = "15px";
  wrapper.style.padding = "20px";

  for (let i = 0; i < currentCandle; i++) {

    const c = candles[i];

    const candleContainer =
      document.createElement("div");

    candleContainer.style.position = "relative";
    candleContainer.style.width = "30px";
    candleContainer.style.height = "220px";

    const wick =
      document.createElement("div");

    wick.style.position = "absolute";
    wick.style.left = "13px";
    wick.style.bottom = c.low + "px";
    wick.style.width = "4px";
    wick.style.height =
      (c.high - c.low) + "px";
    wick.style.background = "white";

    const body =
      document.createElement("div");

    body.style.position = "absolute";
    body.style.left = "3px";

    body.style.bottom =
      Math.min(c.open, c.close) + "px";

    body.style.width = "24px";

    body.style.height =
      Math.abs(c.close - c.open) + "px";

    body.style.background =
      c.close > c.open
        ? "limegreen"
        : "red";

    candleContainer.appendChild(wick);
    candleContainer.appendChild(body);

    wrapper.appendChild(candleContainer);
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