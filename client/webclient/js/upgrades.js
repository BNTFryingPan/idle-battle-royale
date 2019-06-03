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
        console.log('bought noobpower3');
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

//var 

function tickUpgrades() {
    for (var i = 0; i < upgrades.length; i++) {
        if (window.game.upgrades[tu.id] != true) {
            tu = upgrades[i];
            if (tu.unlock()) {
                document.getElementById('upgrade-button-' + tu.id).hidden = false;
            } else {
                document.getElementById('upgrade-button-' + tu.id).hidden = true;
            }
        }
    }
}

function buyUpgrade(id) {
    for (var i = 0; i < upgrades.length; i++) {
        if (upgrades[i].id == id) {
            if (upgrades[i].cost() == true) {
                console.log('triggering onBuy() of ' + upgrades[i].id + ' which has id ' + i + ' and name of ' + upgrades[i].name)
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
            element = document.createElement('button');
            elementDesc = document.createElement('div');
            elementDesc.setAttribute('class', 'upgrade-desc');
            elementDesc.setAttribute('id', 'upgrade-desc-' + tu.id);
            //elementDesc.setAttribute('onmouseover', 'openUpgradeBox(' + tu.id + ')');
            //elementDesc.setAttribute('onmouseout', 'closeUpgradeBox(' + tu.id + ')');
            elementDesc.innerHTML = tu.name + '<br>' + tu.desc;
            element.hidden = true;
            //elementContainer.hidden = true;
            element.setAttribute("id", "upgrade-button-" + tu.id);
            element.setAttribute('class', 'upgrade');
            element.setAttribute('onclick', "buyUpgrade('" + tu.id + "')");
            //element.hidden = true
            //elementContainer.appendChild(element);
            //elementContainer.appendChild(elementDesc);
            upgradeContainer.appendChild(element);
            upgradeContainer.appendChild(elementDesc);
        }
    }
}

/*function openUpgradeBox(id) {
    document.getElementById('upgrade-desc-' + id).enabled = true;
}

function closeUpgradeBox(id) {
    document.getElementById('upgrade-desc-' + id).enabled = false;
}*/