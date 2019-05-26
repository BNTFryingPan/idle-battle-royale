//contains functions that control ui, like tabs in the middle bar

var onlineTab;
var cheatsTab;
var lootboxDisplay;
var lootboxPerSecDisplay;
var lootboxTotalDisplay;

function cacheElements() {
    onlineTab            = document.getElementById('mb-online-tab');
    cheatsTab            = document.getElementById('mb-cheats-tab');
    lootboxPerSecDisplay = document.getElementById('lbps-display');
    lootboxTotalDisplay  = document.getElementById('total-lootbox-display');
    lootboxDisplay       = document.getElementById('lootbox-display');
}

function mbSwitchToOnline() {
    cheatsTab.hidden = true;
    onlineTab.hidden = false;
}

function mbSwitchToCheats() {
    cheatsTab.hidden = false;
    onlineTab.hidden = true;
}