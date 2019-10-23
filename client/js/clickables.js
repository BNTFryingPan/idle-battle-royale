function spawnClickable() {
    //var height = window.innerHeight;
    //var width = window.innerWidth;

    var x = parseInt(Math.random() * 80) + 10
    var y = parseInt(Math.random() * 80) + 10

    document.getElementById('clickable').style.top = y + "%";
    document.getElementById('clickable').style.left = x + "%";

}

function clickClickable() {

}

function genClickableLoot() {
    var positiveLootTypes = [
        "giveLootboxes",
        "lbpsbonus",
        "clickbonus"
    ]

    var negativeLootTypes = [
        "takeLootboxes",
        "clot"
    ]

    if ((Math.random() < 0.5) && window.game.canGenBadClickabled) {
        var selectedLoottype = negativeLootTypes[parseInt(Math.random()*negativeLootTypes)]
    } else {
        var selectedLoottype = positiveLootTypes[parseInt(Math.random()*positiveLootTypes)]
    }

    if (selectedLoottype == "giveLootboxes") {
        var lbs = (window.game.lootboxesPerSecond * ( Math.random() * 60 ) ) * 60
        earnLootboxes(lbs)
        notify("Silver Lootbox", "You got " + lbs + " lootboxes from a silver lootbox!")
    } else if (selectedLoottype == "lbpsbonus") {
        // bonus duration: 69 seconds
        // bonus multiplier: 14

        int.bonusMultiplier *= 14;
        int.bonusDuration += 69;
    }
}