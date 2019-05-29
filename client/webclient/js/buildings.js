var noob = {
    name: "Noob",
    intname: "noob",
    parent: {amount: 1},
    basepersec: 1,
    persec: 1,
    basecost: 15,
    amount: 0
}

var player = {
    name: "Player",
    intname: "player",
    parent: "noob",
    basepersec: 3,
    persec: 3,
    basecost: 50,
    amount: 0
}

var gamer = {
    name: "Gamer",
    intname: "gamer",
    parent: "player",
    basepersec: 10,
    persec: 10,
    basecost: 150,
    amount: 0
}

var nolife = {
    name: "No Lifer",
    intname: "nolife",
    parent: "gamer",
    basepersec: 25,
    persec: 25,
    basecost: 325,
    amount: 0
}

var epicgamer = {
    name: "Epic Gamer",
    intname: "epicgamer",
    parent: "nolife",
    basepersec: 100,
    persec: 100,
    basecost: 600,
    amount: 0
}

var speedrunner = {
    name: "Speedrunner", 
    intname: "speedrunner",
    parent: "epicgamer",
    basepersec: 500,
    persec: 500,
    basecost: 2000,
    amount: 0
}

var streamer = {
    name: "Streamer",
    intname: "streamer",
    parent: "speedrunner",
    basepersec: 3000,
    persec: 3000,
    basecost: 10000,
    amount: 0
}

var modder = {
    name: "Modder",
    intname: "modder",
    parent: "streamer",
    basepersec: 10000,
    persec: 10000,
    basecost: 25000,
    amount: 0
}

var buildings = {
    noob: noob,
    player: player,
    gamer: gamer,
    nolife: nolife,
    epicgamer: epicgamer,
    speedrunner: speedrunner,
    streamer: streamer,
    modder: modder
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
        elementTopRow = document.createElement("p");
        elementTopRow.setAttribute('id', 'building-' + tb.intname + '-toprow')
        elementTopRow.innerHTML = tb.name + " x0 | LBPS: " + tb.basepersec + " [0]" 
        elementBuy1 = document.createElement("button");
        elementBuy1.setAttribute("id", "building-" + tb.intname + "-buy");
        elementBuy1.setAttribute('style', "border-radius: 2px; border: none; padding: 3px")
        elementBuy1.setAttribute("onclick", "buyBuilding('" + tb.intname + "', 1)");
        elementBuy1.innerHTML = "Buy 1 " + tb.name;
        elementBuy10 = document.createElement("button");
        elementBuy10.setAttribute("id", "building-" + tb.intname + "-buy10");
        elementBuy10.setAttribute("style", "margin-left: 3px; border-radius: 2px; border: none; padding: 3px")
        elementBuy10.setAttribute("onclick", "buyBuilding('" + tb.intname + "', 10)");
        elementBuy10.innerHTML = "x10";
        elementBuy100 = document.createElement("button");
        elementBuy100.setAttribute("id", "building-" + tb.intname + "-buy100");
        elementBuy100.setAttribute("style", "margin-left: 3px; border-radius: 2px; border: none; padding: 3px")
        elementBuy100.setAttribute("onclick", "buyBuilding('" + tb.intname + "', 100)");
        elementBuy100.innerHTML = "x100";
        elementCost = document.createElement("div");
        elementCost.setAttribute("id", "building-" + tb.intname + "-cost");
        elementCost.innerHTML = "Cost: " + tb.basecost;
        element.appendChild(elementTopRow);
        element.appendChild(elementCost);
        //element.appendChild(elementAmnt);
        //element.appendChild(elementPerSec);
        element.appendChild(elementBuy1);
        element.appendChild(elementBuy10);
        element.appendChild(elementBuy100);
        buildingContainer.appendChild(element);

        //element.setAttribute('onmouseover', mouseOverBuilding(tb.intname))
        //element.setAttribute('onmouseout', mouseOffBuilding(tb.intname))

        //document.addEventListener("")

        //element.addEventListener('mouseenter', mouseOverBuilding(tb.intname));
        //element.addEventListener('mouseoff', mouseOffBuilding(tb.intname));
    }
}

function updateBuildings() {
    window.game.totalBuildings = 0;
    for (var build in buildings) {
        tb = buildings[build];
        tbg = window.game.buildings[build];
        window.game.totalBuildings += tbg.amount;
        price = Math.round(Math.round(tb.basecost * priceMultiplier ** tbg.amount) * window.game.buildingDiscount);
        //console.log('tb: ' + tb.intname)
        if ((window.game.totalLootboxes >= (tb.basecost * window.game.buildingDiscount)) || (window.game.buildings[tb.parent].amount >= 1) || (tbg.parent.amount >= 1)) {
            //console.log(document.getElementById('building-' + tb.intname))
            document.getElementById("building-" + tb.intname).hidden = false;
        } else {
            document.getElementById("building-" + tb.intname).hidden = true;
        }
        document.getElementById('building-' + tb.intname + '-cost').innerHTML = "Cost: " + abbrNum(price);
        document.getElementById('building-' + tb.intname + '-toprow').innerHTML = tb.name + " x" + tbg.amount + ' | LBPS ' + abbrNum(tb.persec) + ' [' + abbrNum(tb.persec*tbg.amount) + ']'
        //document.getElementById("building-" + tb.intname + "-amount").innerHTML = tbg.amount;
        //document.getElementById("building-" + tb.intname + "-persec").innerHTML = abbrNum(tb.persec) + " [" + abbrNum(tb.persec*tbg.amount) + "]";
    }
}

function buyBuilding(build, amount=1) {
    tb = buildings[build]
    //console.log(window.game.lootboxes + "/" + tb.basecost)
    for (i = 1; i <= amount; i++) {
        //console.log('buying ' + i + ' of ' + amount);
        price = Math.round(Math.round(tb.basecost * priceMultiplier ** window.game.buildings[build].amount) * window.game.buildingDiscount);
        if (window.game.lootboxes >= price) {
            window.game.lootboxes = window.game.lootboxes - price;
            window.game.buildings[build].amount++;
            window.game.totalBuildings++;
            updateUI();
        } else { /*console.log('not enough lbs, ' + window.game.lootboxes + ' of ' + price);*/break }
    }
}