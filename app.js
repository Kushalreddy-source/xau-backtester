const chart = document.getElementById("chart");

let currentCandle = 1;
let replayTimer = null;
let replaySpeed = 1000;

function drawChart() {

  chart.innerHTML = "";

  const wrapper = document.createElement("div");

  wrapper.style.display = "flex";
  wrapper.style.alignItems = "flex-end";
  wrapper.style.height = "100%";
  wrapper.style.padding = "20px";
  wrapper.style.gap = "10px";
  wrapper.style.overflowX = "auto";

  for(let i = 0; i < currentCandle; i++) {

    const candleContainer =
      document.createElement("div");

    candleContainer.style.position =
      "relative";

    candleContainer.style.width =
      "24px";

    candleContainer.style.height =
      "180px";

    const wick =
      document.createElement("div");

    wick.style.position = "absolute";
    wick.style.left = "10px";
    wick.style.bottom = "20px";
    wick.style.width = "3px";
    wick.style.height = "120px";
    wick.style.background = "white";

    const body =
      document.createElement("div");

    body.style.position = "absolute";
    body.style.left = "2px";
    body.style.bottom = "55px";
    body.style.width = "20px";
    body.style.height =
      (40 + (i % 5) * 10) + "px";

    body.style.background =
      i % 2 === 0
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

function startReplay() {

  clearInterval(replayTimer);

  replayTimer = setInterval(() => {

    currentCandle++;

    drawChart();

    if(currentCandle >= 50) {
      clearInterval(replayTimer);
    }

  }, replaySpeed);
}

document.getElementById(
  "playBtn"
).onclick = () => {
  startReplay();
};

document.getElementById(
  "pauseBtn"
).onclick = () => {
  clearInterval(replayTimer);
};

document.getElementById(
  "nextBtn"
).onclick = () => {

  currentCandle++;

  drawChart();
};

document.getElementById(
  "prevBtn"
).onclick = () => {

  if(currentCandle > 1){
    currentCandle--;
  }

  drawChart();
};

document.getElementById(
  "speed1Btn"
).onclick = () => {

  replaySpeed = 1000;

};

document.getElementById(
  "speed2Btn"
).onclick = () => {

  replaySpeed = 500;

};

document.getElementById(
  "speed5Btn"
).onclick = () => {

  replaySpeed = 200;

};

drawChart();