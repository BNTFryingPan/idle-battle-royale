class building {
    constructor(id, basePrice, baseLbps, name, description, icon) {
        this.id = id;
        this.basePrice = basePrice;
        this.baseLbps = baseLbps;
        this.name = name;
        this.description = description;
        this.icon = icon;

        this.amount = 0;
        this.price = this.basePrice;
        this.lbps = 0;
        this.unlocked = false;
    }

    buy() {

    }

    cost() {

    }
}


function loadNewBuilding(buildingData) {
    var buildingContainer = document.getElementById("buildings");
    var tb = buildingData;
    //console.log("loading b: " + tb.name)
    var element = document.createElement("div");
    element.setAttribute("id", "building-" + tb.intname);
    element.setAttribute("class", "building");
    element.setAttribute('data-tt', "<b>" + tb.name + "</b><br>" + tb.desc)
    element.hidden = true;
    var elementTopRow = document.createElement("p");
    elementTopRow.setAttribute('id', 'building-' + tb.intname + '-toprow')
    elementTopRow.setAttribute('class', 'building-toprow')
    elementTopRow.innerHTML = tb.name + " x0 | LBPS: " + tb.basepersec + " [0]"
    elementTopRow.setAttribute('data-tt', "<b>" + tb.name + "</b><br>" + tb.desc)
    var elementBuy1 = document.createElement("button");
    elementBuy1.setAttribute("id", "building-" + tb.intname + "-buy1");
    elementBuy1.setAttribute("onclick", "buyBuilding('" + tb.intname + "', 1)");
    elementBuy1.setAttribute("class", "fancy-button buy-1")
    elementBuy1.innerHTML = "Buy 1 " + tb.name;
    var elementBuy10 = document.createElement("button");
    elementBuy10.setAttribute("id", "building-" + tb.intname + "-buy10");
    elementBuy10.setAttribute("onclick", "buyBuilding('" + tb.intname + "', 10)");
    elementBuy10.setAttribute("class", "fancy-button buy-10")
    elementBuy10.innerHTML = "x10";
    var elementBuy100 = document.createElement("button");
    elementBuy100.setAttribute("id", "building-" + tb.intname + "-buy100");
    elementBuy100.setAttribute("onclick", "buyBuilding('" + tb.intname + "', 100)");
    elementBuy100.setAttribute("class", "fancy-button buy-100")
    elementBuy100.innerHTML = "x100";
    var elementCost = document.createElement("div");
    elementCost.setAttribute("id", "building-" + tb.intname + "-cost");
    elementCost.setAttribute('class', 'building-cost')
    elementCost.innerHTML = "Cost: " + tb.basecost;
    elementCost.setAttribute('data-tt', "<b>" + tb.name + "</b><br>" + tb.desc)
    var buildingIcon = document.createElement("img")
    buildingIcon.setAttribute('src', tb.icon)
    buildingIcon.setAttribute('class', 'building-icon')
    buildingIcon.setAttribute('data-tt', "<b>" + tb.name + "</b><br>" + tb.desc)
    
    element.appendChild(elementTopRow);
    element.appendChild(elementCost);
    element.appendChild(elementBuy1);
    element.appendChild(elementBuy10);
    element.appendChild(elementBuy100);
    element.appendChild(buildingIcon);
    buildingContainer.appendChild(element);
}

function loadBuildings() {
    for (var build in buildings) {
        loadNewBuilding(buildings[build])
    }
}

function updateBuildings() {
    window.game.totalBuildings = 0;
    for (var build in buildings) {
        //tb = buildings[build];
        var tbg = window.game.buildings[build];
        window.game.totalBuildings += tbg.amount;
        var price = buildingPrice(build);
        //console.log('tb: ' + tb.intname)
        if ((window.game.totalLootboxes >= (tbg.basecost * window.game.buildingDiscount)) || build == 'noob' || (window.game.buildings[tbg.parent].amount >= 1) || (tbg.parent.amount >= 1)) {
            document.getElementById("building-" + tbg.intname).hidden = false;
        } else {
            document.getElementById("building-" + tbg.intname).hidden = true;
        }

        document.getElementById('building-' + tbg.intname + '-cost').innerHTML = "Cost: " + abbrNum(price);
        document.getElementById('building-' + tbg.intname + '-toprow').innerHTML = tbg.name + " x" + tbg.amount + ' | LBPS ' + abbrNum(tbg.persec * tbg.multiplier) + ' [' + abbrNum((tbg.persec*tbg.multiplier)*tbg.amount) + ']'
        if (window.game.lootboxes >= buildingPrice(build, false, 1)) {
            document.getElementById('building-' + tbg.intname).classList.add('affordable')
            document.getElementById('building-' + tbg.intname).classList.remove('expensive');
        } else {
            document.getElementById('building-' + tbg.intname).classList.remove('affordable')
            document.getElementById('building-' + tbg.intname).classList.add('expensive');
        }

        if (buildingBuyMode == true) {
            document.getElementById('building-' + tbg.intname + '-buy1').title = buildingPrice(build, false, 1)
            document.getElementById('building-' + tbg.intname + '-buy10').hidden = false
            document.getElementById('building-' + tbg.intname + '-buy10').title = buildingPrice(build, false, 10)
            document.getElementById('building-' + tbg.intname + '-buy100').hidden = false
            document.getElementById('building-' + tbg.intname + '-buy100').title = buildingPrice(build, false, 100)

            if (window.game.lootboxes >= buildingPrice(build, false, 10)) {
                document.getElementById('building-' + tbg.intname + '-buy10').classList.remove('expensive')
            } else {
                document.getElementById('building-' + tbg.intname + '-buy10').classList.add('expensive')
            }

            if (window.game.lootboxes >= buildingPrice(build, false, 100)) {
                document.getElementById('building-' + tbg.intname + '-buy100').classList.remove('expensive')
            } else {
                document.getElementById('building-' + tbg.intname + '-buy100').classList.add('expensive')
            }
        } else {
            document.getElementById('building-' + tbg.intname + '-buy1').innerHTML = "Sell 1 " + tbg.name
            document.getElementById('building-' + tbg.intname + '-cost').innerHTML = "Value: " + abbrNum(buildingPrice(build, true, 1))
            document.getElementById('building-' + tbg.intname + '-buy1').title = buildingPrice(build, true, 1)
            document.getElementById('building-' + tbg.intname + '-buy10').innerHTML = "x10"
            document.getElementById('building-' + tbg.intname + '-buy10').title = buildingPrice(build, true, 10)
            document.getElementById('building-' + tbg.intname + '-buy100').innerHTML = "x100"
            document.getElementById('building-' + tbg.intname + '-buy100').title = buildingPrice(build, true, 100)

            if (tbg.amount >= 1) {
                document.getElementById('building-' + tbg.intname + '-buy10').hidden = false
                if (tbg.amount >= 10) {
                    document.getElementById('building-' + tbg.intname + '-buy100').hidden = false
                } else {
                    document.getElementById('building-' + tbg.intname + '-buy100').hidden = true
                }
            } else {
                document.getElementById('building-' + tbg.intname + '-buy10').hidden = true
                document.getElementById('building-' + tbg.intname + '-buy100').hidden = true
            }
        }
    }
}

function buyBuilding(build, amount=1) {
    //tb = buildings[build];
    var tbg = window.game.buildings[build];
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
                try { window.game.buildings[build].onBuy(); } catch (error) { }
            } else { /*console.log('not enough lbs, ' + window.game.lootboxes + ' of ' + price);*/break }
        } else {
            if (window.game.buildings[build].amount >= 1) { //having negative buildings does some funky stuff, feel free to try it, but it will ruin your save forever
                value =  Math.floor(Math.round(Math.round(tbg.basecost * priceMultiplier ** ( window.game.buildings[build].amount - 1) ) * window.game.buildingDiscount) / 2);
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