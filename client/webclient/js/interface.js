//contains functions that control ui, like tabs in the middle bar

var onlineTab;
var cheatsTab;
var achTab;
var lootboxDisplay;
var lootboxPerSecDisplay;
var lootboxTotalDisplay;

function cacheElements() {
    onlineTab            = document.getElementById('mb-online-tab');
    cheatsTab            = document.getElementById('mb-cheats-tab');
    achTab               = document.getElementById('mb-ach-tab')
    lootboxPerSecDisplay = document.getElementById('lbps-display');
    lootboxTotalDisplay  = document.getElementById('total-lootbox-display');
    lootboxDisplay       = document.getElementById('lootbox-display');
}


//tabs
function mbSwitchToOnline() {
    cheatsTab.hidden = true;
    onlineTab.hidden = false;
    achTab.hidden = true;
}

function mbSwitchToCheats() {
    cheatsTab.hidden = false;
    onlineTab.hidden = true;
    achTab.hidden = true;
}

function mbSwitchToAch() {
    cheatsTab.hidden = true;
    onlineTab.hidden = true;
    achTab.hidden = false;
}