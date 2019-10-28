var heldKeys = [];

window.onkeydown = function(e) {
    heldKeys[e.key] = true;
    //log(e.key);

    if (heldKeys['Control']) {
        if (heldKeys['s']) {
            e.preventDefault();
            if (!window.game.options['disableKb']) {
                saveGame()
            }
        }
        
        if (heldKeys['o']) {
            e.preventDefault()
            if (!window.game.options['disableKb']) {
                mbSwitchToOnline()
            }
        }
    }
    
    if (e.key == 'Tab') {
        e.preventDefault();
    }
}

window.onkeyup = function(e) {
    heldKeys[e.key] = false;
}

window.onkeypress = function(e) {
    if (window.game.options['disableKb']) { return }
    if (document.activeElement.tagName == 'INPUT') { return }
    if (e.key == "c") {
        e.preventDefault()
        clickLootbox()
    } else if (e.key == "S") {
        mbSwitchToStats()
    } else if (e.key == "O") {
        mbSwitchToOptions()
    } else if (e.key == "A") {
        mbSwitchToAchievements()
    } else if (e.key == "L") {
        mbSwitchToLegacy()
    } else if (e.key == "H") {
        mbSwitchToCheats()
    } else if (e.key == "G") {
        mbSwitchToChangelog()
    } else if (e.key == "t") {
        mbSwitchToChat()
    } else if (e.key == 's') {
        splashClick()
    } else if (e.key == "B") {
        if (document.getElementById('building-select-buy').checked) {
            document.getElementById('building-select-sell').click();
        } else {
            document.getElementById('building-select-buy').click();
        }
    } else if (e.key == "U") {
        document.getElementById('upgrades-hide-box').click();// = !document.getElementById('upgrades-hide-box').checked
    }
}