function saveFileObject() {
    this.lootboxes = 0;
    this.totalLootboxes = 0;
    this.lootboxesPerClickAdditive = 1;
    this.lootboxesPerClickMultiplier = 1;
    this.lootboxesPerClickCPS = 0;
    this.lootboxesPerSecond = 0;
    this.totalMultiplier = 1;
    this.buildingDiscount = 1;
    this.buildings = {};
    this.options = {'shortNumbers': 'short', 'tab': 'stats', 'saveInterval': 3000, "uiRefreshRate":100, 'autoCloseNotifs':true, 'theme':'classic', 'customTheme': ''};
    this.sellMultiplier = 0.5
    this.upgrades = {};
    //this.acheivementsUnlocked = {};
    this.gameVersionString = int.gameVersionString;
    this.buildNumber = int.buildNumber;
    this.totalLootboxClicks = 0;
    this.totalLootboxesFromClicks = 0;
    this.prestige = 0;
}

function createNewSave() {
    var newSave = new saveFileObject();
    Object.assign(newSave.buildings, buildings);
    return newSave;
}

function loadSaveFromLocalStorage(saveLocation) {
    if (alreadyHasSave(saveLocation)) {
        return loadSaveString(window.localStorage.getItem(saveLocation));
    } else {
        return createNewSave()
    }
}

function loadSaveString(saveString, decoded=false) {
    var loadedSave = createNewSave();

    if (!decoded) {
        var loadString = decode_utf8(lzw_decode(saveString))
    } else {
        var loadString = saveString;
    }
    //console.log(loadString)
    var saveJson = JSON.parse(loadString);
    //var defaultSaveJson = createNewSave();
    if (saveJson.buildNumber < int.firstSupportedBuildNumber) {
        notify("Your save has been reset!", "Your old save file was made in an older version that the game can no longer load! Sorry!")
        return createNewSave()
    } else if (saveJson.buildNumber > int.buildNumber) {
        notify("Your save has been reset!", "Your save file was created in a newer version, and this version cannot load it!")
        return createNewSave()
    }
    //console.log(saveJson)
    Object.assign(loadedSave.buildings, buildings)
    Object.assign(loadedSave, saveJson)
    //loadedSave.buildings = buildings
    //  Object.assign(loadedSave.buildings, saveJson.buildings)

    return loadedSave;
}

function resetSaveFile() {
    window.game = createNewSave();
    //console.log(window.game)
    saveGame()
    loadSaveFromLocalStorage();
    //grantAchievement('resetGame')
    saveGame()
    alert("Your save has been reset. Please refresh the page!")
}

function alreadyHasSave(saveLocation) {
    if (window.localStorage.getItem(saveLocation) === null) {
        return false;
    } else {
        return true;
    }
}

function saveGame() {
    var savestring = JSON.stringify(window.game);
    //console.log(window.game.buildings)
    var savestring = lzw_encode(encode_utf8(savestring));
    window.localStorage['SaveName'] = savestring;
    var saveElement = document.getElementById('save-indicator');
    saveElement.classList.add('game-saved');
    int.saveDisplay = true;
}

function putGamesaveInExportBox() {
    var box = document.getElementById('export-box');
    box.value = ""
    box.value = JSON.stringify(window.game);
}

function loadGamesaveFromExportBox() {
    var box = document.getElementById('export-box');
    window.game = {}
    window.game = loadSaveString(box.value, true)
    saveGame()
    notify("Loaded Save File!", "Succesfully imported save")
}