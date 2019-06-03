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

function changeSplash() {
    splashes = ['Not made in China!',
        'Also try <a href="http://orteil.dashnet.org/cookieclicker">Cookie Clicker</a>',
        'Also try <a href="http://clickerheroes.com">Clicker Heroes</a>',
        "Don't play Fortnite",
        'Made in the USA',
        '<sub>G</sub><sup>A</sup><sub>M</sub><sup>E</sup> <sub>O</sub><sup>V</sup><sub>E</sub><sup>R</sup>',
        '<sub>O</sub><sup>G</sup><sub>V</sub><sup>A</sup><sub>E</sub><sup>M</sup><sub>R</sub><sup>E</sup>',
        'Not on Steam! (yet...)',
        'Also try <a href="http://www.filltheoceans.com/">Fill the Oceans</a>',
        'Village and Pillage',
        'Minceraft',
        'Have a hug!'
        ];
    var newSplash = splashes[parseInt(Math.random() * splashes.length)];
    var splashElement = document.getElementById('header-splash');

    splashElement.innerHTML = "<sup style='color: #232233'>.</sup>" + newSplash + "<sub style='color: #232233'>.</sub>";
}

function hideAllTabs () {
    cheatsTab.setAttribute('class', 'container');
    cheatsButton.disabled = false;
    onlineTab.setAttribute('class', 'container');
    onlineButton.disabled = false;
    achievementsTab.setAttribute('class', 'container');
    achievementsButton.disabled = false;
    statsTab.setAttribute('class', 'container');
    statsButton.disabled = false;
    legacyTab.setAttribute('class', 'container');
    legacyButton.disabled = false;
    optionsTab.setAttribute('class', 'container');
    optionsButton.disabled = false;
    changelogTab.setAttribute('class', 'container');
    changelogButton.disabled = false;
    chatTab.setAttribute('class', 'container');
    chatButton.disabled = false;
}

function optionstabUpdateNumberFormat() {
    var newFormat = document.getElementById('option-numformat').value;
    window.game.options['shortNumbers'] = newFormat;
}

//tabs
function mbSwitchToOnline() {
    hideAllTabs();
    onlineTab.setAttribute('class', 'container selected');
    onlineButton.disabled = true;
}

function mbSwitchToCheats() {
    hideAllTabs();
    cheatsTab.setAttribute('class', 'container selected');
    cheatsButton.disabled = true;
}

function mbSwitchToAchievements() {
    hideAllTabs();
    achievementsTab.setAttribute('class', 'container selected');
    achievementsButton.disabled = true;
}

function mbSwitchToStats() {
    hideAllTabs();
    statsTab.setAttribute('class', 'container selected');
    statsButton.disabled = true;
}

function mbSwitchToOptions() {
    hideAllTabs();
    optionsTab.setAttribute('class', 'container selected');
    optionsButton.disabled = true;
}

function mbSwitchToLegacy() {
    hideAllTabs();
    legacyTab.setAttribute('class', 'container selected');
    legacyButton.disabled = true;
}

function mbSwitchToChangelog() {
    hideAllTabs();
    changelogTab.setAttribute('class', 'container selected');
    changelogButton.disabled = true;
}

function mbSwitchToChat() {
    hideAllTabs();
    chatTab.setAttribute('class', 'container selected');
    chatButton.disabled = true;
}