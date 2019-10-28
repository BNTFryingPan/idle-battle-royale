// copied and pasted stuff from the internet to help save and load
function lzw_encode(s) {var dict = {};var data = (s + "").split("");var out = [];var currChar;var phrase = data[0];var code = 256;for (var i=1; i<data.length; i++) {currChar=data[i];if (dict['_' + phrase + currChar] != null) {phrase += currChar;} else {out.push(phrase.length > 1 ? dict['_'+phrase] : phrase.charCodeAt(0)); dict['_' + phrase + currChar] = code; code++; phrase=currChar;}}out.push(phrase.length > 1 ? dict['_'+phrase] : phrase.charCodeAt(0));for (var i=0; i<out.length; i++) {out[i] = String.fromCharCode(out[i]);}return out.join("");}
function lzw_decode(s) {var dict = {};var data = (s + "").split("");var currChar = data[0];var oldPhrase = currChar;var out = [currChar];var code = 256;var phrase;for (var i=1; i<data.length; i++) {var currCode = data[i].charCodeAt(0);if (currCode < 256) {phrase = data[i];} else {phrase = dict['_'+currCode] ? dict['_'+currCode] : (oldPhrase + currChar);}out.push(phrase);currChar = phrase.charAt(0);dict['_'+code] = oldPhrase + currChar;code++;oldPhrase = phrase;}return out.join("");}
function encode_utf8(s) {return unescape(encodeURIComponent(s));}
function decode_utf8(s) {return decodeURIComponent(escape(s));}
function abbrNum(number, notation="opt") { 
    if (notation == "opt") { notation = window.game.options['shortNumbers']
    } else if (!notation in ['short', 'long', 'sci', 'raw']) {
        console.warn('WARNING: Invalid use of abbrNum(), valid arg2 options are [opt, short, long, sci, raw], not ' + notation + '. Reverting to default of short')
        notation = window.game.options['shortNumbers']
    }
    decPlaces = 3; decPlaces = Math.pow(10,decPlaces);
    number = parseFloat(number.toFixed(2))
    //this little bit of code was taken from main.js of cookie clicker 2.019 and slightly modified
    var longShort = [' thousand', ' million', ' billion', ' trillion', ' quadrillion', ' quintillion', ' sextillion', ' septillion', ' octillion', ' nonillion'];
    var longPrefixes = [' ', ' un', ' duo', ' tre', ' qattuor', ' quin', ' sex', ' septen', ' octo', ' novem'];
    var longSuffixes = ['decillion', 'vigintillion', 'trigintillion', 'quadragintillion', 'quinquagintillion', 'sexagintillion', 'septuagintillion', 'octogintillion', 'nonagintillion'];
    var shortShort = ['k', 'm', 'b', 't', 'q', 'Q', 's', 'S', 'o', 'n'];var shortPrefixes = ['', 'u', 'd', 't', 'q', 'Q', 's', 'S', 'o', 'n'];var shortSuffixes = ['d', 'v', 't', 'q', 'Q', 's', 'S', 'o', 'n'];
    // scientific notation part here wasnt from cookie clicker
    var shortSci = []
    for (var i = 3; i <= 304; i+=3) {
        shortSci.push("e+" + i)
    }

    for (var i in longSuffixes ) { for (var ii in longPrefixes ) {longShort.push(' '+longPrefixes[ii]+ longSuffixes[i] ); } } 
    for (var i in shortSuffixes) { for (var ii in shortPrefixes) {shortShort.push(''+shortPrefixes[ii]+shortSuffixes[i]); } } 
    // end code stolen from cookie clicker
    try {
        if (notation == "raw") { return number.toString() }
        if (notation == "long") { var abbrev = longShort; } else if (notation == "short") { var abbrev = shortShort; } else if (notation == "sci") { var abbrev = shortSci; } else { var abbrev = longShort; }
    } catch {
        abbrev = shortShort;
    }
    for (var i=abbrev.length-1; i>=0; i--) {
        var size = Math.pow(10,(i+1)*3);
        if(size <= number) {
            number = Math.round(number*decPlaces/size)/decPlaces;
            if((number == 1000) && (i < abbrev.length - 1)) {
                number = 1;i++;
            }
            number += abbrev[i];
            break;
        }
    }
    return number;
}

function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

function getCurrentTime() {
    var d = new Date();
    var h = addZero(d.getHours());
    var m = addZero(d.getMinutes());
    var s = addZero(d.getSeconds());
    return h + ":" + m + ":" + s;
}

function getUrlVars() { var vars = {}; var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) { vars[key] = value; }); return vars; }
function getUrlParam(parameter, defaultvalue){ var urlparameter = defaultvalue; if(window.location.href.indexOf(parameter) > -1){ urlparameter = getUrlVars()[parameter]; } return urlparameter; }
// end copied and pasted stuff

function internal() {
    //internal data that we dont want to save
    this.buildNumber = 75;
    this.gameVersionString = "Alpha dev-0.5.4.2";
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
    this.lastSaveBreakingBuild = 50;
    this.uiUpdateRate = 100;
    this.hideExpensiveUpgrades = false;
    this.disableSelectOptions = false;
    this.notifCount = 0;
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
    this.options = {'shortNumbers': 'short', 'tab': 'stats', 'saveInterval': 3000, "uiRefreshRate":100, 'autoCloseNotifs':true};
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

function saveGame() {
    savestring = JSON.stringify(window.game);
    savestring = lzw_encode(encode_utf8(savestring));
    window.localStorage['SaveName'] = savestring;
    saveElement = document.getElementById('save-indicator');
    saveElement.classList.add('game-saved');
    int.saveDisplay = true;
}

function putGamesaveInExportBox() {
    box = document.getElementById('export-box');
    box.value = JSON.stringify(window.game);
}

function loadGamesaveFromExportBox() {
    box = document.getElementById('export-box');
    loadGame(box.value)
}

function loadGame(saveString = null) {
    //console.log('loading game')
    newFile = false;
    if (saveString == null) {
        loadstring = window.localStorage.getItem('SaveName');
    } else {
        loadstring = saveString;
    }
    
    //console.log(window.localStorage['SaveName']);
    if (loadstring === null){
        newFile = true;
    }

    if (newFile != true) {
        try {
            loadstring = decode_utf8(lzw_decode(loadstring));
            loadedgame = JSON.parse(loadstring);
        } catch {
            newFile = true
        }
        
    }

    //console.log(newFile)
    if (newFile != true) {
        window.game = new gameSave();
        Object.assign(window.game, loadedgame)
    } else {
        window.game = new gameSave();
        window.game.buildings = buildings;
    }

    var verdisplay = window.game.gameVersionString + " - <i>[" + window.game.buildNumber + "]</i>";
        if (int.updateAvailable) {
            verdisplay += "<b>Update Available!</b>"
        }
        document.getElementById('version-display').innerHTML = verdisplay

    if (window.game.buildNumber < int.gameVersionNumber) {
        int.updateAvailable = true;
        //notify("Update!", "Hey! Theres cool new stuff if you reset your save!")
    }
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
    document.getElementById('save-area').innerHTML = 'Chat Popout';
}

function clickLootbox() {
    window.game.lootboxesPerClickFinal = (window.game.lootboxesPerClickAdditive * window.game.lootboxesPerClickMultiplier) + (window.game.lootboxesPerSecond * window.game.lootboxesPerClickCPS)
    earnLootboxes(window.game.lootboxesPerClickFinal * window.game.totalMultiplier);
    window.game.totalLootboxClicks++;
    window.game.totalLootboxesFromClicks += window.game.lootboxesPerClickFinal;
    //updateUI();
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

        if (window.game.totalLootboxes<window.game.lootboxes) {
            window.game.hasCheated = true;
            window.game.totalLootboxes = window.game.lootboxes;
            //notify("Cheater!", "You have cheated! You will no longer be able to get online bonuses.")
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
                //notify("Loading...", "The game appears to be loading slowly. Try refreshing the page");
                int.isLoadedTimer = 0;
            }
        }
    }
}

function splashCycleFunction() {
    var splashElement = document.getElementById('header-splash');
    splashElement.style.rotate += 1
    if (splashElement.style.rotate >= 50) {
        splashElement.style.rotate = -50
    }
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
    document.getElementById('lootbox-display').innerHTML = "Lootboxes: " + abbrNum(Math.round(window.game.lootboxes));
    document.getElementById('total-lootbox-display').innerHTML = "Total Lootboxes: " + abbrNum(Math.ceil(window.game.totalLootboxes));
    document.getElementById('notif-count').innerHTML = int.notifCount;
    updateBuildings();
    updateLBPS();
    document.getElementById('total-building-display').innerHTML = "Total Buildings: " + abbrNum(window.game.totalBuildings);
    document.getElementById('lbpc-display').innerHTML = "Lootboxes per Click: " + abbrNum(Math.round(window.game.lootboxesPerClickFinal));
    document.getElementById('total-clicks-display').innerHTML = "Total Lootbox Clicks: " + window.game.totalLootboxClicks;
    document.getElementById('lb-from-clicks').innerHTML = "Total Lootboxes from Clicks: " + abbrNum(Math.round(window.game.totalLootboxesFromClicks));
    document.getElementById('prestige-current').innerHTML = window.game.prestige;
    document.getElementById('prestige-next-lvl').innerHTML = abbrNum(Math.ceil(calcLbsNextPrestigeLevel() - window.game.totalLootboxes));
    document.getElementById('prestige-amnt-now').innerHTML = abbrNum(calcPrestige());
    //document.getElementById('building-Player-amount').innerHTML = buildingPlayer.amount.toString();
}

// Cheats
// Used for debugging and testing

function resetAll() {
    confirmResponse = confirm("Are you sure you want to reset your save? You will lose ALL progress. This is NOT prestiging, you will unlock that later in the game.")
    if (confirmResponse) {
        localStorage.removeItem('SaveName');
        loadGame();
        //grantAchievement('resetGame')
        saveGame()
        alert("Your save has been reset. Please refresh the page!")
    } else {
        //notify("Reset", "Reset canceled. Nothing Changed")
    }
}

function addTotalLBs() {
    if (confirmCheat() == true) {
        window.game.totalLootboxes = window.game.totalLootboxes + 1;
        window.game.totalLootboxes = window.game.totalLootboxes ** 10;
        cheatUI()
    }
}

function addCheatedLootboxes(count) {
    if (confirmCheat() == true) {
        window.game.lootboxes = window.game.lootboxes + count;
        window.game.totalLootboxes = window.game.totalLootboxes + count;
        cheatUI();
    }
}

function lootboxCheatButton() {
    if (confirmCheat() == true) {
        var inp = document.getElementById('lootbox-cheat-input');
        var lb = parseInt(inp.value);
        addCheatedLootboxes(lb);
        cheatUI();
    }
}

function confirmCheat() {
    if (window.game.hasCheated == true) { return true } else {
        confCheat = confirm("Are you sure you want to cheat? You will not be asked again. Cheating can ruin the fun, and will remove you from getting online bonuses.");
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

// Starts the main game loop
if (int.disableMainGame != true) {
    var Ticker = window.setInterval(function(){tick()}, 10);
    var DisplayCycle = window.setInterval(function(){saveDisplayCycle()}, 50);
    var UpdateUILoop = window.setInterval(function(){updateUI();}, int.uiUpdateRate)
}
var SplashCycle = window.setInterval(function(){splashCycleFunction()}, 160);

window.onmousemove = function (e) {
    var x = e.clientX,
        y = e.clientY;
    document.getElementById('tooltip').style.top = (y+5) + 'px';
    document.getElementById('tooltip').style.left = (x+5) + 'px';
};

function setToolTip(text) {
    document.getElementById('tooltip').hidden = false
    document.getElementById('tooltip-header').innerHTML = text
}

function hideToolTip() {
    document.getElementById('tooltip').hidden = true
}