var upgrades = [];

var baseUpgrade = { 
    name: "Upgrade Name", // the display name of the upgrade that is displayed to the user
    desc: "Cost: [cost]<br>Description of effect[<br><i>lore</i>]", // the content of the description box of the upgrade
    id: 'upgradeId', // the id of the upgrade. do not duplicate this with another. [best done with namespaces, vanilla will use ibr:]
    icon: 'upgradeIconID.png', // icon for repeat or teir upgrades, and false state for toggle upgrades
    icon2: null, // the icont for the true state of a toggle upgrade
    toggleCount: 0, // amount of times a repeatable or toggle upgrade was used
    startState: false, // in a teir upgrade, icon2, toggleCount, startState, and currentState are ignored, and dont need to be included
                        // start state sets the starting state (for example, if you wanted a toggle to turn an event off, you could start on true as the event is active, or you could enable an event by starting false)
    currentState: false, // in a toggle upgrade, the state currently
    type: "teir", //upgrades without the type flag default to teir
    //types:
    // teir - a teired upgrade that upgrades something
    // toggle - an upgrade that acts as a toggle, will save toggle count, and current state (true/false), and can be set to start on true or false
    // toggle upgrades can have a second icon, the first icon (icon) is the false state, and the second (icon2) is the true state
    // repeatable - an upgrade than can be bought multiple times. saves purchase count, which can be used to multiply the price however you wish
    // please note that currently only teir has been actually implemented, so the others dont actually have functionality yet
    unlock: function() {return false}, //return true if conditions to show upgrade is true
    cost: function(lbs) {return false}, //return true if the user can purchase this upgrade with the given lbs
    onBuy: function() {
        return; //you dont need to return anything, just put the effect of the purchasing the upgrade here
        //note that the game will check this.cost() every tick, so dont actually take from lootboxes in cost.
        //you should remove lootboxes here, in onBuy();
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
    desc: "Cost: " + abbrNum(1e4, 'short') + "<br>Double production from No Lifers<br><i>Longer Lives, More Production</i>",
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
    desc: "Cost: " + abbrNum(8e3, 'short') + "<br>+10 production from Epic Gamers",
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
    desc: "Cost: " + abbrNum(15e3, 'short') + "<br>Double production from Epic Gamers",
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
    desc: "Cost: " + abbrNum(32e3, 'short') + "<br>Double production from Epic Gamers<br><i>The truest from of all epic gamer</i>",
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

var speedrunnerPower1 = {
    name: "Speed Tech",
    desc: "Cost: " + abbrNum(30e3, 'short') + "<br>+200 production from Speedrunners<br><i>Speedrunners, although competitive, still do work together to find faster routes</i>",
    id: "speedrunnerPower1",
    icon: 'speedr1.png',
    unlock: function() { return window.game.buildings['speedrunner'].amount >= 10 },
    cost: function(lbs) { return lbs >= 30e3 },
    onBuy: function() {
        window.game.lootboxes -= 30e3;
        window.game.buildings['speedrunner'].persec += 200;
    }
}

var speedrunnerPower2 = {
    name: "Micro Optimization",
    desc: "Cost: " + abbrNum(64e3, 'short') + "<br>Double production from Speedrunners<br><i>Sometimes pusing the WR down by a few seconds makes beating it much harder</i>",
    id: "speedrunnerPower2",
    icon: "speedr2.png",
    unlock: function() {return window.game.buildings['speedrunner'].amount >= 25},
    cost: function(lbs) {return lbs >= 64e3},
    onBuy: function() {
        window.game.lootboxes -= 64e3;
        window.game.buildings['speedrunner'].multiplier *= 2;
    }
}

var speedrunnerPower3 = {
    name: "GDQ Appearence",
    desc: "Cost: " + abbrNum(32e4, 'short') + "<br>Double production from Speedrunners<br><i>GDQ is a large speedrunning event 2 times a year, and is very popular</i>",
    id: "speedrunnerPower3",
    icon: "speedr3.png",
    unlock: function() {return window.game.buildings['speedrunner'].amount >= 50},
    cost: function(lbs) {return lbs >= 32e4},
    onBuy: function() {
        //grantAchivement(appear on gdq) // achs not implemented yet!
        window.game.lootboxes -= 32e4;
        window.game.buildings['speedrunner'].multiplier *= 2;
    }
}

upgrades.push(speedrunnerPower1, speedrunnerPower2, speedrunnerPower3)

var buildingPrice1 = {
    name: "Bob the Builder",
    desc: "Cost: " + abbrNum(5e6, 'short') + "<br>Buildings cost 25% less<br><i>Can we fix it? Yes we can!</i><br>This upgrade is subject to removal in the future",
    id: "buildingPrice1",
    icon: "bp1.png",
    unlock: function(){return window.game.totalBuildings >= 123},
    cost: function(lbs){return lbs >= 5e6},
    onBuy: function(){
        window.game.lootboxes = window.game.lootboxes - 5e6;
        window.game.buildingDiscount *= 0.75;
    }
}

var buildingPrice2 = {
    name: "Master Builder",
    desc: "Cost: " + abbrNum(25e6, 'short') + "<br>Buildings cost 25% less<br>This upgrade is subject to removal in the future",
    id: "buildingPrice2",
    icon: "bp2.png",
    unlock: function(){return window.game.totalBuildings >= 350},
    cost: function(lbs){return lbs >= 25e6},
    onBuy: function(){
        window.game.lootboxes = window.game.lootboxes - 25e6;
        window.game.buildingDiscount *= 0.75;
    }
}

var buildingPrice3 = {
    name: "Steve",
    desc: "Cost: " + abbrNum(55.2e6, 'short') + "<br>Buildings cost 25% less<br>This upgrade is subject to removal in the future",
    id: "buildingPrice3",
    icon: "bp3.png",
    unlock: function(){return window.game.totalBuildings >= 885},
    cost: function(lbs){return lbs >= 552e3},
    onBuy: function(){
        window.game.lootboxes = window.game.lootboxes - 552e3;
        window.game.buildingDiscount *= 0.75;
    }
}

upgrades.push(buildingPrice1);
upgrades.push(buildingPrice2);
upgrades.push(buildingPrice3);

var noob_momsCard = {
    name: "Mom's Credit Card",
    desc: "Cost: " + abbrNum(1e10, 'short') + "<br>The noobs will steal their parents credit card and buy 1000 times more lootboxes",
    id: "noob_momsCard",
    icon: "n_card.png",
    unlock: function(){return window.game.lootboxesPerSecond >= 1e10},
    cost: function(lbs){return lbs >= 5e10},
    onBuy: function(){
        window.game.lootboxes = window.game.lootboxes - 5e10;
        window.game.buildings['noob'].persec *= 1000
    }
}

upgrades.push(noob_momsCard)