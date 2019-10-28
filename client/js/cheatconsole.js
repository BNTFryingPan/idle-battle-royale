var lastCheatCommand = ''

function loadChatInputEnterThingForCheats() {
    loadAllCommands()
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
loadedCommands = []

helpCommand = {
    trigger: 'help',
    minArgs: 0,
    maxArgs: 1,
    description: 'help',
    onTrigger: function(cmd) {
        log('Loading Help...')

        var allHelpItems = "trigger: description<br>";
        for (lcmd in loadedCommands) {
            if (loadedCommands[lcmd].trigger != 'help') {
                allHelpItems += loadedCommands[lcmd].trigger + ": " + loadedCommands[lcmd].description + "<br>"
            }
        }
        allHelpItems = allHelpItems.split('<br>')
        for (item in allHelpItems) {
            log(allHelpItems[item])
        }
    }
}

baseCommand = {
    trigger: 'test', // the string that should trigger the command
    minArgs: 0, // the minimum args you command would possibly have
    maxArgs: 0, // the most args your command would possibly have. *unused*?
    description: 'test command, does nothing', // description of the command, shows in help
    onTrigger: function(cmd) { // this function will be run when the command is ran. the cmd arg is the full command string
        log('ok boomer');
        return // you dont need to return anything
    }
}

showUpgradesCommand = {
    trigger: 'showallupgrades',
    minArgs: 0,
    maxArgs: 0,
    description: "show all upgrades in upgrades list, even if not 'unlocked'",
    onTrigger: function(cmd) {
        unlockAllUpgrades()
        log('now showing all upgrades in list')
    }
}

commands.push(baseCommand)
commands.push(showUpgradesCommand)
commands.push(helpCommand)

function loadCommand(cmd) {
    if (!(cmd in loadedCommands)) {
        loadedCommands.push(cmd)
    }
}

function loadAllCommands() {
    for (cmd in commands) {
        loadCommand(commands[cmd])
    }
}

function log(text) {
    var log = document.getElementById('debug-console-log')
    var newLine = "<div><span class='time'>[" + getCurrentTime() + "]</span>  " + text + "</div>"
    log.innerHTML = log.innerHTML + newLine
    log.scrollTop = log.scrollHeight;
}

function executeCheatCommand() {
    if (cmd == '') {return}
    if (!confirmCheat()) {log("You have chosen to not enable cheat mode");log("You can still turn it on later if you wish");return}
    var inputPrompt = document.getElementById('cheat-console-input')
    var cmd = inputPrompt.value;
    lastCheatCommand = inputPrompt.value;
    inputPrompt.value = ""
    var args = cmd.split(' ')

    log("> " + cmd)

    if (cmd.startsWith('set ')) {
        if (args[1] == 'lootboxes') {
            var count = parseInt(args[2])
            window.game.lootboxes = count
            log('set lootbox count to ' + count)
        } else if (args[1] == 'totallootboxes') {
            var count = parseInt(args[2])
            window.game.totalLootboxes = count
            log('set total lootbox count to ' + count)
        } 
    } else if (cmd.startsWith('add ')) {
        if (args[1] == 'lootboxes') {
            var count = parseInt(args[2])
            window.game.lootboxes += count
            log('added ' + count + ' lootboxes to count')
        } else if (args[1] == 'totallootboxes') {
            var count = parseInt(args[2])
            window.game.totalLootboxes = count
            log('added ' + count + ' to total lootbox count')
        }   
    } else {
        //log('looking for commands')
        for (lcmd in loadedCommands) {
            tcmd = loadedCommands[lcmd]
            if (tcmd.trigger == args[0]) {
                log('running cmd')
                tcmd.onTrigger()
                return
            }
        }
        log("Unknown command '" + args[0] + "'. Type help for a list of commands.")
    }
}