const chart = document.getElementById("chart");

let currentCandle = 1;
let replayTimer;

function drawChart() {

  chart.innerHTML = "";

  for(let i = 0; i < currentCandle; i++) {

    const candle = document.createElement("div");

    candle.style.display = "inline-block";
    candle.style.width = "20px";
    candle.style.height = "80px";
    candle.style.background = "limegreen";
    candle.style.margin = "5px";

    chart.appendChild(candle);
  }

  document.getElementById("candleNumber").textContent =
    currentCandle;
}

document.getElementById("nextBtn").onclick = function() {

  currentCandle++;

  drawChart();
};

document.getElementById("prevBtn").onclick = function() {

  if(currentCandle > 1){
    currentCandle--;
  }

  drawChart();
};

document.getElementById("playBtn").onclick = function() {

  clearInterval(replayTimer);

  replayTimer = setInterval(function(){

    currentCandle++;

    drawChart();

    if(currentCandle >= 20){
      clearInterval(replayTimer);
    }

  },1000);

};

document.getElementById("pauseBtn").onclick = function() {

  clearInterval(replayTimer);

};

drawChart();