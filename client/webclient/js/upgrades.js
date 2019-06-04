var upgrades = [];

var clickPower1 = {
    name: "Assistant",
    desc: "Cost: 100<br>You get one extra lootbox per click",
    id: "clickPower1",
    unlock: function() {return window.game.totalLootboxClicks >= 50},
    cost: function() {return window.game.lootboxes >= 100},
    onBuy: function() {
        window.game.upgrades[this.id] = true;
        window.game.lootboxes = window.game.lootboxes - 100;
        document.getElementById("upgrades").removeChild(document.getElementById('upgrade-button-' + this.id));
        document.getElementById("upgrades").removeChild(document.getElementById('upgrade-desc-' + this.id));
        window.game.lootboxesPerClickAdditive = window.game.lootboxesPerClickAdditive + 1;
    }
}

var clickPower2 = {
    name: "Dual Assistants",
    desc: "Cost: 500<br>You get two extra lootboxes per click",
    id: "clickPower2",
    unlock: function() {return window.game.totalLootboxClicks >= 100},
    cost: function() {return window.game.lootboxes >= 500},
    onBuy: function() {
        window.game.upgrades[this.id] = true;
        window.game.lootboxes = window.game.lootboxes - 500;
        document.getElementById("upgrades").removeChild(document.getElementById('upgrade-button-' + this.id));
        document.getElementById("upgrades").removeChild(document.getElementById('upgrade-desc-' + this.id));
        window.game.lootboxesPerClickAdditive = window.game.lootboxesPerClickAdditive + 2;
    }
}

var clickPower3 = {
    name: "Quad Assistants",
    desc: "Cost: 1500<br>Lootboxes per click doubled",
    id: "clickPower3",
    unlock: function() {return window.game.totalLootboxClicks >= 500},
    cost: function() {return window.game.lootboxes >= 1500},
    onBuy: function() {
        window.game.upgrades[this.id] = true;
        window.game.lootboxes = window.game.lootboxes - 1500;
        document.getElementById("upgrades").removeChild(document.getElementById('upgrade-button-' + this.id));
        document.getElementById("upgrades").removeChild(document.getElementById('upgrade-desc-' + this.id));
        window.game.lootboxesPerClickMultiplier = window.game.lootboxesPerClickMultiplier * 2;
    }
}

upgrades.push(clickPower1);
upgrades.push(clickPower2);
upgrades.push(clickPower3);

var noobPower1 = {
    name: "Double Noob",
    desc: "Cost: 100<br>Doubles production from Noobs<br><i>Some say that the noob becomes a player<br>at some point, but that cant possibly be true</i>",
    id: "noobPower1",
    unlock: function(){return window.game.buildings['noob'].amount >= 2},
    cost: function(){return window.game.lootboxes >= 100},
    onBuy: function(){
        window.game.upgrades[this.id] = true;
        document.getElementById("upgrades").removeChild(document.getElementById('upgrade-button-' + this.id));
        document.getElementById("upgrades").removeChild(document.getElementById('upgrade-desc-' + this.id));
        window.game.lootboxes = window.game.lootboxes - 100;
        window.game.buildings['noob'].multiplier = window.game.buildings['noob'].multiplier * 2;

    }
}

var noobPower2 = {
    name: "Tri-Noob",
    desc: "Cost: 500<br>Doubles production from Noobs",
    id: "noobPower2",
    unlock: function(){return window.game.buildings['noob'].amount >= 10},
    cost: function(){return window.game.lootboxes >= 500},
    onBuy: function(){
        window.game.upgrades[this.id] = true;
        document.getElementById("upgrades").removeChild(document.getElementById('upgrade-button-' + this.id));
        document.getElementById("upgrades").removeChild(document.getElementById('upgrade-desc-' + this.id));
        window.game.lootboxes = window.game.lootboxes - 500;
        window.game.buildings['noob'].multiplier = window.game.buildings['noob'].multiplier * 2;
    }
}

var noobPower3 = {
    name: "Quad-Noob",
    desc: "Cost: 1500<br>Doubles production from Noobs",
    id: "noobPower3",
    unlock: function(){return window.game.buildings['noob'].amount >= 50},
    cost: function(){return window.game.lootboxes >= 1500},
    onBuy: function(){
        window.game.upgrades[this.id] = true;
        document.getElementById("upgrades").removeChild(document.getElementById('upgrade-button-' + this.id));
        document.getElementById("upgrades").removeChild(document.getElementById('upgrade-desc-' + this.id));
        window.game.lootboxes = window.game.lootboxes - 1500;
        window.game.buildings['noob'].multiplier = window.game.buildings['noob'].multiplier * 2;
    }
}

upgrades.push(noobPower1);
upgrades.push(noobPower2);
upgrades.push(noobPower3);

var playerPower1 = {
    name: "Better Players",
    desc: "Cost: 100<br>+1 production from Players",
    id: "playerPower1",
    unlock: function(){return window.game.buildings['player'].amount >= 10},
    cost: function(){return window.game.lootboxes >= 100},
    onBuy: function(){
        window.game.upgrades[this.id] = true;
        document.getElementById("upgrades").removeChild(document.getElementById('upgrade-button-' + this.id));
        document.getElementById("upgrades").removeChild(document.getElementById('upgrade-desc-' + this.id));
        window.game.lootboxes = window.game.lootboxes - 100;
        window.game.buildings['player'].persec += 2;
    }
}

var playerPower2 = {
    name: "Improved Players",
    desc: "Cost: 500<br>Double production from Players",
    id: "playerPower2",
    unlock: function(){return window.game.buildings['player'].amount >= 25},
    cost: function(){return window.game.lootboxes >= 500},
    onBuy: function(){
        window.game.upgrades[this.id] = true;
        document.getElementById("upgrades").removeChild(document.getElementById('upgrade-button-' + this.id));
        document.getElementById("upgrades").removeChild(document.getElementById('upgrade-desc-' + this.id));
        window.game.lootboxes = window.game.lootboxes - 500;
        window.game.buildings['player'].persec *= 2;
    }
}

var playerPower3 = {
    name: "Even Better Players",
    desc: "Cost: 1500<br>Double production from Players",
    id: "playerPower3",
    unlock: function(){return window.game.buildings['player'].amount >= 50},
    cost: function(){return window.game.lootboxes >= 1500},
    onBuy: function(){
        window.game.upgrades[this.id] = true;
        document.getElementById("upgrades").removeChild(document.getElementById('upgrade-button-' + this.id));
        document.getElementById("upgrades").removeChild(document.getElementById('upgrade-desc-' + this.id));
        window.game.lootboxes = window.game.lootboxes - 1500;
        window.game.buildings['player'].persec *= 2;
    }
}

upgrades.push(playerPower1);
upgrades.push(playerPower2);
upgrades.push(playerPower3);

var buildingPrice1 = {
    name: "Bob the Builder",
    desc: "Cost: 50,000<br>Buildings cost 25% less",
    id: "buildingPrice1",
    unlock: function(){return window.game.totalBuildings >= 100},
    cost: function(){return window.game.lootboxes >= 50000},
    onBuy: function(){
        window.game.upgrades[this.id] = true;
        document.getElementById("upgrades").removeChild(document.getElementById('upgrade-button-' + this.id));
        document.getElementById("upgrades").removeChild(document.getElementById('upgrade-desc-' + this.id));
        window.game.lootboxes = window.game.lootboxes - 50000;
        window.game.buildingDiscount -= window.game.buildingDiscount * 0.75;
    }
}

var buildingPrice2 = {
    name: "Master Builder",
    desc: "Cost: 175,000<br>Buildings cost 25% less",
    id: "buildingPrice2",
    unlock: function(){return window.game.totalBuildings >= 300},
    cost: function(){return window.game.lootboxes >= 175000},
    onBuy: function(){
        window.game.upgrades[this.id] = true;
        document.getElementById("upgrades").removeChild(document.getElementById('upgrade-button-' + this.id));
        document.getElementById("upgrades").removeChild(document.getElementById('upgrade-desc-' + this.id));
        window.game.lootboxes = window.game.lootboxes - 175000;
        window.game.buildingDiscount -= window.game.buildingDiscount * 0.75;
    }
}

var buildingPrice3 = {
    name: "Steve",
    desc: "Cost: 552,000<br>Buildings cost 25% less",
    id: "buildingPrice3",
    unlock: function(){return window.game.totalBuildings >= 800},
    cost: function(){return window.game.lootboxes >= 552000},
    onBuy: function(){
        window.game.upgrades[this.id] = true;
        document.getElementById("upgrades").removeChild(document.getElementById('upgrade-button-' + this.id));
        document.getElementById("upgrades").removeChild(document.getElementById('upgrade-desc-' + this.id));
        window.game.lootboxes = window.game.lootboxes - 552000;
        window.game.buildingDiscount -= window.game.buildingDiscount * 0.75;
    }
}

upgrades.push(buildingPrice1);
upgrades.push(buildingPrice2);
upgrades.push(buildingPrice3);

function tickUpgrades() {
    if (isLoaded == true) {
        for (var i = 0; i < upgrades.length; i++) {
            tu = upgrades[i];
            if (window.game.upgrades[tu.id] != true) {
                try {
                    if (tu.unlock()) {
                        document.getElementById("upgrade-button-" + tu.id).hidden = false;
                    } else {
                        document.getElementById('upgrade-button-' + tu.id).hidden = true;
                    }
                } catch (error) {
                    console.log(error + ' during tick of ' + tu.id)
                }
            }
        }
    }
}

function buyUpgrade(id) {
    for (var i = 0; i < upgrades.length; i++) {
        if (upgrades[i].id == id) {
            if (upgrades[i].cost() == true) {
                //console.log('triggering onBuy() of ' + upgrades[i].id + ' which has id ' + i + ' and name of ' + upgrades[i].name)
                //console.log('upgrades[i]: ' + upgrades[i])
                upgrades[i].onBuy()
            }
            break;
        }
    }
}

function loadUpgrades() {
    var upgradeContainer = document.getElementById('upgrades');
    for (var upgrade in upgrades) {
        tu = upgrades[upgrade];
        if (window.game.upgrades[tu.id] != true) {
            window.game.upgrades[tu.id] = false;
            //elementContainer = document.createElement('span');
            //elementContainer.setAttribute('id', "upgrade-" + tu.id);
            upgradeButton = document.createElement('button');
            upgradeDesc = document.createElement('div');
            upgradeDesc.setAttribute('class', 'upgrade-desc');
            upgradeDesc.setAttribute('id', 'upgrade-desc-' + tu.id);
            //elementDesc.setAttribute('onmouseover', 'openUpgradeBox(' + tu.id + ')');
            //elementDesc.setAttribute('onmouseout', 'closeUpgradeBox(' + tu.id + ')');
            upgradeDesc.innerHTML = tu.name + '<br>' + tu.desc;
            upgradeButton.hidden = true;
            //elementContainer.hidden = true;
            upgradeButton.setAttribute("id", "upgrade-button-" + tu.id);
            upgradeButton.setAttribute('class', 'upgrade');
            upgradeButton.setAttribute('onclick', "buyUpgrade('" + tu.id + "')");
            //element.hidden = true
            //elementContainer.appendChild(element);
            //elementContainer.appendChild(elementDesc);
            upgradeContainer.appendChild(upgradeButton);
            upgradeContainer.appendChild(upgradeDesc);
        }
    }
}

/*function openUpgradeBox(id) {
    document.getElementById('upgrade-desc-' + id).enabled = true;
}

function closeUpgradeBox(id) {
    document.getElementById('upgrade-desc-' + id).enabled = false;
}*/