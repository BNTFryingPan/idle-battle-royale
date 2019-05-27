// copied and pasted stuff from the internet to help save and load
function lzw_encode(s) {var dict = {};var data = (s + "").split("");var out = [];var currChar;var phrase = data[0];var code = 256;for (var i=1; i<data.length; i++) {currChar=data[i];if (dict['_' + phrase + currChar] != null) {phrase += currChar;} else {out.push(phrase.length > 1 ? dict['_'+phrase] : phrase.charCodeAt(0)); dict['_' + phrase + currChar] = code; code++; phrase=currChar;}}out.push(phrase.length > 1 ? dict['_'+phrase] : phrase.charCodeAt(0));for (var i=0; i<out.length; i++) {out[i] = String.fromCharCode(out[i]);}return out.join("");}
function lzw_decode(s) {var dict = {};var data = (s + "").split("");var currChar = data[0];var oldPhrase = currChar;var out = [currChar];var code = 256;var phrase;for (var i=1; i<data.length; i++) {var currCode = data[i].charCodeAt(0);if (currCode < 256) {phrase = data[i];} else {phrase = dict['_'+currCode] ? dict['_'+currCode] : (oldPhrase + currChar);}out.push(phrase);currChar = phrase.charAt(0);dict['_'+code] = oldPhrase + currChar;code++;oldPhrase = phrase;}return out.join("");}
function encode_utf8(s) {return unescape(encodeURIComponent(s));}
function decode_utf8(s) {return decodeURIComponent(escape(s));}
//more copied and pasted stuff
//function setInputFilter(textbox, inputFilter) {["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function(event) {textbox.addEventListener(event, function() {if (inputFilter(this.value)) {this.oldValue = this.value;this.oldSelectionStart = this.selectionStart;this.oldSelectionEnd = this.selectionEnd;} else if (this.hasOwnProperty("oldValue")) {this.value = this.oldValue;this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);}});});}
//setInputFilter(document.getElementById("lootbox-cheat-input"), function(value) {return /^\d*$/.test(value); });

var gameVersionNumber = 6;
var gameVersionString = "Alpha 0.1.1";
var isLoaded = false;
var saveTick = 0;

// gamesave
function gameSave() {
    this.lootboxes = 0;
    this.totalLootboxes = 0;
    this.lootboxesPerClick = 1;
    this.lootboxesPerSecond = 0;
    this.totalMultiplier = 1;
    this.buildingDiscount = 1;
    this.buildings = {};
    Object.assign(this.buildings, buildings);
    //for (var build in buildings) {
    //    this.buildings[build].amount = 0;
    //}
}

function saveGame() {
    savestring = JSON.stringify(window.game);
    savestring = lzw_encode(encode_utf8(savestring));
    window.localStorage['SaveName'] = savestring;
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
        //console.log('loaded: ' + loadstring);
        window.game = new gameSave();
        window.game.lootboxes = loadedgame.lootboxes;
        window.game.lootboxesPerClick = loadedgame.lootboxesPerClick;
        window.game.lootboxesPerSecond = loadedgame.lootboxesPerSecond;
        window.game.totalLootboxes = loadedgame.totalLootboxes;
        window.game.buildings = loadedgame.buildings;
        window.game.hasCheated = loadedgame.hasCheated;
        window.game.totalMultiplier = loadedgame.totalMultiplier;
        window.game.buildingDiscount = loadedgame.buildingDiscount;
    } else {
        window.game = new gameSave();
        window.game.buildings = buildings;
    }

    document.getElementById('version-display').innerHTML = gameVersionString + " - <i>[" + gameVersionNumber + "]</i>"
}

function updateLBPS() {
    var totalLBPS = 0;
    for (var build in window.game.buildings) {
        var tb = window.game.buildings[build];
        tb.totalPerSec = tb.persec * tb.amount;
        totalLBPS = totalLBPS + tb.totalPerSec;
    }
    document.getElementById("lbps-display").innerHTML = "LBPS: " + totalLBPS;
    window.game.lootboxesPerSecond = totalLBPS;
}

window.onload = function() {
    //window.game = new gameSave();
    console.log('Loading game...');
    cacheElements();
    loadBuildings();
    loadGame();
    isLoaded = true;
    //loadUpdateBuildings();
}

// funtions
function clickLootbox() {
    earnLootboxes(window.game.lootboxesPerClick)
    //updateUI();
}

function earnLootboxes(amount) {
    window.game.totalLootboxes += amount * window.game.totalMultiplier;
    window.game.lootboxes += amount * window.game.totalMultiplier;
}

function tick() {
    if (isLoaded == true) {
        earnLootboxes(lootboxesPerSecond/100);

        if (window.game.totalLootboxes<window.game.lootboxes) {
            window.game.hasCheated = true;
            window.game.totalLootboxes = window.game.lootboxes;
            alert("You have cheated! You will no longer be able to get online bonuses.")
        }
        updateUI();
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

function updateUI() {
    //updateUnlocks();
    document.getElementById('lootbox-display').innerHTML = "Lootboxes: " + Math.round(window.game.lootboxes);
    document.getElementById('total-lootbox-display').innerHTML = "Total Lootboxes: " + Math.ceil(window.game.totalLootboxes);
    updateBuildings();
    updateLBPS();
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
        window.game.totalLootboxes = window.game.totalLootboxes * 10;
    }
}

function addCheatedLootboxes(count) {
    if (confirmCheat() == true) {
        window.game.lootboxes = window.game.lootboxes + count;
        window.game.totalLootboxes = window.game.totalLootboxes + count;
    }
}

function lootboxCheatButton() {
    if (confirmCheat() == true) {
        var inp = document.getElementById('lootbox-cheat-input');
        var lb = parseInt(inp.value);
        addCheatedLootboxes(lb);
    }
}

function confirmCheat() {
    if (window.game.hasCheated == true) { return true } else {
        confCheat = confirm("Are you sure you want to cheat? You will not be asked again. Cheating can ruin the fun, and will remove you from getting online bonuses.");
    } if (confCheat == true) { window.game.hasCheated = true;return true } else { return false }
}

// Starts the main game loop
var Timer = window.setInterval(function(){tick()}, 10);