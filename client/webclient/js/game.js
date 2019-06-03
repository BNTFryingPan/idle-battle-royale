// copied and pasted stuff from the internet to help save and load
function lzw_encode(s) {var dict = {};var data = (s + "").split("");var out = [];var currChar;var phrase = data[0];var code = 256;for (var i=1; i<data.length; i++) {currChar=data[i];if (dict['_' + phrase + currChar] != null) {phrase += currChar;} else {out.push(phrase.length > 1 ? dict['_'+phrase] : phrase.charCodeAt(0)); dict['_' + phrase + currChar] = code; code++; phrase=currChar;}}out.push(phrase.length > 1 ? dict['_'+phrase] : phrase.charCodeAt(0));for (var i=0; i<out.length; i++) {out[i] = String.fromCharCode(out[i]);}return out.join("");}
function lzw_decode(s) {var dict = {};var data = (s + "").split("");var currChar = data[0];var oldPhrase = currChar;var out = [currChar];var code = 256;var phrase;for (var i=1; i<data.length; i++) {var currCode = data[i].charCodeAt(0);if (currCode < 256) {phrase = data[i];} else {phrase = dict['_'+currCode] ? dict['_'+currCode] : (oldPhrase + currChar);}out.push(phrase);currChar = phrase.charAt(0);dict['_'+code] = oldPhrase + currChar;code++;oldPhrase = phrase;}return out.join("");}
function encode_utf8(s) {return unescape(encodeURIComponent(s));}
function decode_utf8(s) {return decodeURIComponent(escape(s));}
//more copied and pasted stuff
//function setInputFilter(textbox, inputFilter) {["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function(event) {textbox.addEventListener(event, function() {if (inputFilter(this.value)) {this.oldValue = this.value;this.oldSelectionStart = this.selectionStart;this.oldSelectionEnd = this.selectionEnd;} else if (this.hasOwnProperty("oldValue")) {this.value = this.oldValue;this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);}});});}
//setInputFilter(document.getElementById("lootbox-cheat-input"), function(value) {return /^\d*$/.test(value); });

function abbrNum(number) { decPlaces = 3; decPlaces = Math.pow(10,decPlaces);
    //this little bit of code was taken from main.js of cookie clicker 2.019 and slightly modified (removed spaces from first line, and changed var name)
    var longShort = ['thousand', 'million', 'billion', 'trillion', 'quadrillion', 'quintillion', 'sextillion', 'septillion', 'octillion', 'nonillion'];
    var longPrefixes = ['', 'un', 'duo', 'tre', 'quattuor', 'quin', 'sex', 'septen', 'octo', 'novem'];
    var longSuffixes = ['decillion', 'vigintillion', 'trigintillion', 'quadragintillion', 'quinquagintillion', 'sexagintillion', 'septuagintillion', 'octogintillion', 'nonagintillion'];
    var shortShort = ['k', 'm', 'b', 't', 'q', 'Q', 's', 'S', 'o', 'n'];var shortPrefixes = ['', 'u', 'd', 't', 'q', 'Q', 's', 'S', 'o', 'n'];var shortSuffixes = ['d', 'v', 't', 'q', 'Q', 's', 'S', 'o', 'n'];
    
    for (var i in longSuffixes ) { for (var ii in longPrefixes ) {longShort.push( ' '+longPrefixes[ii]+ longSuffixes[i] ); } } 
    for (var i in shortSuffixes) { for (var ii in shortPrefixes) {shortShort.push(' '+shortPrefixes[ii]+shortSuffixes[i]); } } 
    // end code stolen from cookie clicker

    if (window.game.options['shortNumbers'] == "long") { var abbrev = longShort; } else if (window.game.options['shortNumbers'] == "short") { var abbrev = shortShort; } else if (window.game.options['shortNumbers'] == "sci") { return number; } else { window.game.options['shortNumbers'] = "long"; var abbrev = longShort; }
    for (var i=abbrev.length-1; i>=0; i--) {var size = Math.pow(10,(i+1)*3);if(size <= number) {number = Math.round(number*decPlaces/size)/decPlaces;if((number == 1000) && (i < abbrev.length - 1)) {number = 1;i++;}number += ' ' + abbrev[i]; break;}}return number; }

function getUrlVars() { var vars = {}; var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) { vars[key] = value; }); return vars; }
function getUrlParam(parameter, defaultvalue){ var urlparameter = defaultvalue; if(window.location.href.indexOf(parameter) > -1){ urlparameter = getUrlVars()[parameter]; } return urlparameter; }
//function sleep(ms) { }

// end copied and pasted stuff

var gameVersionNumber = 25;
var gameVersionString = "Alpha 0.3.0-pre1";
var isLoaded = false;
var saveTick = 0;
var splashTick = 250;
var fastSplashTick = 0;
var isLoadedTimer = 0;
var fastSplash = false;

// gamesave
function gameSave() {
    this.lootboxes = 0;
    this.totalLootboxes = 0;
    this.lootboxesPerClickAdditive = 1;
    this.lootboxesPerClickMultiplier = 1;
    this.lootboxesPerSecond = 0;
    this.totalMultiplier = 1;
    this.buildingDiscount = 1;
    this.buildings = {};
    this.options = {'shortNumbers': 'short', 'tab': 'stats'}
    this.upgrades = {}
    //this.options['shortNumbers'] = "long"
    this.totalLootboxClicks = 0;
    this.totalLootboxesFromClicks = 0;
    this.prestige = 0;
    Object.assign(this.buildings, buildings);
    //for (var build in buildings) {
    //    this.buildings[build].amount = 0;
    //}
}

function saveGame() {
    savestring = JSON.stringify(window.game);
    savestring = lzw_encode(encode_utf8(savestring));
    window.localStorage['SaveName'] = savestring;
    //console.log('saved game')
}

function loadGame() {
    //console.log('loading game')
    
    loadstring = window.localStorage.getItem('SaveName');
    //console.log(window.localStorage['SaveName']);
    if (loadstring === null){
        newFile = true;
    } else {
        newFile = false;
    }
    //console.log(newFile)
    if (newFile == false) {
        loadstring = decode_utf8(lzw_decode(loadstring));
        loadedgame = JSON.parse(loadstring);
        window.game = new gameSave();
        Object.assign(window.game, loadedgame)
    } else {
        window.game = new gameSave();
        window.game.buildings = buildings;
    }

    document.getElementById('option-numformat').value = window.game.options['shortNumbers']
    document.getElementById('version-display').innerHTML = gameVersionString + " - <i>[" + gameVersionNumber + "]</i>"
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
    cacheElements();
    chatCacheElements();
    loadBuildings();
    loadGame();
    loadUpgrades();
    var openTab = getUrlParam("tab", "stats");
    document.getElementById("mb-" + openTab + "-button").click()
    isLoaded = true;
    cheatUI();
    changeSplash();
    //loadUpdateBuildings();
}

// funtions
function clickLootbox() {
    lootboxesFromClick = window.game.lootboxesPerClickAdditive * window.game.lootboxesPerClickMultiplier
    earnLootboxes(lootboxesFromClick);
    window.game.totalLootboxClicks++;
    window.game.totalLootboxesFromClicks += lootboxesFromClick;
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
    if (isLoaded == true) {
        earnLootboxes(window.game.lootboxesPerSecond/100, true);

        if (window.game.totalLootboxes<window.game.lootboxes) {
            window.game.hasCheated = true;
            window.game.totalLootboxes = window.game.lootboxes;
            alert("You have cheated! You will no longer be able to get online bonuses.")
        }
        updateUI();
        tickUpgrades();
        if (saveTick >= 300) {
            saveGame();
            saveTick = 0;
        } else {
            saveTick++;
        }
    } else {
        isLoadedTimer++;
        if (isLoadedTimer >= 500) {
            alert("The game appears to be loading slowly. Try refreshing the page");
            isLoadedTimer = 0;
        }
    }
}

function splashCycleFunction() {
    var splashElement = document.getElementById('header-splash');
    if (fastSplash == true) {
        splashTick = 0;
        fastSplashTick++;
        if (fastSplashTick == 1) {
            splashElement.classList.add('changing');
        } else if (fastSplashTick >= 3) {
            changeSplash();
            splashElement.classList.remove('changing');
            fastSplash = false;
            fastSplashTick = 0;
            splashTick = 0;
        }
    } else {
        splashTick++;
        if (splashTick == 300) {
            splashElement.classList.add('changing');
        } else if (splashTick == 305) {
            changeSplash()
            splashElement.classList.remove('changing');
            splashTick = 0;
        }
    }

}

function splashClick() {
    fastSplash = true;
}

function updateUI() {
    //updateUnlocks();
    document.getElementById('lootbox-display').innerHTML = "Lootboxes: " + abbrNum(Math.round(window.game.lootboxes));
    document.getElementById('total-lootbox-display').innerHTML = "Total Lootboxes: " + abbrNum(Math.ceil(window.game.totalLootboxes));
    updateBuildings();
    updateLBPS();
    document.getElementById('total-building-display').innerHTML = "Total Buildings: " + abbrNum(window.game.totalBuildings);
    document.getElementById('lbpc-display').innerHTML = "Lootboxes per Click: " + abbrNum(Math.round(window.game.lootboxesPerClickAdditive * window.game.lootboxesPerClickMultiplier));
    document.getElementById('total-clicks-display').innerHTML = "Total Lootbox Clicks: " + window.game.totalLootboxClicks;
    document.getElementById('lb-from-clicks').innerHTML = "Total Lootboxes from Clicks: " + abbrNum(Math.round(window.game.totalLootboxesFromClicks));
    document.getElementById('prestige-current').innerHTML = window.game.prestige;
    document.getElementById('prestige-lbfnp').innerHTML = abbrNum(Math.ceil(calcLbsNextPrestigeLevel() - window.game.totalLootboxes));
    document.getElementById('prestige-plian').innerHTML = abbrNum(calcPrestige());
    //document.getElementById('building-Player-amount').innerHTML = buildingPlayer.amount.toString();
}

// Cheats
// Used for debugging and testing

function resetAll() {
    confirmResponse = confirm("Are you sure you want to reset your save? You will lose ALL progress. This is NOT prestiging, you will unlock that later in the game.")
    if (confirmResponse) {
        localStorage.removeItem('SaveName');
        loadGame();
        alert("Your save has been reset")
    } else {
        alert("Reset canceled. Nothing Changed")
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

function cheatUI() {
    if (window.game.hasCheated == true) {
        document.getElementById('header-text').innerHTML = "Idle Battle Royale Client <b>CHEATER!!!!!</b>"
    } 
}

// Starts the main game loop
var Ticker = window.setInterval(function(){tick()}, 10);
var SplashCycle = window.setInterval(function(){splashCycleFunction()}, 100);