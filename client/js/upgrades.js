var upgrades = [];

var baseUpgrade = { 
    name: "Upgrade Name",
    desc: "Cost: [cost]<br>Description of effect[<br><i>lore</i>]",
    id: 'upgradeId',
    icon: 'upgradeIconID.png',
    unlock: function() {return false}, //return true if conditions to show upgrade is true
    cost: function(lbs) {return false}, //return true if the user can purchase this upgrade
    onBuy: function() {
        return; //you dont need to return anything, just put the effect of the purchasing the upgrade here
    }
}

//upgrades.push(baseUpgrade); //this line adds the upgrade to the upgrade list. They are put in order of when they are added, from top to bottom of the file
// upgrade order will be changed later to be based on a number, and lowest is first

var clickPower1 = {
    name: "Assistant",
    desc: "Cost: 100<br>You get one extra lootbox per click",
    id: "clickPower1",
    icon: "click1.png",
    unlock: function() {return window.game.totalLootboxClicks >= 50},
    cost: function(lbs) {return lbs >= 100},
    onBuy: function() {
        window.game.lootboxes -= 100
        window.game.lootboxesPerClickAdditive = window.game.lootboxesPerClickAdditive + 1;
    }
}

var clickPower2 = {
    name: "Dual Assistants",
    desc: "Cost: 500<br>You get two extra lootboxes per click",
    id: "clickPower2",
    icon: "click2.png",
    unlock: function() {return window.game.totalLootboxClicks >= 100},
    cost: function(lbs) {return lbs >= 500},
    onBuy: function() {
        window.game.lootboxes -= 500
        window.game.lootboxesPerClickAdditive = window.game.lootboxesPerClickAdditive + 2;
    }
}

var clickPower3 = {
    name: "Good Friend",
    desc: "Cost: 1500<br>Lootboxes per click doubled",
    id: "clickPower3",
    icon: "click3.png",
    unlock: function() {return window.game.totalLootboxClicks >= 500},
    cost: function(lbs) {return lbs >= 1500},
    onBuy: function() {
        window.game.lootboxes -= 1500
        window.game.lootboxesPerClickMultiplier = window.game.lootboxesPerClickMultiplier * 2;
    }
}

upgrades.push(clickPower1);
upgrades.push(clickPower2);
upgrades.push(clickPower3);

var clickCPS1 = {
    name: "6 Finger Hand",
    desc: "Cost: 500<br>Clicking gains 1% of your LBPS",
    id: "clickCPS1",
    icon: "click1.png",
    unlock: function() {return ( window.game.lootboxesPerClickFinal <= ( .1 * window.game.lootboxesPerSecond ) )},
    cost: function(lbs) {return lbs >= 500},
    onBuy: function() {
        window.game.lootboxes -= 500
        window.game.lootboxesPerClickCPS += 0.01
    }
}

upgrades.push(clickCPS1);

var noobPower1 = {
    name: "Double Noob",
    desc: "Cost: 100<br>+0.2 production from Noobs<br><i>Some say that the noob becomes a player<br>at some point, but that cant possibly be true</i>",
    id: "noobPower1",
    icon: "noob1.png",
    unlock: function(){return window.game.buildings['noob'].amount >= 2},
    cost: function(lbs){return lbs >= 100},
    onBuy: function(){
        window.game.lootboxes = window.game.lootboxes - 100;
        window.game.buildings['noob'].persec += 0.2

    }
}

var noobPower2 = {
    name: "Tri-Noob",
    desc: "Cost: 500<br>Doubles production from Noobs",
    id: "noobPower2",
    icon: "noob2.png",
    unlock: function(){return window.game.buildings['noob'].amount >= 10},
    cost: function(lbs){return lbs >= 500},
    onBuy: function(){
        window.game.lootboxes = window.game.lootboxes - 500;
        window.game.buildings['noob'].multiplier = window.game.buildings['noob'].multiplier * 2;
    }
}

var noobPower3 = {
    name: "Quad-Noob",
    desc: "Cost: 1500<br>Doubles production from Noobs",
    id: "noobPower3",
    icon: "noob3.png",
    unlock: function(){return window.game.buildings['noob'].amount >= 50},
    cost: function(lbs){return lbs >= 1500},
    onBuy: function(){
        window.game.lootboxes = window.game.lootboxes - 1500;
        window.game.buildings['noob'].multiplier = window.game.buildings['noob'].multiplier * 2;
    }
}

upgrades.push(noobPower1);
upgrades.push(noobPower2);
upgrades.push(noobPower3);

var playerPower1 = {
    name: "Better Players",
    desc: "Cost: 500<br>+2 production from Players",
    id: "playerPower1",
    icon: "player1.png",
    unlock: function(){return window.game.buildings['player'].amount >= 10},
    cost: function(lbs){return lbs >= 500},
    onBuy: function(){
        window.game.lootboxes = window.game.lootboxes - 100;
        window.game.buildings['player'].persec += 2;
    }
}

var playerPower2 = {
    name: "Improved Players",
    desc: "Cost: 1500<br>Double production from Players",
    id: "playerPower2",
    icon: "player2.png",
    unlock: function(){return window.game.buildings['player'].amount >= 25},
    cost: function(lbs){return lbs >= 1500},
    onBuy: function(){
        window.game.lootboxes = window.game.lootboxes - 1500;
        window.game.buildings['player'].multiplier *= 2;
    }
}

var playerPower3 = {
    name: "Even Better Players",
    desc: "Cost: 2750<br>Double production from Players",
    id: "playerPower3",
    icon: "player3.png",
    unlock: function(){return window.game.buildings['player'].amount >= 50},
    cost: function(lbs){return lbs >= 2750},
    onBuy: function(){
        window.game.lootboxes = window.game.lootboxes - 2750;
        window.game.buildings['player'].multiplier *= 2;
    }
}

upgrades.push(playerPower1);
upgrades.push(playerPower2);
upgrades.push(playerPower3);


var gamerPower1 = { 
    name: "Improved Gamers",
    desc: "Cost: 1500<br>+2 production from gamers",
    id: 'gamerPower1',
    icon: "gamer1.png",
    unlock: function() {return window.game.buildings['gamer'].amount >= 10}, //return true if conditions to show upgrade is true
    cost: function(lbs) {return lbs >= 1500}, //return true if the user can purchase this upgrade
    onBuy: function() {
        window.game.lootboxes = window.game.lootboxes - 1500;
        window.game.buildings['gamer'].persec += 2;
    }
}

var gamerPower2 = { 
    name: "Even Better Gamers",
    desc: "Cost: 2750<br>Double production from gamers",
    id: 'gamerPower2',
    icon: "gamer2.png",
    unlock: function() {return window.game.buildings['gamer'].amount >= 25}, //return true if conditions to show upgrade is true
    cost: function(lbs) {return lbs >= 2750}, //return true if the user can purchase this upgrade
    onBuy: function() {
        window.game.lootboxes = window.game.lootboxes - 2750;
        window.game.buildings['gamer'].multiplier *= 2;
    }
}

var gamerPower3 = { 
    name: "Almost Epic Gamers",
    desc: "Cost: 6000<br>Double production from gamers<br><i>But not quite epic gamers</i>",
    id: 'gamerPower3',
    icon: "gamer3.png",
    unlock: function() {return window.game.buildings['gamer'].amount >= 50}, //return true if conditions to show upgrade is true
    cost: function(lbs) {return lbs >= 6000}, //return true if the user can purchase this upgrade
    onBuy: function() {
        window.game.lootboxes = window.game.lootboxes - 6000;
        window.game.buildings['gamer'].multiplier *= 2;
    }
}

upgrades.push(gamerPower1, gamerPower2, gamerPower3)

var nolifePower1 = {
    name: "Life Waster",
    desc: "Cost: 2750<br>+5 production from No Lifers",
    id: 'nolifePower1',
    icon: "nolife1.png",
    unlock: function() { return window.game.buildings['nolife'].amount >= 10 },
    cost: function(lbs) {return lbs >= 2750 },
    onBuy: function() {
        window.game.lootboxes -= 2750;
        window.game.buildings['nolife'].persec += 5
    }
}

var nolifePower2 = {
    name: "Life Consumer",
    desc: "Cost: 6000<br>Double production from No Lifers",
    id: 'nolifePower2',
    icon: "nolife2.png",
    unlock: function() { return window.game.buildings['nolife'].amount >= 25 },
    cost: function(lbs) {return lbs >= 6000 },
    onBuy: function() {
        window.game.lootboxes -= 6000;
        window.game.buildings['nolife'].multiplier *= 2
    }
}

var nolifePower3 = {
    name: "Longer Lives",
    desc: "Cost: " + abbrNum(1e4) + "<br>Double production from No Lifers<br><i>Longer Lives, More Production</i>",
    id: 'nolifePower3',
    icon: "nolife3.png",
    unlock: function() { return window.game.buildings['nolife'].amount >= 25 },
    cost: function(lbs) {return lbs >= 1e4 },
    onBuy: function() {
        window.game.lootboxes -= 1e4;
        window.game.buildings['nolife'].multiplier *= 2
    }
}

upgrades.push(nolifePower1, nolifePower2, nolifePower3)

var epicGamerPower1 = {
    name: "True Epic Gamer",
    desc: "Cost: " + abbrNum(8e3) + "<br>+10 production from Epic Gamers",
    id: "epicGamerPower1",
    icon: "egamer1.png",
    unlock: function() { return window.game.buildings['epicgamer'].amount >= 10 },
    cost: function(lbs) {return lbs >= 8e3 },
    onBuy: function() {
        window.game.lootboxes -= 8e3;
        window.game.buildings['epicgamer'].persec += 10;
    }
}

var epicGamerPower2 = {
    name: "Truer Epic Gamer",
    desc: "Cost: " + abbrNum(15e3) + "<br>Double production from Epic Gamers",
    id: "epicGamerPower2",
    icon: "egamer2.png",
    unlock: function() { return window.game.buildings['epicgamer'].amount >= 25 },
    cost: function(lbs) {return lbs >= 15e3 },
    onBuy: function() {
        window.game.lootboxes -= 15e3;
        window.game.buildings['epicgamer'].multiplier *= 2;
    }
}

var epicGamerPower3 = {
    name: "Truest Epic Gamer",
    desc: "Cost: " + abbrNum(32e3) + "<br>Double production from Epic Gamers<br><i>The truest from of all epic gamer</i>",
    id: "epicGamerPower3",
    icon: "egamer3.png",
    unlock: function() { return window.game.buildings['epicgamer'].amount >= 50 },
    cost: function(lbs) {return lbs >= 32e3 },
    onBuy: function() {
        window.game.lootboxes -= 32e3;
        window.game.buildings['epicgamer'].multiplier *= 2;
    }
}

upgrades.push(epicGamerPower1, epicGamerPower2, epicGamerPower3)

var buildingPrice1 = {
    name: "Bob the Builder",
    desc: "Cost: " + abbrNum(5e6) + "<br>Buildings cost 25% less<br><i>Can we fix it? Yes we can!</i><br>This upgrade is subject to removal in the future",
    id: "buildingPrice1",
    icon: "bp1.png",
    unlock: function(){return window.game.totalBuildings >= 123},
    cost: function(lbs){return lbs >= 5e6},
    onBuy: function(){
        window.game.lootboxes = window.game.lootboxes - 5e6;
        window.game.buildingDiscount -= window.game.buildingDiscount * 0.75;
    }
}

var buildingPrice2 = {
    name: "Master Builder",
    desc: "Cost: 25,000,000<br>Buildings cost 25% less<br>This upgrade is subject to removal in the future",
    id: "buildingPrice2",
    icon: "bp2.png",
    unlock: function(){return window.game.totalBuildings >= 350},
    cost: function(lbs){return lbs >= 25e6},
    onBuy: function(){
        window.game.lootboxes = window.game.lootboxes - 25e6;
        window.game.buildingDiscount -= window.game.buildingDiscount * 0.75;
    }
}

var buildingPrice3 = {
    name: "Steve",
    desc: "Cost: 55,200,000<br>Buildings cost 25% less<br>This upgrade is subject to removal in the future",
    id: "buildingPrice3",
    icon: "bp3.png",
    unlock: function(){return window.game.totalBuildings >= 885},
    cost: function(lbs){return lbs >= 552e3},
    onBuy: function(){
        window.game.lootboxes = window.game.lootboxes - 552e3;
        window.game.buildingDiscount -= window.game.buildingDiscount * 0.75;
    }
}

upgrades.push(buildingPrice1);
upgrades.push(buildingPrice2);
upgrades.push(buildingPrice3);

function tickUpgrades() {
    if (int.isLoaded == true) {
        for (var i = 0; i < upgrades.length; i++) {
            tu = upgrades[i];
            if (window.game.upgrades[tu.id] != true) {
                try {
                    var tub = document.getElementById("upgrade-button-" + tu.id)
                    //console.log(tub.style)
                    if (tu.unlock() || int.showingAllUpgrades) {
                        tub.hidden = false;
                        if (tu.cost(window.game.lootboxes)) {
                            tub.style.color = 'lime'
                            tub.innerHTML = 'v'
                        } else {
                            tub.style.color = 'red'
                            tub.innerHTML = 'X'
                        }
                    } else {
                        tub.hidden = true;
                    }
                } catch (error) {
                    console.log(error + ' during tick of ' + tu.id)
                }
            } else {
                var tub = document.getElementById("upgrade-button-" + tu.id)
                tub.hidden = false
                //tub.style.display = 'block'
                //console.log(tub.style)
            }
        }
    }
}

function buyUpgrade(id) {
    console.log('trying to buy upgrade with id ' + id)
    var upgradesCont = document.getElementById('upgrades');
    var upgradesBought = document.getElementById('upgrades-bought');
    for (var upgrade in upgrades) {
        var tu = upgrades[upgrade];
        if (tu.id == id) {
            console.log('found upgrade!')
            console.log('cost function: ' + tu.cost)
            if (tu.cost(window.game.lootboxes) == true) {
                console.log('can afford')
                var button = document.getElementById('upgrade-button-' + id);
                var desc = document.getElementById('upgrade-desc-' + id);
                window.game.upgrades[tu.id] = true;
                window.game.upgradesBought++;
                console.log('moving button')
                upgradesCont.removeChild(button);
                upgradesCont.removeChild(desc);
                upgradesBought.appendChild(button);
                upgradesBought.appendChild(desc);
                //console.log(desc)
                button.onclick = function(){};
                
                tu.onBuy()
            } else {
                var a = document.getElementById('upgrade-button-' + id);
                a.classList.add('upgrade-flash-red');
                a.classList.remove('upgrade-flash-red');
            } break;
        }
    }
}

function loadUpgrades() {
    var upgradeContainer = document.getElementById('upgrades');
    var upgradesBought = document.getElementById('upgrades-bought');
    for (var upgrade in upgrades) {
        //console.log('loading upgrade ' + upgrades[upgrade].id)
        var tu = upgrades[upgrade];
        var upgradeButton = document.createElement('button');
        var upgradeDesc = document.createElement('div');
        upgradeDesc.setAttribute('class', 'upgrade-desc');
        upgradeDesc.setAttribute('id', 'upgrade-desc-' + tu.id);
        upgradeDesc.innerHTML = tu.name + '<br>' + tu.desc;
        upgradeButton.setAttribute("id", "upgrade-button-" + tu.id);
        upgradeButton.setAttribute('class', 'upgrade');
        //console.log(window.game.upgrades[tu.id])
        if (window.game.upgrades[tu.id] == true) {
            //console.log('loaded upgrade ' + tu.id + ' as already bought')
            upgradeButton.onclick = function(){console.log('already purchased!')};
            upgradesBought.appendChild(upgradeButton);
            upgradesBought.appendChild(upgradeDesc);
        } else {
            //console.log('loaded upgrade ' + tu.id + ' as unpurchased')
            //console.log('loaded ' + tu.id + ' button function')
            //upgradeButton.onclick = function(){buyUpgrade()};
            var tf = new Function('buyUpgrade("' + tu.id + '")')
            upgradeButton.onclick = tf;
            //console.log(upgradeButton.onclick)
            window.game.upgrades[tu.id] = false;
            upgradeButton.hidden = true;
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