// i have to say, this was a great idea
// having ascendance be battle pass level, and transcendance being battle pass season
// this doesnt work btw. at all. dont even try

// unless you make a fork on github and make a pr
// then you can try

// try to make it actually work that is

function calcPrestigeLevel() {

}

function calcLBForNextPrestigeLevel() {
    
}

function calcPrestige() {
    var totalPrestigeLevels = Math.floor(Math.cbrt( (window.game.totalLootboxes) / (10 ** 10) ));
    return totalPrestigeLevels;
}

function calcLbsNextPrestigeLevel() {
    var currPresAfterReset = calcPrestige()
    var lbForNextPresLevel = ( 10 ** 10 ) * ( ( ( currPresAfterReset + 1 ) ** 3 ) - currPresAfterReset ** 3)
    return lbForNextPresLevel
}

function prestige() {
    window.prestige = calcPrestige()
    window.game.lootboxes = 0;
    window.game.buildings = buildings;
    window.game.lootboxesPerSecond = 0;
    window.game.lootboxesPerClick = 1;

    //window.game.buildingDiscount = 1 * (
}

function prestigeButton() {
    //if (window.game.lootboxes > 1000000000000) {
    //    prestige();
    //}
    alert('no u');
}