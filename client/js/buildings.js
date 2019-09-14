// sorry ortiel but i stole your balancing because its so good lol

var noob = {
    name: "Noob",
    intname: "noob",
    parent: {amount: 1},
    basepersec: 0.1,
    persec: 0.1,
    multiplier: 1,
    basecost: 15,
    amount: 0,
    multiplier: 1,
    onBuy: function() {},
    onSell: function() {}
}

var player = {
    name: "Player",
    intname: "player",
    parent: "noob",
    basepersec: 1,
    persec: 1,
    multiplier: 1,
    basecost: 100,
    amount: 0,
    multiplier: 1,
    onBuy: function() {},
    onSell: function() {}
}

var gamer = {
    name: "Gamer",
    intname: "gamer",
    parent: "player",
    basepersec: 8,
    persec: 8,
    multiplier: 1,
    basecost: 1100,
    amount: 0,
    multiplier: 1,
    onBuy: function() {},
    onSell: function() {}
}

var nolife = {
    name: "No Lifer",
    intname: "nolife",
    parent: "gamer",
    basepersec: 47,
    persec: 47,
    multiplier: 1,
    basecost: 12e3,
    amount: 0,
    multiplier: 1,
    onBuy: function() {},
    onSell: function() {}
}

var epicgamer = {
    name: "Epic Gamer",
    intname: "epicgamer",
    parent: "nolife",
    basepersec: 260,
    persec: 260,
    multiplier: 1,
    basecost: 13e4,
    amount: 0,
    multiplier: 1,
    onBuy: function() {},
    onSell: function() {}
}

var speedrunner = {
    name: "Speedrunner", 
    intname: "speedrunner",
    parent: "epicgamer",
    basepersec: 1400,
    persec: 1400,
    multiplier: 1,
    basecost: 14e5,
    amount: 0,
    multiplier: 1,
    onBuy: function() {},
    onSell: function() {}
}

var streamer = {
    name: "Streamer",
    intname: "streamer",
    parent: "speedrunner",
    basepersec: 7800,
    persec: 7800,
    multiplier: 1,
    basecost: 2e7,
    amount: 0,
    multiplier: 1,
    onBuy: function() {},
    onSell: function() {}
}

var modder = {
    name: "Modder",
    intname: "modder",
    parent: "streamer",
    basepersec: 44e3,
    persec: 44e3,
    multiplier: 1,
    basecost: 33e7,
    amount: 0,
    multiplier: 1,
    onBuy: function() {},
    onSell: function() {}
}

var celery = {
    name: "Celebrity",
    intname: "celery",
    parent: "modder",
    basepersec: 26e5,
    persec: 26e5,
    multiplier: 1,
    basecost: 51e8,
    amount: 0,
    multiplier: 1,
    onBuy: function() {},
    onSell: function() {}
}

var memelord = {
    name: "Meme Lord",
    intname: "memelord",
    parent: "celery",
    basepersec: 1.6e5,
    persec: 1.6e5,
    multiplier: 1,
    basecost: 71e9,
    amount: 0,
    onBuy: function() {},
    onSell: function() {}
}



// 1 tril -> 10 mil
// 14 tril -> 65 mil
// 170 tril -> 430 mil
// 2.1 quad -> 2.9 bil
// 26 quad -> 21 bil
// 310 quad -> 150bil

var buildings = {
    noob: noob,
    player: player,
    gamer: gamer,
    nolife: nolife,
    epicgamer: epicgamer,
    speedrunner: speedrunner,
    streamer: streamer,
    modder: modder,
    celery: celery,
    memelord: memelord
}

var priceMultiplier = 1.125;
var buildingBuyMode = true;

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
        elementTopRow.setAttribute('class', 'building-toprow')
        elementTopRow.innerHTML = tb.name + " x0 | LBPS: " + tb.basepersec + " [0]" 
        elementBuy1 = document.createElement("button");
        elementBuy1.setAttribute("id", "building-" + tb.intname + "-buy1");
        //elementBuy1.setAttribute('style', "border-radius: 2px; border: none; padding: 3px")
        elementBuy1.setAttribute("onclick", "buyBuilding('" + tb.intname + "', 1)");
        elementBuy1.setAttribute("class", "fancy-button")
        elementBuy1.innerHTML = "Buy 1 " + tb.name;
        elementBuy10 = document.createElement("button");
        elementBuy10.setAttribute("id", "building-" + tb.intname + "-buy10");
        //elementBuy10.setAttribute("style", "margin-left: 3px; border-radius: 2px; border: none; padding: 3px")
        elementBuy10.setAttribute("onclick", "buyBuilding('" + tb.intname + "', 10)");
        elementBuy10.setAttribute("class", "fancy-button")
        elementBuy10.innerHTML = "x10";
        elementBuy100 = document.createElement("button");
        elementBuy100.setAttribute("id", "building-" + tb.intname + "-buy100");
        //elementBuy100.setAttribute("style", "margin-left: 3px; border-radius: 2px; border: none; padding: 3px")
        elementBuy100.setAttribute("onclick", "buyBuilding('" + tb.intname + "', 100)");
        elementBuy100.setAttribute("class", "fancy-button")
        elementBuy100.innerHTML = "x100";
        elementCost = document.createElement("div");
        elementCost.setAttribute("id", "building-" + tb.intname + "-cost");
        elementCost.setAttribute('class', 'building-cost')
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
        price = buildingPrice(build);
        //console.log('tb: ' + tb.intname)
        if ((window.game.totalLootboxes >= (tb.basecost * window.game.buildingDiscount)) || build == 'noob' || (window.game.buildings[tbg.parent].amount >= 1) || (tbg.parent.amount >= 1)) {
            document.getElementById("building-" + tb.intname).hidden = false;
        } else {
            document.getElementById("building-" + tb.intname).hidden = true;
        }

        document.getElementById('building-' + tb.intname + '-cost').innerHTML = "Cost: " + abbrNum(price);
        document.getElementById('building-' + tb.intname + '-toprow').innerHTML = tb.name + " x" + tbg.amount + ' | LBPS ' + abbrNum(tbg.persec * tbg.multiplier) + ' [' + abbrNum((tbg.persec*tbg.multiplier)*tbg.amount) + ']'
        if (window.game.lootboxes >= buildingPrice(build, false, 1)) {
            document.getElementById('building-' + tb.intname + '-toprow').style = "color: lime"
            document.getElementById('building-' + tb.intname + '-buy1').style = ""
            document.getElementById('building-' + tb.intname).classList.remove('tooexpensive');
        } else {
            document.getElementById('building-' + tb.intname + '-toprow').style = "color: red"
            document.getElementById('building-' + tb.intname + '-buy1').style = "background-color: red"
            document.getElementById('building-' + tb.intname).classList.add('tooexpensive');
        }

        if (buildingBuyMode == true) {
            document.getElementById('building-' + tb.intname + '-buy1').title = buildingPrice(build, false, 1)
            document.getElementById('building-' + tb.intname + '-buy10').hidden = false
            document.getElementById('building-' + tb.intname + '-buy10').title = buildingPrice(build, false, 10)
            document.getElementById('building-' + tb.intname + '-buy100').hidden = false
            document.getElementById('building-' + tb.intname + '-buy100').title = buildingPrice(build, false, 100)

            if (window.game.lootboxes >= buildingPrice(build, false, 10)) {
                document.getElementById('building-' + tb.intname + '-buy10').style = ""
            } else {
                document.getElementById('building-' + tb.intname + '-buy10').style = "background-color: red"
            }

            if (window.game.lootboxes >= buildingPrice(build, false, 100)) {
                document.getElementById('building-' + tb.intname + '-buy100').style = ""
            } else {
                document.getElementById('building-' + tb.intname + '-buy100').style = "background-color: red"
            }
        } else {
            document.getElementById('building-' + tb.intname + '-buy1').innerHTML = "Sell 1 " + tb.name
            document.getElementById('building-' + tb.intname + '-cost').innerHTML = "Value: " + abbrNum(buildingPrice(build, true, 1))
            document.getElementById('building-' + tb.intname + '-buy1').title = buildingPrice(build, true, 1)
            document.getElementById('building-' + tb.intname + '-buy10').innerHTML = "x10"
            document.getElementById('building-' + tb.intname + '-buy10').title = buildingPrice(build, true, 10)
            document.getElementById('building-' + tb.intname + '-buy100').innerHTML = "x100"
            document.getElementById('building-' + tb.intname + '-buy100').title = buildingPrice(build, true, 100)

            if (tbg.amount >= 1) {
                document.getElementById('building-' + tb.intname + '-buy10').hidden = false
                if (tbg.amount >= 10) {
                    document.getElementById('building-' + tb.intname + '-buy100').hidden = false
                } else {
                    document.getElementById('building-' + tb.intname + '-buy100').hidden = true
                }
            } else {
                document.getElementById('building-' + tb.intname + '-buy1').hidden = true
                document.getElementById('building-' + tb.intname + '-buy10').hidden = true
            }
        }
    }
}

function buyBuilding(build, amount=1) {
    tb = buildings[build];
    tbg = window.game.buildings[build];
    var price = 0
    //console.log(window.game.lootboxes + "/" + tb.basecost)
    for (i = 1; i <= amount; i++) {
        if (buildingBuyMode == true) {
            price = buildingPrice(build)
            //console.log('buying ' + i + ' of ' + amount + ' for ' + abbrNum(price) + '[' + abbrNum(window.game.lootboxes) + ']');
            if (window.game.lootboxes >= price) {
                window.game.lootboxes = window.game.lootboxes - price;
                window.game.buildings[build].amount++;
                window.game.totalBuildings++;
                //updateUI(); // commented out because updating the ui can take time, and it updates the UI 100 times a second already
                try { window.game.buildings[build].onBuy(); } catch (error) { }
            } else { /*console.log('not enough lbs, ' + window.game.lootboxes + ' of ' + price);*/break }
        } else {
            if (window.game.buildings[build].amount >= 1) { //having negative buildings does some funky stuff, feel free to try it, but it will ruin your save forever
                value =  Math.floor(Math.round(Math.round(tb.basecost * priceMultiplier ** ( window.game.buildings[build].amount - 1) ) * window.game.buildingDiscount) / 2);
                window.game.buildings[build].amount--;
                window.game.totalBuildings--;
                if ( ( window.game.lootboxes + value ) > window.game.totalLootboxes ) { // this if statement is so if a building price increases, you dont get marked as a cheater for having too many lootboxes if you sell everything
                    var totalToAdd = ( ( window.game.lootboxes + value ) - window.game.totalLootboxes ) // here we calculate how many extra lootboxes youd have by selling this amount
                    window.game.totalLootboxes += totalToAdd;
                }
                window.game.lootboxes += value;
            }
        }
    }
}

function buildingPrice(build, sell=false, amount=1) {
    tbg = window.game.buildings[build];
    var price = 0 //TODO: figure out why with building price discount, first few buildings can cost 0
    if (sell == true) {
        if ( tbg.amount == 0 ) {
            return 0;
        }
        if (amount > 1) {
            for (var i = 0; i <= amount; i++) {
                price += Math.round(Math.round(tbg.basecost * priceMultiplier ** (tbg.amount - i)) * window.game.buildingDiscount);
                price = Math.floor(price*window.game.sellMultiplier)
            }
        } else {
            price += Math.round(Math.round(tbg.basecost * priceMultiplier ** (tbg.amount)) * window.game.buildingDiscount);
            price = Math.floor(price*window.game.sellMultiplier)
        }
    } else {
        if (amount > 1) {
            for (var i = 0; i <= amount; i++) {
                price += Math.round(Math.round(tbg.basecost * priceMultiplier ** (tbg.amount + i)) * window.game.buildingDiscount);
            }
        } else {
            price += Math.round(Math.round(tbg.basecost * priceMultiplier ** (tbg.amount)) * window.game.buildingDiscount);
        }
    }
    
    return price;
}