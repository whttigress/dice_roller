var display = (function () {
    var display = {};
    display.die = function (value) {
        var node = document.createElement("span");
        node.classList.add("die");
        var pipDie = pip.createPipEle(value - 1);
        node.appendChild(pipDie);
        //diceDiv.appendChild(node);
        //if (sides > 9) {
        //var numDiv = document.createElement("span");
        //numDiv.classList.add("number");
        //var number = document.createTextNode(value);
        //numDiv.appendChild(number);
        //node.appendChild(numDiv);
        //}
        return node; 
    }
    display.createHeader = function (rolls) {
        var hrow = document.createElement("tr");
        var delCol = document.createElement("th");
        var delColTxt = document.createTextNode("Remove All");
        delCol.addEventListener("click", function (e) {
            removeChildNodes(diceDiv);
            removeChildNodes(totalDiv);
            removeChildNodes(grandTotalDiv);
            removeChildNodes(statsDiv);
            for (var i = 0, count = rolls.length; i < count; i++) {
                var id = rolls[i].timestamp;
                diceDB.deleteDice(id, roll.refresh);
            }
        })
        delCol.appendChild(delColTxt);
        var totalCol = document.createElement("th");
        var totalColTxt = document.createTextNode("Roll Total");
        totalCol.appendChild(totalColTxt);
        hrow.appendChild(delCol);
        hrow.appendChild(totalCol);
        return hrow;
    };
    display.createRow = function (currentRoll) {
        var row = document.createElement("tr");
        row.id = "roll-" + currentRoll.timestamp;
        this.roll = currentRoll
        var r = currentRoll.roll;
        dice.count += r.length;
        row.appendChild(this.createDeleteEntry());
        row.appendChild(this.createTotalEntry());
        for (var j = 0, jc = r.length; j < jc; j++) {
            if (!dice.sideCount[r[j] - 1]) {
                dice.sideCount[r[j] - 1] = 1;
            } else {
                dice.sideCount[r[j] - 1]++;
            }
            this.selection = j;
            row.appendChild(this.createEntry());
        }
        return row;
    };
    display.createEntry = function() {
        var col = document.createElement("td");
        col.setAttribute("data-id", this.roll.timestamp)
        col.addEventListener("click", function (e) {
            removeChildNodes(diceDiv);
            removeChildNodes(totalDiv);
            var id = parseInt(e.target.getAttribute("data-id"));
            diceDB.fetchRoll(id, roll.display)
        })
        var txt = document.createTextNode(this.roll.roll[this.selection]);
        col.appendChild(txt);
        return col;
    };
    display.createTotalEntry = function () {
        var total = this.roll.total;
        var totalColumn = document.createElement("td");
        totalColumn.setAttribute("data-id", this.roll.timestamp)
        totalColumn.addEventListener("click", function (e) {
            removeChildNodes(diceDiv);
            removeChildNodes(totalDiv);
            var id = parseInt(e.target.getAttribute("data-id"));
            diceDB.fetchRoll(id, roll.display)
        })
        var totalText = document.createTextNode(total);
        totalColumn.appendChild(totalText);
        return totalColumn;
    };
    display.createDeleteEntry = function () {

        var del = document.createElement("td");
        var delText = document.createTextNode("Remove");
        del.setAttribute("data-id", this.roll.timestamp);
        del.addEventListener("click", function (e) {
            removeChildNodes(statsDiv);
            var id = parseInt(e.target.getAttribute("data-id"));
            diceDB.deleteDice(id, roll.refresh);
            removeChildNodes(diceDiv);
            removeChildNodes(totalDiv);
        })
        del.appendChild(delText);
        return del;
    };
    display.stats = function () {
        var stats = document.createElement("span");
        for (var i = 0; i < dice.sides; i++) {
            if (!isNaN(dice.sideCount[i])) {
                var percentage = Math.round((dice.sideCount[i] / dice.count) * 100);
            } else {percentage = 0}
            stats.appendChild(display.die(i + 1));
            stats.appendChild(document.createTextNode(percentage + "%"));
        }
        return stats;
    };


    return display;
}());