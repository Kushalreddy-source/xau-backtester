console.log("XAUUSD Backtester Loaded");

// ====== STATE ======
let balance = 1000;
let trades = [];
let position = null;

// Dummy price (replace with real chart feed later)
let price = 2000;

// ====== ELEMENTS ======
const balanceEl = document.getElementById("balance");
const logEl = document.getElementById("tradeLog");

// ====== INIT ======
function init() {
    console.log("Backtester engine starting...");
    updateUI();
}

init();

// ====== TRADE FUNCTIONS ======
function openTrade(type, lot, sl, tp) {
    if (position) {
        console.log("Already in trade!");
        return;
    }

    position = {
        type,
        entry: price,
        lot,
        sl,
        tp
    };

    console.log("Trade opened:", position);
}

function closeTrade(reason) {
    if (!position) return;

    let pnl = 0;

    if (position.type === "buy") {
        pnl = (price - position.entry) * position.lot;
    } else {
        pnl = (position.entry - price) * position.lot;
    }

    balance += pnl;

    trades.push({
        ...position,
        exit: price,
        pnl,
        reason
    });

    console.log("Trade closed:", pnl, reason);

    position = null;
    updateUI();
}

// ====== PRICE SIMULATION ======
function tick(newPrice) {
    price = newPrice;

    if (!position) return;

    // SL / TP check
    if (position.type === "buy") {
        if (price <= position.sl) closeTrade("SL HIT");
        if (price >= position.tp) closeTrade("TP HIT");
    }

    if (position.type === "sell") {
        if (price >= position.sl) closeTrade("SL HIT");
        if (price <= position.tp) closeTrade("TP HIT");
    }

    updateUI();
}

// ====== UI ======
function updateUI() {
    if (balanceEl) balanceEl.innerText = balance.toFixed(2);

    if (logEl) {
        logEl.innerHTML = trades
            .slice(-10)
            .reverse()
            .map(t =>
                `<div>
                    ${t.type.toUpperCase()} | Entry: ${t.entry} | Exit: ${t.exit} | PnL: ${t.pnl.toFixed(2)}
                </div>`
            )
            .join("");
    }
}

// ====== BUTTON TESTS ======
// Call from HTML buttons
window.buy = function () {
    openTrade("buy", 1, price - 5, price + 10);
};

window.sell = function () {
    openTrade("sell", 1, price + 5, price - 10);
};

window.nextPrice = function (p) {
    tick(p);
};