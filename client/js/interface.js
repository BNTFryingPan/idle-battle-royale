//contains functions that control ui, like tabs in the middle bar
var currentSplash = "";
var activeNotifs = [];

function cacheElements() {
    lootboxPerSecDisplay = document.getElementById('lbps-display');
    lootboxTotalDisplay  = document.getElementById('total-lootbox-display');
    lootboxDisplay       = document.getElementById('lootbox-display');
}

function cacheTabElements() {
    onlineTab            = document.getElementById('mb-online-tab');
    //onlineButton         = document.getElementById('mb-online-button');
    cheatsTab            = document.getElementById('mb-cheats-tab');
    //cheatsButton         = document.getElementById('mb-cheats-button');
    achievementsTab      = document.getElementById('mb-ach-tab');
    //achievementsButton   = document.getElementById('mb-ach-button');
    statsTab             = document.getElementById('mb-stats-tab');
    //statsButton          = document.getElementById('mb-stats-button');
    legacyTab            = document.getElementById('mb-legacy-tab');
    //legacyButton         = document.getElementById('mb-legacy-button');
    optionsTab           = document.getElementById('mb-options-tab');
    //optionsButton        = document.getElementById('mb-options-button');
    changelogTab         = document.getElementById('mb-changelog-tab');
    //changelogButton      = document.getElementById('mb-changelog-button');
    chatTab              = document.getElementById('mb-chat-tab');
    //chatButton           = document.getElementById('mb-chat-button');
}

function getFirstOpenNotifNumber() {
    var lastNotifNum = 0
    for (var notifNum in activeNotifs) {
        if (notifNum != lastNotifNum+1) {
            return notifNum;
        }
    }
    return activeNotifs.length;
    
}
/*
<div class='notif-body'>
    <button class='notif-dismiss-button' style='position: absolute; right: -5px; top: -5px'>X</button>
    <b class='notif-header'>Notif Header</b>
    <br>
    <span class='notif-text'>test notif</span>
</div>
*/

function notify(header, text, duration=15) {
    var notifDiv = document.getElementById('notif-div')
    var thisNumber = getFirstOpenNotifNumber()
    activeNotifs.push(thisNumber)
    notifDiv.innerHTML = "<div id='notif-" + thisNumber + "' class='notif-body'><button class='notif-dismiss-button' style='position: absolute; right: -5px; top: -5px' onclick='removeNotification(" + thisNumber + ")'>X</button><b class='notif-header'>" + header + "</b><br><span class='notif-text'>" + text + "</span></div><br id='notif-break-" + thisNumber + "'>" + notifDiv.innerHTML
    //thisNotif = document.createElement('div')
    //console.log('created notif and added, waiting to remove')
    var timer = 0
    var notifTimer = setInterval (function(){
        if (timer >= duration) {
            removeNotification(thisNumber)
            clearInterval(notifTimer);
        }
        timer++;
    }, 1000);
    int.notifCount++;
}

function removeNotification(number) {
    try {
        document.getElementById('notif-' + number).remove();
        document.getElementById('notif-break-' + number).remove();
        //console.log('removed notif')
        var rem = activeNotifs.splice(number, 1);
        int.notifCount--;
    } catch {
        console.log('error removing notification')
    }
    
    //activeNotifs.
}



function changeSplash() {
    splashes = [
        'Not made in China!',
        'Also try <a href="http://orteil.dashnet.org/cookieclicker">Cookie Clicker</a>',
        'Also try <a href="http://clickerheroes.com">Clicker Heroes</a>',
        "Don't play Fortnite",
        'Made in the USA',
        '<sub>G</sub><sup>A</sup><sub>M</sub><sup>E</sup> <sub>O</sub><sup>V</sup><sub>E</sub><sup>R</sup>',
        '<sub>O</sub><sup>G</sup><sub>V</sub><sup>A</sup><sub>E</sub><sup>M</sup><sub>R</sub><sup>E</sup>',
        'Not on Steam! (yet...... (if ever.....))',
        'Also try <a href="http://www.filltheoceans.com/">Fill the Oceans</a>',
        'Also try <a href="http://decisionproblem.com/paperclips/index2.html">Universal Paperclips</a>',
        'Village and Pillage',
        'Minceraft',
        'Have a hug!',
        'DOOR STUCK! DOOR STUCK!',
        'Updating Windows... 99%',
        'A darkness lingers',
        'Don\'t forget to <b>SMASH</b> that like button',
        '😢 T-series is winning',
        'minecraft double smooth stone slab',
        'OHHH Its a RAT!',
        'Creeper... AWWWW MAN!!! so we back in...',
        'Now with ray tracing!',
        'Now a childrens cartoon mobile game!',
        'Yah Yeet',
        'E3 2019 was a disappointment',
        'Bethesda roasted themselves!',
        'YEEEAAHHHH!!!',
        'THANK YOU!',
        "OOOOOOOOOORRRRRRRRRRRRRRBBBBBBBBBBBBBBBB!",
        "The Nintendo Light Switch",
        "Epic Gamer Time",
        "🅱ruh Moment",
        "uh oh... stinky",
        "you are a boomer",
        "ok boomer",
        "youve been gnomed",
        "im a gnome",
        "Now with ominous forshadowing!",
        "now with a lack of sound",
        "this is a splash",
        "greetings boomer",
        "Now with 0% more battling!" //When battle royale mode gets added, change to 100%
        ];
    var splashElement = document.getElementById('header-splash');
    var newSplash = ''
    var newSplash = splashes[parseInt(Math.random() * splashes.length)];
    if (currentSplash != '') {
        while (currentSplash == newSplash) {
            var newSplash = splashes[parseInt(Math.random() * splashes.length)];
        }
    } else {
        var newSplash = splashes[parseInt(Math.random() * splashes.length)];
    }
    currentSplash = newSplash
    // adding invisibile sub and sup text allows me to make splashes with sub and sup text without changing the height of the line
    // i tried a zero-width character, but it just showed up as a ~ (tilda tilde whatever, i like to call it the relative indicator because minecraft)
    splashElement.innerHTML = "<sup class='splash-fix'>.</sup>" + newSplash + "<sub class='splash-fix'>.</sub>";
}

function hideAllTabs () {
    cheatsTab.setAttribute('class', 'container');
    //cheatsButton.disabled = false;
    onlineTab.setAttribute('class', 'container');
    //onlineButton.disabled = false;
    achievementsTab.setAttribute('class', 'container');
    //achievementsButton.disabled = false;
    statsTab.setAttribute('class', 'container');
    //statsButton.disabled = false;
    legacyTab.setAttribute('class', 'container');
    //legacyButton.disabled = false;
    optionsTab.setAttribute('class', 'container');
    //optionsButton.disabled = false;
    changelogTab.setAttribute('class', 'container');
    //changelogButton.disabled = false;
    chatTab.setAttribute('class', 'container');
    //chatButton.disabled = false;
}

function upgradesToggleHideExpensive() {
    var hide = document.getElementById("upgrades-hide-box").checked;
    int.hideExpensiveUpgrades = hide;
}

function optionsTabUpdateNumberFormat() {
    var newFormat = document.getElementById('option-numformat').value;
    window.game.options['shortNumbers'] = newFormat;
}

function optionsTabUpdateSaveInterval() {
    var newInterval = parseInt(document.getElementById('option-saveint').value);
    window.game.options['saveInterval'] = newInterval;
}

function optionsTabUpdateUIUpdateRate() {
    var newRate = parseInt(document.getElementById("option-uirate").value);
    var trueRate = parseInt(1000/newRate)
    window.game.options['uiRefreshRate'] = newRate;
    window.clearInterval(UpdateUILoop);
    UpdateUILoop = window.setInterval(function(){updateUI();}, trueRate)
}

function optionsTabUpdateTimeoutNotifs() {
    var timeoutNotifs = document.getElementById("option-uirate").checked;
    window.game.options['autoCloseNotifs'] = timeoutNotifs;
}

/*function optionstabUpdateSpeed() {
    var newSpeed = document.getElementById('option-tickSpeed').value;
    window.game.options['tickSpeed'] = newSpeed;
}*/

//tabs
function mbSwitchToOnline() {
    hideAllTabs();
    onlineTab.setAttribute('class', 'container selected');
    //onlineButton.disabled = true;
}

function mbSwitchToCheats() {
    hideAllTabs();
    cheatsTab.setAttribute('class', 'container selected');
    //cheatsButton.disabled = true;
}

function mbSwitchToAchievements() {
    hideAllTabs();
    achievementsTab.setAttribute('class', 'container selected');
    //achievementsButton.disabled = true;
}

function mbSwitchToStats() {
    hideAllTabs();
    statsTab.setAttribute('class', 'container selected');
    //statsButton.disabled = true;
}

function mbSwitchToOptions() {
    hideAllTabs();
    optionsTab.setAttribute('class', 'container selected');
    //optionsButton.disabled = true;
}

function mbSwitchToLegacy() {
    hideAllTabs();
    legacyTab.setAttribute('class', 'container selected');
    //legacyButton.disabled = true;
}

function mbSwitchToChangelog() {
    hideAllTabs();
    changelogTab.setAttribute('class', 'container selected');
    //changelogButton.disabled = true;
}

function mbSwitchToChat() {
    hideAllTabs();
    chatTab.setAttribute('class', 'container selected');
    //chatButton.disabled = true;
}

function hideGame() {
    var bars = document.getElementsByClassName('bar')
    for (var bar in bars) {
        try {
            bars[bar].style.display = 'none'
        } catch { }
    }
    //document.getElementById('middle-bar-holder').style.display = 'none'
}

function showGame() {
    var bars = document.getElementsByClassName('bar')
    for (var bar in bars) {
        try {
            bars[bar].style.display = 'block'
        } catch { }
    }
    //document.getElementById('middle-bar-holder').style.display = 'initial'
}

creditsText = `


-=-=-=-=-=-=-=- Idle Battle Royale -=-=-=-=-=-=-=-
the game with the worst name!
and its a meme!

-= Created By =-
TheDerpyMemeSquad

-= Game Design =-
Leotomas
GloopBloop
Titan_Unlimited

-= Server Hosting =-
Leotomas

large gap for testing
jk

-= Programming =-
Leotomas
GloopBloop

-= UI =-
Leotomas

-= Special Thanks =-
Titan_Unlimited
Random people on StackOverflow
Anyone playtesting
A bunch of people at school

And most importantly...
YOU!
Thanks for playing!`

creditsOpen = false
creditsKeepScrollingIn = 500
creditsPauseAutoscroll = false
creditsAutoscrolled = true

function scrollCredits(manual) {
    if (manual) {
        creditsPauseAutoscroll = true
        creditsKeepScrollingIn = 500
    } else {
        creditsAutoscrolled = true
        document.getElementById('credits').scrollBy(0, 0.5)
        creditsAutoscrolled = false
    }
}

function rollCredits() {
    CreditsScroll = window.setInterval(function(){autoscrollCredits(), 20})
    hideGame();
    creditsOpen = true
    creditsElement = document.createElement('div');
    creditsElement.setAttribute('id', 'credits')
    creditsElement.classList.add('client')
    creditsElement.style = 'display:block;overflow-y:scroll'
    creditsElement.addEventListener('scroll', function(){
        //console.log(blab)
        console.log('credits was scrolled ' + creditsAutoscrolled)
        if (creditsAutoscrolled != true){
            //scrollCredits(true)
            //console.log('manually')
        }
    })
    //creditsElement.addEventListener()
    creditsP = document.createElement('p')
    creditsFormattedList = creditsText.split(`
`)
    for (let index = 0; index < creditsFormattedList.length; index++) {
        creditsP.innerHTML += creditsFormattedList[index] + "<br>";
        
    }
    
    creditsP.style = 'display:block;color:white;text-align:center;width=100%'
    document.getElementById('client').style.display = 'none';
    document.getElementById('save-button').onclick = function(){closeCredits()}
    document.getElementById('save-button').innerHTML = "Close Credits"
    document.getElementById('client-border').appendChild(creditsElement);
    creditsElement.appendChild(creditsP)
}

function closeCredits() {
    CreditsScroll = null
    creditsOpen = false
    document.getElementById('credits').remove()
    document.getElementById('client').style.display = 'flex';
    document.getElementById('save-button').onclick = function(){saveGame()}
    document.getElementById('save-button').innerHTML = "save"
    showGame();
}

function autoscrollCredits() {
    if (creditsOpen == true) {
        creditsAutoscrolled = false
        if (creditsPauseAutoscroll == true) {
            creditsKeepScrollingIn = 500
            creditsPauseAutoscroll = false
        } else {
            if (creditsKeepScrollingIn <= 0) {
                //console.log('autoscrolling')
                //document.getElementById('credits').scrollBy(0, 1)
                scrollCredits(false)
                //creditsAutoscrolled = false
                //creditsPauseAutoscroll = false
            } else {
                creditsKeepScrollingIn -= 1
            }
        }
    }
}
