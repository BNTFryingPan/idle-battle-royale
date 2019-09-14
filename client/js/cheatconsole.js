var lastCheatCommand = ''

function loadChatInputEnterThingForCheats() {
    document.getElementById('cheat-console-input').addEventListener("keyup", event => {
        if (event.key === 'Enter') {
            executeCheatCommand();
            event.preventDefault();
        } else if (event.key === 'ArrowUp') {
            var inp = document.getElementById('cheat-console-input').value;
            document.getElementById('cheat-console-input').value = lastCheatCommand;
            lastCheatCommand = inp;
        } else {
            return false;
        }
    })
}

commands = []

baseCommand = {
    trigger: 'test', // the string that should trigger the command
    minArgs: 0, // the minimum args you command would possibly have
    maxArgs: 0, // the most args your command would possibly have. *unused*?
    description: 'test command, does nothing', // description of the command, shows in help
    onTrigger: function(cmd) { // this function will be run when the command is ran. the cmd arg is the full command string
        return // you dont need to return anything
    }
}

//commands.push(baseCommand)

function log(text) {
    var log = document.getElementById('debug-console-log')
    var newLine = "<div><span class='time'>[" + getCurrentTime() + "]</span>  " + text + "</div>"
    log.innerHTML = log.innerHTML + newLine
    log.scrollTop = log.scrollHeight;
}

function executeCheatCommand() {
    if (cmd == "") {return}
    if (!confirmCheat()) {return}
    var inputPrompt = document.getElementById('cheat-console-input')
    var cmd = inputPrompt.value;
    lastCheatCommand = inputPrompt.value;
    inputPrompt.value = ""
    var args = cmd.split(' ')

    log(cmd)

    if (cmd.startsWith('set ')) {
        if (args[1] == 'lootboxes') {
            var count = parseInt(args[2])
            window.game.lootboxes = count
            log('set lootbox count to ' + count)
        } 
    } else if (cmd.startsWith('add ')) {
        if (args[1] == 'lootboxes') {
            var count = parseInt(args[2])
            window.game.lootboxes += count
            log('added ' + count + ' lootboxes to count')
        }
    } else if (cmd.startsWith('showallupgrades')) {
        unlockAllUpgrades()
        log('now showing all upgrades in list')
    } else {
        log("Unknown command '" + args[0] + "'. Type help for a list of commands.")
    }
}