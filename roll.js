var roll = (function () {
    var roll = {};
    var historyDiv = document.getElementById("history");
    var errorDiv = document.getElementById("error");


    roll.newRoll = function (sides) {
        dice.sides = sides;
        for (i = 0; i < dice.sides; i++) {
            if (!isNaN(dice.sideCount[i])) {
                dice.sideCount[i] = 0;
            }
        }
        dice.sideCount = [];
        var diceNum = document.getElementsByName("diceNum")[0].value;
        removeChildNodes(errorDiv);
        removeChildNodes(diceDiv);
        removeChildNodes(totalDiv);
        var valid = !isNaN(diceNum) && diceNum > 0 && Math.ceil(diceNum) == diceNum && diceNum.indexOf('.') == -1;
        if (!valid) {
            errorDiv.appendChild(document.createTextNode("Please enter a valid number!"));
        }
        var total = 0;
        var currentRoll = [];
        if (valid) {
            hideBtn.style.display = "inline-block";
            for (var i = 0; i < diceNum; i++) {
                var value = dice.getDie(sides);
                total += value;
                diceDiv.appendChild(display.die(value));

                currentRoll.push(value);
            }
            totalDiv.appendChild(document.createTextNode("You rolled " + total));
            diceDB.saveDice(currentRoll, total, function (dice) {
                roll.refresh();
            })
        }
    };

    roll.display = function (selectedRoll) {
        hideBtn.style.display = "inline-block";
        var r = selectedRoll.roll;
        for (i = 0, c = r.length; i < c; i++) {
            diceDiv.appendChild(display.die(r[i]));
        }
    };
    roll.refresh = function () {
        removeChildNodes(historyDiv);
        dice.count = 0;
        dice.sideCount = [];
        diceDB.fetchDice(function (rolls) {
            var gTotal = 0;
            if (rolls.length > 0) { 
                historyDiv.appendChild(display.createHeader(rolls));
            }
                historyDiv.style.display = "block";
            for (var i = 0, count = rolls.length; i < count; i++) {
                historyDiv.appendChild(display.createRow(rolls[i]));
                gTotal += rolls[i].total;
                }
            removeChildNodes(statsDiv);
            if (rolls.length > 0) {
                statsDiv.appendChild(display.stats());
            }
            removeChildNodes(grandTotalDiv);
            if (gTotal > 0) {
                var gt = document.createTextNode("With a grand total of: " + gTotal);
                grandTotalDiv.appendChild(gt);
            }
        });
    };

    return roll;
}())