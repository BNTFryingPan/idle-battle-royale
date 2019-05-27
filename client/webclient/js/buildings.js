var player = {
    name: "Player",
    intname: "Player",
    basepersec: 1,
    persec: 1,
    basecost: 15,
    amount: 0
}

var gamer = {
    name: "Gamer",
    intname: "Gamer",
    basepersec: 3,
    persec: 3,
    basecost: 50,
    amount: 0
}

var nolife = {
    name: "No Lifer",
    intname: "NoLife",
    basepersec: 10,
    persec: 10,
    basecost: 150,
    amount: 0
}

var epicgamer = {
    name: "Epic Gamer",
    intname: "EpicGamer",
    basepersec: 25,
    persec: 25,
    basecost: 325,
    amount: 0
}

var buildings = {
    Player: player,
    Gamer: gamer,
    NoLife: nolife,
    EpicGamer: epicgamer
}

var priceMultiplier = 1.125

function loadBuildings() {
    var buildingContainer = document.getElementById("buildings");

    for (var build in buildings) {
        tb = buildings[build];
        element = document.createElement("div");
        element.setAttribute("id", "building-" + tb.intname);
        element.setAttribute("class", "building");
        element.hidden = true;
        elementBuy1 = document.createElement("button");
        elementBuy1.setAttribute("id", "building-" + tb.intname + "-buy");
        elementBuy1.setAttribute("onclick", "buyBuilding('" + tb.intname + "', 1)");
        elementBuy1.innerHTML = "Buy 1 " + tb.name;
        elementBuy10 = document.createElement("button");
        elementBuy10.setAttribute("id", "building-" + tb.intname + "-buy");
        elementBuy10.setAttribute("style", "margin-left: 3px")
        elementBuy10.setAttribute("onclick", "buyBuilding('" + tb.intname + "', 10)");
        elementBuy10.innerHTML = "x10";
        elementBuy100 = document.createElement("button");
        elementBuy100.setAttribute("id", "building-" + tb.intname + "-buy");
        elementBuy100.setAttribute("style", "margin-left: 3px")
        elementBuy100.setAttribute("onclick", "buyBuilding('" + tb.intname + "', 100)");
        elementBuy100.innerHTML = "x100";
        elementCost = document.createElement("div");
        elementCost.setAttribute("id", "building-" + tb.intname + "-cost");
        elementCost.innerHTML = "Cost: " + tb.basecost;
        elementAmnt = document.createElement("div");
        elementAmnt.setAttribute("id", "building-" + tb.intname + "-amount");
        elementAmnt.innerHTML = "Amount: 0";
        elementPerSec = document.createElement("div");
        elementPerSec.setAttribute("id", "building-" + tb.intname + "-persec");
        elementPerSec.innerHTML = "Per Second: 0 [0]";
        element.appendChild(elementBuy1);
        element.appendChild(elementBuy10);
        element.appendChild(elementBuy100);
        element.appendChild(elementCost);
        element.appendChild(elementAmnt);
        element.appendChild(elementPerSec);
        buildingContainer.appendChild(element);
    }
}

function updateBuildings() {
    for (var build in buildings) {
        tb = buildings[build];
        tbg = window.game.buildings[build];
        price = Math.round(Math.round(tb.basecost * priceMultiplier ** tbg.amount) * window.game.buildingDiscount);
        //console.log('tb: ' + tb.intname)
        if ((window.game.totalLootboxes >= (tb.basecost * window.game.buildingDiscount)) || (tbg.amount >= 1)) {
            //console.log(document.getElementById('building-' + tb.intname))
            document.getElementById("building-" + tb.intname).hidden = false;
        } else {
            document.getElementById("building-" + tb.intname).hidden = true;
        }
        document.getElementById('building-' + tb.intname + '-cost').innerHTML = "Cost: " + price;
        document.getElementById("building-" + tb.intname + "-amount").innerHTML = tbg.amount;
        document.getElementById("building-" + tb.intname + "-persec").innerHTML = tb.persec + " [" + tb.persec*tbg.amount + "]";
    }
}

function buyBuilding(build, amount=1) {
    tb = buildings[build]
    //console.log(window.game.lootboxes + "/" + tb.basecost)
    for (i = 1; i <= amount; i++) {
        console.log('buying ' + i + ' of ' + amount);
        price = Math.round(Math.round(tb.basecost * priceMultiplier ** window.game.buildings[build].amount) * window.game.buildingDiscount)
        if (window.game.lootboxes >= price) {
            window.game.lootboxes = window.game.lootboxes - price;
            window.game.buildings[build].amount++;
            updateUI();
        } else { console.log('not enough lbs, ' + window.game.lootboxes + ' of ' + price);break }
    }
}