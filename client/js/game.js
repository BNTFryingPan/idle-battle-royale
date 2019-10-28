function internal() {
    //internal data that we dont want to save for any reason
    this.buildNumber = 75;
    this.gameVersionString = "Alpha dev-0.5.4.1";
    this.isLoaded = false;
    this.saveTick = 0;
    this.splashTick = 250;
    this.fastSplashTick = 0;
    this.isLoadedTimer = 0;
    this.fastSplash = false;
    this.showingAllUpgrades = false;
    this.saveDisplay = false;
    this.saveDisplayTick = 0;
    this.updateAvailable = false;
    this.disableMainGame = false;
    this.changelogOnly = false;
    this.isChatPopout = false;
    this.firstSupportedBuildNumber = 68;
    this.hideExpensiveUpgrades = false;
    this.disableSelectOptions = false;
    this.notifCount = 0;
    this.useCustomTheme = false;
    this.bonusMultiplier = 1;
    this.bonusDuration = 0;
    this.splashRotation = 0;
    this.splashRotateDirection = 1;
}

var int = new internal()

// gamesave
function gameSave() {
    this.lootboxes = 0;
    this.totalLootboxes = 0;
    this.lootboxesPerClickAdditive = 1;
    this.lootboxesPerClickMultiplier = 1;
    this.lootboxesPerClickCPS = 0;
    this.lootboxesPerSecond = 0;
    this.totalMultiplier = 1;
    this.buildingDiscount = 1;
    this.buildings = {};
    this.options = {'shortNumbers': 'short', 'tab': 'stats', 'saveInterval': 3000, "uiRefreshRate":100, 'autoCloseNotifs':true, 'theme':'classic', 'disableKb':false};
    this.sellMultiplier = 0.5
    this.upgrades = {};
    //this.acheivementsUnlocked = {};
    this.gameVersionString = int.gameVersionString;
    this.buildNumber = int.buildNumber;
    this.totalLootboxClicks = 0;
    this.totalLootboxesFromClicks = 0;
    this.prestige = 0;
    Object.assign(this.buildings, buildings);
}

function loadGame() {
    window.game = loadSaveFromLocalStorage('SaveName')
    var verdisplay = int.gameVersionString;
    if (int.gameVersionString != window.game.gameVersionString) {
        verdisplay += " (" + window.game.gameVersionString + ")"
    }
    verdisplay += " - <i>[" + int.buildNumber;
    if (int.buildNumber != window.game.buildNumber) {
        verdisplay += " (" + window.game.buildNumber + ")";
    }
    verdisplay += "]</i>"
    
    //var verdisplay = int.gameVersionString + " (" + window.game.gameVersionString + ") - <i>[" + int.buildNumber + " (" + window.game.buildNumber + ")]</i>";
    if (window.game.buildNumber < int.gameVersionNumber) {
        int.updateAvailable = true;
        verdisplay += "<b>Update Available!</b>"
        notify("Update!", "Hey! Theres cool new stuff if you reset your save!")
    }
    document.getElementById('version-display').innerHTML = verdisplay
}

function updateLBPS() {
    var totalLBPS = 0;
    for (var build in window.game.buildings) {
        var tb = window.game.buildings[build];
        tb.totalPerSec = ( tb.persec * tb.multiplier ) * tb.amount ;
        totalLBPS = totalLBPS + tb.totalPerSec;
    }
    totalLBPS = totalLBPS * window.game.totalMultiplier;
    document.getElementById("lbps-display").innerHTML = "LBPS: " + abbrNum(totalLBPS);
    window.game.lootboxesPerSecond = totalLBPS;
    return totalLBPS
}

window.onload = function() {
    //window.game = new gameSave();
    console.log('Loading game...');
    loadUrlSettings();
    if (int.disableMainGame != true) {
        cacheElements();
        chatCacheElements();
        loadBuildings();
        loadGame();
        loadUpgrades();
        loadAchievements()
        cheatUI();
        //loadUpdateBuildings();
        populateChangelogTab();
        loadChatInputEnterThing();
        loadChatInputEnterThingForCheats();

        if (!int.disableSelectOptions) {
            document.getElementById('option-numformat').value = window.game.options['shortNumbers'];
            document.getElementById('option-saveint').value = window.game.options['saveInterval'].toString();
            document.getElementById('option-uirate').value = window.game.options['uiRefreshRate'].toString();
            document.getElementById('option-timeoutnotifs').checked = window.game.options['autoCloseNotifs'];
            loadThemeSelector();
            loadThemeFromSave();
            int.uiUpdateRate = window.game.options['uiRefreshRate'];
        }
    }
    changeSplash();
    int.isLoaded = true;
    //finalizeUrlSettings();
    if (int.disableMainGame == true) {
        var verdisplay = int.gameVersionString + " - <i>[" + int.buildNumber + "]</i>";
        if (int.updateAvailable) {
            verdisplay += "<b>Update Available!</b>"
        }
        document.getElementById('version-display').innerHTML = verdisplay
    }

    if (int.changelogOnly == true) {
        document.getElementById('client').innerHTML = changelogContent()
        document.getElementById('client').classList.add('changelogonly')
    }

    if (int.isChatPopout == true) {
        loadChatPopout()
    }
    console.log('Game loaded')

    if (int.disableMainGame != true) {
        Ticker = window.setInterval(function(){tick()}, 10);
        DisplayCycle = window.setInterval(function(){saveDisplayCycle()}, 50);
        UpdateUILoop = window.setInterval(function(){updateUI();}, window.game.options['uiRefreshRate'])
    }
    SplashCycle = window.setInterval(function(){splashCycleFunction()}, 160);
}

// funtions
function loadUrlSettings() {
    // open tab
    var openTab = getUrlParam("tab", "stats");
    cacheTabElements();
    document.getElementById("mb-" + openTab + "-tab").click()

    // settings
    var urlSettings = getUrlParam("opt", "null");
    urlSettings = urlSettings.split(',')

    // mod loader
    var mod = getUrlParam('mods', "null");
    mod = mod.split(',')

    var chatPopout = getUrlParam("chatpopout", '0')
    if (chatPopout == "1") {
        int.isChatPopout = true;
        disableMainGameFunc();
    }

    var fullChangelog = getUrlParam("fcl", "0");
    if (fullChangelog == "true" || fullChangelog == "1") {
        int.changelogOnly = true;
        disableMainGameFunc();
    }
    
    var wallpaperEngine = getUrlParam("wpe", "0");
    if (wallpaperEngine == "1" || wallpaperEngine == "true") {
        document.getElementById('header').style.display = 'none';
        document.getElementById('header-splash').style.display = 'none';
        document.getElementById('mb-chat-tab').style.display = 'none';
        document.getElementById('mb-cheats-tab').style.display = 'none';
        document.getElementById('mb-online-tab').innerHTML = "<span style='text-align: center; opacity: 1'>Online disabled in Wallpaper Engine</span>";
        document.getElementById('mb-online-tab').style.height = "1.5em"
        document.getElementById('options-area').innerHTML = "Options in WPE coming soon (they dont work!)"
        int.disableSelectOptions = true;
        var foot = document.getElementById('footer')
        foot.innerHTML = "<b>-= </b>Idle Battle Royale Client<b> =-= </b>Wallpaper Engine<b> =</b>" + foot.innerHTML
    }
    //console.log(urlSettings)
}

function disableMainGameFunc() {
    int.disableMainGame = true
    hideGame()
    //document.getElementById('save-area').innerHTML = 'Chat Popout';
}

function clickLootbox() {
    var lootboxesFromClick = (window.game.lootboxesPerClickAdditive * window.game.lootboxesPerClickMultiplier) + (window.game.lootboxesPerSecond * window.game.lootboxesPerClickCPS)
    window.game.lootboxesPerClickFinal = lootboxesFromClick;
    earnLootboxes(window.game.lootboxesPerClickFinal);
    window.game.totalLootboxClicks++;
    window.game.totalLootboxesFromClicks += lootboxesFromClick;
}

function earnLootboxes(amount, exludeMultiplier=false) {
    if (exludeMultiplier == false) {
        window.game.totalLootboxes += amount * window.game.totalMultiplier;
        window.game.lootboxes += amount * window.game.totalMultiplier;
    } else {
        window.game.totalLootboxes += amount;
        window.game.lootboxes += amount;
    }
}

function tick() {
    if (int.isLoaded == true && int.disableMainGame != true) {
        earnLootboxes(window.game.lootboxesPerSecond/100, true);

        if (window.game.totalLootboxes<window.game.lootboxes && !window.game.hasCheated) {
            window.game.hasCheated = true;
            window.game.totalLootboxes = window.game.lootboxes;
            notify("Cheater!", "You have cheated! You will no longer be able to get online bonuses.")
        }
        tickUpgrades();
        if (int.saveTick >= window.game.options['saveInterval']) {
            saveGame();
            int.saveTick = 0;
        } else {
            int.saveTick++;
        }
    } else {
        if (int.disableMainGame != true) {
            int.isLoadedTimer++;
            if (int.isLoadedTimer >= 500) {
                notify("Loading...", "The game appears to be loading slowly. Try refreshing the page");
                int.isLoadedTimer = 0;
            }
        }
    }
}

function splashCycleFunction() {
    var splashElement = document.getElementById('header-splash');
    int.splashRotation += int.splashRotateDirection;
    if (int.splashRotation >= 7) {
        int.splashRotateDirection = -1;
    } else if (int.splashRotation <= -14) {
        int.splashRotateDirection = 1;
    }
    //console.log('setting splash rotation to ' + int.splashRotation)
    splashElement.style.transform = "rotate(" + int.splashRotation + "deg)"
    if (int.fastSplash == true) {
        int.splashTick = 0;
        int.fastSplashTick++;
        if (int.fastSplashTick == 1) {
            splashElement.classList.add('changing');
        } else if (int.fastSplashTick >= 3) {
            changeSplash();
            splashElement.classList.remove('changing');
            int.fastSplash = false;
            int.fastSplashTick = 0;
            int.splashTick = 0;
        }
    } else {
        int.splashTick++;
        if (int.splashTick == 300) {
            splashElement.classList.add('changing');
        } else if (int.splashTick == 305) {
            changeSplash()
            splashElement.classList.remove('changing');
            int.splashTick = 0;
        }
    }

}

function saveDisplayCycle() {
    if (int.saveDisplay) {
        int.saveDisplayTick++;
        if (int.saveDisplayTick >= 10) {
            var a = document.getElementById('save-indicator');
            a.classList.remove('game-saved')
            int.saveDisplay = false;
            int.saveDisplayTick = 0;
        }
    } else {
        int.saveDisplayTick = 0;
    }
}

function splashClick() {
    int.fastSplash = true;
}

function updateUI() {
    //updateUnlocks();
    if (int.isLoaded && !int.disableMainGame) {
        document.getElementById('lootbox-display').innerHTML = "Lootboxes: " + abbrNum(Math.round(window.game.lootboxes));
        document.getElementById('total-lootbox-display').innerHTML = "Total Lootboxes: " + abbrNum(Math.ceil(window.game.totalLootboxes));
    }
    document.getElementById('notif-count').innerHTML = int.notifCount;
    updateBuildings();
    updateLBPS();
    document.getElementById('total-building-display').innerHTML = "Total Buildings: " + abbrNum(window.game.totalBuildings);
    document.getElementById('lbpc-display').innerHTML = "Lootboxes per Click: " + abbrNum(Math.round(window.game.lootboxesPerClickFinal));
    document.getElementById('total-clicks-display').innerHTML = "Total Lootbox Clicks: " + window.game.totalLootboxClicks;
    document.getElementById('lb-from-clicks').innerHTML = "Total Lootboxes from Clicks: " + abbrNum(Math.round(window.game.totalLootboxesFromClicks));
    //document.getElementById('prestige-current').innerHTML = window.game.prestige;
    //document.getElementById('prestige-next-lvl').innerHTML = abbrNum(Math.ceil(calcLbsNextPrestigeLevel() - window.game.totalLootboxes));
   // document.getElementById('prestige-amnt-now').innerHTML = abbrNum(calcPrestige());
}

// Cheats
// Used for debugging and testing

function resetAll() {
    var confirmResponse = confirm("Are you sure you want to reset your save? You will lose ALL progress. This is NOT prestiging, you will unlock that later in the game.")
    if (confirmResponse) {
        resetSaveFile()
    } else {
        notify("Reset", "Reset canceled. Nothing Changed")
    }
}

function confirmCheat() {
    if (window.game.hasCheated == true) { return true } else {
        var confCheat = confirm("Are you sure you want to cheat? You will not be asked again. Cheating can ruin the fun, and will remove you from getting online bonuses.");
    } if (confCheat == true) { window.game.hasCheated = true;cheatUI();return true } else { return false }
}

function unlockAllUpgrades() {
    if (confirmCheat() == true) {
        if ( int.showingAllUpgrades == true ) {
            int.showingAllUpgrades = false;
        } else {
            int.showingAllUpgrades = true;
        }
    }
}

function cheatUI() {
    if (window.game.hasCheated == true) {
        document.getElementById('header-text').innerHTML = "Idle Battle Royale Client <b>CHEATER!!!!!</b>"
        document.getElementById('header-splash').classList.add('cheater')
    } 
}
