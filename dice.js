var hideBtn = document.getElementById("hideDice");
var diceDiv = document.getElementById('dice');
var totalDiv = document.getElementById("total");
var grandTotalDiv = document.getElementById("grandTotal");
var statsDiv = document.getElementById("stats");

window.onload = function () {
    diceDB.open(roll.refresh);
};

function removeChildNodes(node) {
    while (node.hasChildNodes()) {
        node.removeChild(node.lastChild);
    }
}

var dice = (function () {
    var dice = {};
    dice.hide = function () {
        hideBtn.innerHTML = (diceDiv.style.display == "none") ? "Hide Dice" : "Show Dice";
        diceDiv.style.display = (diceDiv.style.display == "none") ? "inline" : "none";
    };
    dice.getDie = function (sides) {
            return Math.ceil(Math.random() * sides);
    };
    dice.count = 0;
    dice.sideCount = [];
    dice.sides = 6;
    return dice;

}())