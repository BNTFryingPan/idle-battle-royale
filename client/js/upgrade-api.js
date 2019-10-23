function tickUpgrades() {
    if (int.isLoaded == true) {
        for (var i = 0; i < upgrades.length; i++) {
            var tu = upgrades[i];
            if (window.game.upgrades[tu.id] != true) {
                try {
                    var tub = document.getElementById("upgrade-button-" + tu.id)
                    //var tubd = document.getElementById('upgrade-dis-' + tu.id)
                    //console.log(tub.style)
                    if (tu.unlock() || int.showingAllUpgrades) {
                        tub.hidden = false;
                        if (tu.cost(window.game.lootboxes)) {
                            tub.classList.remove('expensive')
                        } else {
                            tub.classList.add   ('expensive');
                            if (int.hideExpensiveUpgrades && !int.showingAllUpgrades) {
                                tub.hidden = true;
                            }
                        }
                    } else {
                        tub.hidden = true;
                    }
                } catch (error) {
                    console.log(error + ' during tick of ' + tu.id)
                    notify("Error!", "An error has occured (tick error)! Check the log for details.")
                }
            } else {
                var tub = document.getElementById("upgrade-button-" + tu.id)
                tub.hidden = false
                //tub.style.display = 'block'
                //console.log(tub.style)
            }
        }
    }
}

function buyUpgrade(id) {
    console.log('trying to buy upgrade with id ' + id)
    var upgradesCont = document.getElementById('upgrades');
    var upgradesBought = document.getElementById('upgrades-bought');
    for (var upgrade in upgrades) {
        var tu = upgrades[upgrade];
        if (tu.id == id) {
            console.log('found upgrade!')
            console.log('cost function: ' + tu.cost)
            if (tu.cost(window.game.lootboxes) == true) {
                console.log('can afford')
                var button = document.getElementById('upgrade-button-' + id);
                //var desc = document.getElementById('upgrade-desc-' + id);
                window.game.upgrades[tu.id] = true;
                window.game.upgradesBought++;
                console.log('moving button')
                upgradesCont.removeChild(button);
                //upgradesCont.removeChild(desc);
                upgradesBought.appendChild(button);
                //upgradesBought.appendChild(desc);
                //console.log(desc)
                button.onclick = function(){};
                
                tu.onBuy()
            } else {
                var a = document.getElementById('upgrade-button-' + id);
                a.classList.add('upgrade-flash-red');
                a.classList.remove('upgrade-flash-red');
            } break;
        }
    }
}

function loadNewUpgrade(upgradeData) {
    int.loadedUpgrades += 1
    var tu = upgradeData;
    var upgradeContainer = document.getElementById('upgrades');
    var upgradesBought = document.getElementById('upgrades-bought');

    var upgradeButton = document.createElement('button');
    //var upgradeDisplay = document.createElement('span');
    //upgradeDisplay.setAttribute('id', 'upgrade-dis-' + tu.id)
    upgradeButton.setAttribute("id", "upgrade-button-" + tu.id);
    upgradeButton.setAttribute('class', 'upgrade');
    upgradeButton.setAttribute('data-tt', "<b>" + tu.name + "</b><br>" + tu.desc)

    upgradeButton.style.backgroundImage = "url(" + tu.icon + ")"

    if (window.game.upgrades[tu.id] == true) {
        upgradeButton.onclick = function(){console.log('already purchased!')};
        //upgradeButton.appendChild(upgradeDisplay);
        upgradesBought.appendChild(upgradeButton);
    } else {
        var tf = new Function('buyUpgrade("' + tu.id + '")')
        upgradeButton.onclick = tf;
        window.game.upgrades[tu.id] = false;
        upgradeButton.hidden = true;
        //upgradeButton.appendChild(upgradeDisplay);
        upgradeContainer.appendChild(upgradeButton);
    }
}

function loadUpgrades() {
    for (var upgrade in upgrades) { 
        var tu = upgrades[upgrade];
        loadNewUpgrade(tu);
    }
}
