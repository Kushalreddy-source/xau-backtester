const chart = document.getElementById("chart");

const candles = [
  { open: 50, high: 90, low: 30, close: 80 },
  { open: 80, high: 100, low: 40, close: 50 },
  { open: 50, high: 120, low: 45, close: 100 },
  { open: 100, high: 110, low: 60, close: 70 },
  { open: 70, high: 140, low: 50, close: 130 }
];

let currentCandle = 1;

function drawChart() {

  chart.innerHTML = "";

  const wrapper = document.createElement("div");
  wrapper.style.display = "flex";
  wrapper.style.alignItems = "flex-end";
  wrapper.style.height = "100%";
  wrapper.style.padding = "20px";
  wrapper.style.gap = "20px";

  for(let i = 0; i < currentCandle; i++) {

    const c = candles[i];

    const container = document.createElement("div");
    container.style.position = "relative";
    container.style.width = "30px";
    container.style.height = "180px";

    const wick = document.createElement("div");
    wick.style.position = "absolute";
    wick.style.left = "13px";
    wick.style.bottom = "20px";
    wick.style.width = "4px";
    wick.style.height = "120px";
    wick.style.background = "white";

    const body = document.createElement("div");
    body.style.position = "absolute";
    body.style.left = "3px";
    body.style.width = "24px";
    body.style.height = "50px";
    body.style.bottom = "55px";

    body.style.background =
      c.close > c.open
      ? "limegreen"
      : "red";

    container.appendChild(wick);
    container.appendChild(body);

    wrapper.appendChild(container);
  }

  chart.appendChild(wrapper);

  document.getElementById("candleNumber").textContent =
    currentCandle;
}

document.getElementById("nextBtn")
.addEventListener("click", () => {

  if(currentCandle < candles.length){
    currentCandle++;
    drawChart();
  }

});

document.getElementById("prevBtn")
.addEventListener("click", () => {

  if(currentCandle > 1){
    currentCandle--;
    drawChart();
  }

});

drawChart();