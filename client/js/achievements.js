var achs = []

baseAch = {
    name: "Base Achievement",
    id: "baseAch",
    desc: "Base achievement for other achievements", //the description of the ach
    req: "Nothing, you cant get this ach!", //the requirements presented to the user
    type: "shadow", //type can be `shadow`, `normal`, or `hidden`. shadow achs dont give rewards, normal and hidden do. shadow and hidden arent visible until unlocked
    checkUnlock: function(){
        return false; //this function should reture true if the user meets the requirements to unlock the ach
        // You can make this always return false, and manually grant it on a certian event using grantAchivement(id)
    },
    onUnlock: function(){
        return true; //doesnt need to return anything; what to do when the user actually gets this unlocked
        // note that the check that checks this.checkUnlock calls grantAchivement() which then calls this function
        // grandAchievement also calls notify() with the args (this.name, this.desc)
    }
}

cheatAch = {
    name: "bruh you cheated!",
    id: "cheatAch",
    desc: "Why would you ever do this?",
    req: "Cheat in some way",
    type: "shadow",
    checkUnlock: function(){
        if (window.game.hasCheated) {
            return true;
        } else {
            return false;
        }
    },
    onUnlock: function(){
        return true;
    }
}

achs.push(baseAch, cheatAch)

function loadAchievements() {
    var achContainer = document.getElementById('ach-container')
    for (var ach in achs) {
        var ta = achs[ach];
        var achIcon = document.createElement('div');
        //var achDesc = document.createElement('div');
        //achDesc.setAttribute('class', 'ach-desc');
        //achDesc.setAttribute('id', 'ach-desc-' + ta.id);
        //achDesc.innerHTML = ta.name + '<br>' + ta.desc;
        achIcon.setAttribute("id", "ach-icon-" + ta.id);
        achIcon.setAttribute('class', 'upgrade');
        achIcon.setAttribute('onmouseover', 'setToolTip("' + ach.desc + '")')
        achContainer.appendChild(achIcon)
    }
}

function grantAchivement(id) {
    notify(achs[id].name, achs[id].desc)
}