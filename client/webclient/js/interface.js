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
    statsTab             = document.getElementById('mb-stats-tab');
    legacyTab            = document.getElementById('mb-legacy-tab');
    optionsTab           = document.getElementById('mb-options-tab');
    changelogTab         = document.getElementById('mb-changelog-tab');
    lootboxPerSecDisplay = document.getElementById('lbps-display');
    lootboxTotalDisplay  = document.getElementById('total-lootbox-display');
    lootboxDisplay       = document.getElementById('lootbox-display');
}

function optionstabUpdateNumberFormat() {
    var newFormat = document.getElementById('option-numformat').value;
    window.game.options.shortNumbers = newFormat;
}

//tabs
function mbSwitchToOnline() {
    cheatsTab.hidden = true;
    onlineTab.hidden = false;
    achievementsTab.hidden = true;
    statsTab.hidden = true;
    legacyTab.hidden = true;
    optionsTab.hidden = true;
    changelogTab.hidden = true;
}

function mbSwitchToCheats() {
    cheatsTab.hidden = false;
    onlineTab.hidden = true;
    achievementsTab.hidden = true;
    statsTab.hidden = true;
    legacyTab.hidden = true;
    optionsTab.hidden = true;
    changelogTab.hidden = true;
}

function mbSwitchToAchievements() {
    cheatsTab.hidden = true;
    onlineTab.hidden = true;
    achievementsTab.hidden = false;
    statsTab.hidden = true;
    legacyTab.hidden = true;
    changelogTab.hidden = true;
    optionsTab.hidden = true;
}

function mbSwitchToStats() {
    cheatsTab.hidden = true;
    onlineTab.hidden = true;
    achievementsTab.hidden = true;
    statsTab.hidden = false;
    legacyTab.hidden = true;
    changelogTab.hidden = true;
    optionsTab.hidden = true;
}

function mbSwitchToOptions() {
    cheatsTab.hidden = true;
    onlineTab.hidden = true;
    achievementsTab.hidden = true;
    statsTab.hidden = true;
    legacyTab.hidden = true;
    changelogTab.hidden = true;
    optionsTab.hidden = false;
}

function mbSwitchToLegacy() {
    cheatsTab.hidden = true;
    onlineTab.hidden = true;
    achievementsTab.hidden = true;
    statsTab.hidden = true;
    legacyTab.hidden = false;
    changelogTab.hidden = true;
    optionsTab.hidden = true;
}

function mbSwitchToChangelog() {
    cheatsTab.hidden = true;
    onlineTab.hidden = true;
    achievementsTab.hidden = true;
    statsTab.hidden = true;
    legacyTab.hidden = true;
    changelogTab.hidden = false;
    optionsTab.hidden = true;
}