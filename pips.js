// · • ● is a pip and \xa0 is a &nbsp; • · ●
var pip = (function () {
    var p = {};
    var pip = "●"
    var s = "\xa0"
    var pipLayout = [
    [s + s + s, s + pip + s, s + s + s],
    [s + s + pip, s + s + s, pip + s + s],
    [s + s + pip, s + pip + s, pip + s + s],
    [pip + s + pip, s + s + s, pip + s + pip],
    [pip + s + pip, s + pip + s, pip + s + pip],
    [pip + s + pip, pip + s + pip, pip + s + pip]];

    p.createPipEle = function (num) {
        var diePipEle = document.createElement("span")
        var diePipsTop = document.createElement("div")
        var diePipsTopText = document.createTextNode(pipLayout[num][0])
        var diePipsMid = document.createElement("div")
        var diePipsMidText = document.createTextNode(pipLayout[num][1])
        var diePipsBot = document.createElement("div")
        var diePipsBotText = document.createTextNode(pipLayout[num][2])
        diePipsTop.appendChild(diePipsTopText);
        diePipsMid.appendChild(diePipsMidText);
        diePipsBot.appendChild(diePipsBotText);
        diePipEle.appendChild(diePipsTop);
        diePipEle.appendChild(diePipsMid);
        diePipEle.appendChild(diePipsBot);
        return diePipEle;
    };
    return p;
}())