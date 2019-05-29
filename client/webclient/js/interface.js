//contains functions that control ui, like tabs in the middle bar

function cacheElements() {
    onlineTab            = document.getElementById('mb-online-tab');
    onlineButton         = document.getElementById('mb-online-button');
    cheatsTab            = document.getElementById('mb-cheats-tab');
    cheatsButton         = document.getElementById('mb-cheats-button');
    achievementsTab      = document.getElementById('mb-ach-tab');
    achievementsButton   = document.getElementById('mb-ach-button');
    statsTab             = document.getElementById('mb-stats-tab');
    statsButton          = document.getElementById('mb-stats-button');
    legacyTab            = document.getElementById('mb-legacy-tab');
    legacyButton         = document.getElementById('mb-legacy-button');
    optionsTab           = document.getElementById('mb-options-tab');
    optionsButton        = document.getElementById('mb-options-button');
    changelogTab         = document.getElementById('mb-changelog-tab');
    changelogButton      = document.getElementById('mb-changelog-button');
    chatTab              = document.getElementById('mb-chat-tab');
    chatButton           = document.getElementById('mb-chat-button');
    lootboxPerSecDisplay = document.getElementById('lbps-display');
    lootboxTotalDisplay  = document.getElementById('total-lootbox-display');
    lootboxDisplay       = document.getElementById('lootbox-display');
}

function hideAllTabs () {
    cheatsTab.hidden = true;
    cheatsButton.disabled = false;
    onlineTab.hidden = true;
    onlineButton.disabled = false;
    achievementsTab.hidden = true;
    achievementsButton.disabled = false;
    statsTab.hidden = true;
    statsButton.disabled = false;
    legacyTab.hidden = true;
    legacyButton.disabled = false;
    optionsTab.hidden = true;
    optionsButton.disabled = false;
    changelogTab.hidden = true;
    changelogButton.disabled = false;
    chatTab.hidden = true;
    chatButton.disabled = false;
}

function optionstabUpdateNumberFormat() {
    var newFormat = document.getElementById('option-numformat').value;
    window.game.options['shortNumbers'] = newFormat;
}

//tabs
function mbSwitchToOnline() {
    hideAllTabs();
    onlineTab.hidden = false;
    onlineButton.disabled = true;
}

function mbSwitchToCheats() {
    hideAllTabs();
    cheatsTab.hidden = false;
    cheatsButton.disabled = true;
}

function mbSwitchToAchievements() {
    hideAllTabs();
    achievementsTab.hidden = false;
    achievementsButton.disabled = true;
}

function mbSwitchToStats() {
    hideAllTabs();
    statsTab.hidden = false;
    statsButton.disabled = true;
}

function mbSwitchToOptions() {
    hideAllTabs();
    optionsTab.hidden = false;
    optionsButton.disabled = true;
}

function mbSwitchToLegacy() {
    hideAllTabs();
    legacyTab.hidden = false;
    legacyButton.disabled = true;
}

function mbSwitchToChangelog() {
    hideAllTabs();
    changelogTab.hidden = false;
    changelogButton.disabled = true;
}

function mbSwitchToChat() {
    hideAllTabs();
    chatTab.hidden = false;
    chatButton.disabled = true;
}