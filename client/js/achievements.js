baseAch = {
    name: "Base Achievement",
    id: "baseAch",
    desc: "Base achievement for other achievements", //the description of the ach
    req: "Nothing, you cant get this ach!", //the requirements presented to the user
    type: "shadow", //type can be `shadow`, `normal`, or `hidden`. shadow achs dont give rewards, normal and hidden do. shadow and hidden arent visible until unlocked
    checkUnlock: function(){
        return false; //this function should reture true if the user meets the requirements to unlock the ach
    },
    onUnlock: function(){
        return true; //doesnt need to return anything; what to do when the user actually gets this unlocked
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