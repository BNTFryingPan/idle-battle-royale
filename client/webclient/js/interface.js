//contains functions that control ui, like tabs in the middle bar

var onlineTab;
var cheatsTab;
var achTab;
var statsTab;
var lootboxDisplay;
var lootboxPerSecDisplay;
var lootboxTotalDisplay;

function cacheElements() {
    onlineTab            = document.getElementById('mb-online-tab');
    cheatsTab            = document.getElementById('mb-cheats-tab');
    achievementsTab      = document.getElementById('mb-ach-tab');
    statsTab             = document.getElementById('mb-stats-tab')
    lootboxPerSecDisplay = document.getElementById('lbps-display');
    lootboxTotalDisplay  = document.getElementById('total-lootbox-display');
    lootboxDisplay       = document.getElementById('lootbox-display');
}


//tabs
function mbSwitchToOnline() {
    cheatsTab.hidden = true;
    onlineTab.hidden = false;
    achievementsTabTab.hidden = true;
    statsTab.hidden = true;
}

function mbSwitchToCheats() {
    cheatsTab.hidden = false;
    onlineTab.hidden = true;
    achievementsTab.hidden = true;
    statsTab.hidden = true;
}

function mbSwitchToAchievements() {
    cheatsTab.hidden = true;
    onlineTab.hidden = true;
    achievementsTab.hidden = false;
    statsTab.hidden = true;
}

function mbSwitchToStats() {
    cheatsTab.hidden = true;
    onlineTab.hidden = true;
    achievementsTab.hidden = true;
    statsTab.hidden = false;
}