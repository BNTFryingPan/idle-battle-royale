var changelog = {
    "allUpdates": [
        {
            "versionInfo": {
                "branch": "test",
                "date": "10/11/2019",
                "build": 71,
                "verString": "Alpha 0.5.3",
                "verName": null
            },
            "note": "still making progress on sorting out all the code. also remembered about some upgrades features i never implemented but wanted to",
            "changes": [
                "+ working on changing the changelog generator a bit. it will automatically format the header string based on build info",
                "+ added a wip popup notif to replace js alert() calls used for cheats messages, and will be used for other prompts in the future",
                "+ idk what else"
            ]
        },
        {
            "header": "TB> Alpha 0.5.2 - Build 70 - [10/9/2019]",
            "note": "im not sure how im going to format test branch version numbers yet. you tell me",
            "changes": [
                "+ working on possible support for easy custom themes by changing accent colors and stuff.",
                "+ added some placeholder buildings, so there are 16 total, with a few place holders"
            ]
        },
        {
            "header": "Alpha 0.5.1 - Build 68 - [10/1/19]",
            "note": "you mightve heard that 0.6 dev will happen in a [test-branch]. and you would be correct. but ill still put test branch changelogs in the 'stable' build",
            "changes": [
                "+ revamped the save and load system. not quite save breaking proof yet, but that will happen soon<sup>tm</sup>",
                "+ moved some stuff between files, the upgrade loader is now in its own file, an the building loader and future ach loader will also be in their own files",
                "+ also moved some library code to its own library file."
            ]
        },
        {
            "header": "Alpha 0.5.0 - Build 65 - Themeing Update - [9/25/19]",
            "note": "hey, finally a 'minor' update. according to semantic versioning (which i dont really follow) its major.minor.patch",
            "changes": [
                "+ more important than themes, we now have a (still WIP) import and export. really easy to cheat with but whatever",
                "+ light theme looks *ok*, not great, but *ok*",
                "+ dark theme is dark",
                "+ theres a custom theme option. if you know css, great, you can make a theme. i dont have anything for you if you dont know",
                "+ oh yeah, a few updates ago i fixed the stats tab purchased upgrades list",
                "+ theres now a proper tooltip thing that follows your cursor. im going to make more stuff use it, because it is useful for information",
                "= * right now only upgrades and the splash use it, because i needed to test them.",
                "major note: next update (0.6) will probably focus on modding and cleaning up existing code to run a bit better and be a lot neater, so dont expect too many features until 0.7",
                "i might throw in a suprise though 4Head"
            ]
        },
        {
            "header": "Alpha 0.4.9 - Build 62 - Themes-pre1 - [9/22/19]",
            "note": "i was experimenting with theming, and found that it was really easy so i just did it.",
            "changes": [
                "+ added, oh idk, <b>THEMES</b>.",
                "+ weve got the og classic theme that i now see is kinda ugly but i liked it at the time, so i just left is as the default",
                "+ theres a new dark theme, i might make it the default in the future, but idk",
                "* theres a beta light theme which is technically no theme, so it looks really bad. you cant even see some stuff, but oh well, its too bright for me to really care.",
                "^ im going to add custom theming soon, not quite sure how exactly im going to implement it. will probably be a raw css file in a url parameter",
                "^ theme update will be 0.5, and will have classic, dark, light, and custom theme, and will save the theme in your save (it doesnt yet, btw)",
                "have a nice day"
            ]
        },
        {
            "header": "Alpha dev-0.4.7 - Build 59 - Upgrades Sorta Release",
            "note": "im stopping the upgrades-pre# because i finished the upgrades system, its just a matter of adding all of them",
            "changes": [
                '+ added total lootbox count to add and set in debug console with "totallootboxes"',
                '+ added a list of the first few notations under the lootbox count',
                '+ added a wallpaper engine mode, accessed by adding "?wpe=1" to the end of the URL',
                '+ made the bar under the client with some info be a footer at the bottom of the screen no matter where you scroll',
                '+ added notifications, but they arent used yet, if you want to test them, open the js console, and type "notify(<header>, <text>, [time in seconds])"',
                '^ theres a test notif that doesnt go away',
                '* the font should default to arial instead of your browsers default (usually times new roman by default), but if your online it will still use Ubuntu',
                '* theres an option to disable the notifs going away automatically',
                '* changed the font in the cheat console and chat log to Ubuntu mono (if it cant, it should use courier new)',
                '* improved scaling of the client border and middle tabs',
                "* After next major update (0.5) i will add a beta branch, i cant do it now, because i dont have the code for the last release"
            ]
        },
        {
            "header": "Alpha dev-0.4.6 - Build 58 - Upgrades-pre9",
            "note": "if you are in the discord, you may know i announced that the upgrades update will include some scaling improvements. This update is mostly focused on that, and adding the debug console in the cheats tab",
            "changes": [
                '+ added a log similar to the chatbox in the cheats tab, this is a cheat console where you will be able to, you know, cheat',
                '+ currently in the debug console there are 3 commands, add, set, and showallupgrades.',
                '* showallupgrades will replaces the "reveal all upgrades" button above the console',
                '* add and set will allow you to add and set numbers like lootboxes, total lootboxes, building counts, and multipliers',
                '* currently, the syntax for add and set is "[add|set] lootboxes <number>", and you can only change lootboxes',
                '* i will be adding more stuff soon probably'
            ]
        },
        {
            "header": "Alpha dev-0.4.5 - Build 57 - Upgrades-pre8",
            "note": "ive pushed back on chat, and decided that i might release chat and upgrades at the same time, but idk<br>note: im looking for more bugs to squash, so please do report bugs",
            "changes": [
                "extra note: you can fork the project and make changes and ill check out your changes",
                "* working on extensive documentation in comments for future mod support documentation. not sure when i will actually make real mod api docs",
                "+ added a thing to the changelog that can automatically replace certian text with certian other text, useful for linking discord by just typing discord in [ and ]. will use for more stuff in the future",
                "+ added a cheat/debug console rather than clickable boxes, however it doesnt work yet, and im not sure what will be in it. if you have ideas, put it in the [discord]",
                "+ added a toggle above upgrades to only show upgrades you can afford",
                "+ added some stuff to get notifications working, notifs will be used to tell you when theres an update, when you get an achivement, and other stuff",
                "+ added some WIP layout stuff for prestige",
                "+ added a proper project guide to GitHub Projects, you can look at it at <a href='https://github.com/LeotomasMC/idle-battle-royale/projects/1'>by clicking here</a>.",
                "+ added 3 teir upgrades to speedrunners",
                "+ added a new option to change UI update rate",
                "* changed layout of the options tab a bit",
                "* updated changelog header warning to indicate edge canary update to chrome 77 from chrome 76"
            ]
        },
        {
            "header": "Alpha dev-0.4.4 - Build 56 - Chat-pre3",
            "note": "upgrades is still being pushed back, but more chat updates, also hosting a wss server is hard, also id like someone to try to help work on code",
            "changes": [
                "* the default server is actually wss://leotomas.ddns.net:25544 which still wont be up often",
                "+ a chat login box is now there. if it goes away, and doesnt reappear, type in chat `/showlogin` and press enter",
                "+ improved chat formatting a little bit maybe",
                "+ some work on upgrades, added small framework for icons",
                "+ added removal warning for building price upgrades, as they might be removed",
                "+ there is a credits screen now, im trying to make it scroll automatically, but pause if you manually scroll it",
                "+ at some point i made a save indicator at the bottom, but didnt put it in changelog"
            ]
        },
        {
            "header": "Alpha 0.4.3 - Build 55 - Chat-pre2",
            "note": "Upgrades full release has been pushed back in favor of chat, which is now sorta working",
            "changes": [
                "+ chat is now functional, use /connect [address] [username] to connect",
                "+ default chat server that will not be up very often is accesible by putting in `ws://leotomas.ddns.net:25544` for the address",
                "* chat doesnt have proper formatting yet, oh well, this is mostly just for testing",
                "+ you can host your own chat server with the new wsserver/server.py file on github"
            ]
        },
        {
            "header": "Alpha 0.4 - Build 51 - Upgrades-pre7",
            "note": "This update has a lot of behind the scenes changes, and not many upgrades improvements",
            'changes': [
                '+ added a full screen changelog and chat page, access by adding ?fcl=1 or ?chatpopout=1 to the url',
                '+ chat page now works to the extent i want for now. i might finish chat before upgrades, but idk yet',
                '+ changed the change log to load more dynamically, easier to add new updates to the changelog, and made the html file smaller'
            ]
        },
        {
            "header": "Alpha 0.3.3 - Build 30 - Upgrades-pre5",
            "note": "upgrades are still a ways away, but have another prerelease",
            "changes": [
                "* changed some transition effects",
                "+ there is now a purchased upgrade section in stats",
                "+ added a few more upgrades",
                "+ added new building, memelord",
                "* copied cookie clickers balancing for building price and lbps, early game felt too fast",
                "as usual, join the [discord] for the latest news on stuff"
            ]
        },
        {
            "header": "Alpha 0.3.2 - Build 28 - Upgrades-pre4",
            "note": "still not upgrades fully released yet, but there are a few changes",
            "changes": [
                "* changed some styling, looking into support for themes",
                "+ added some basic framework for achivements, but not much",
                "* changed some transitions to be bouncy, will probably change later to be less bouncy",
                "* added comment in html about gdpr"
            ]
        },
        {
            "header": "Alpha 0.3.1 - Build 27 - Upgrades-pre3",
            "note": "",
            "changes": [
                "+ forgot to add a building i had made to building list, so i did that",
                "+ added 3 tiered upgrades to gamer, no lifer, and epic gamer"
            ]
        },
        {
            "header": "Alpha 0.3.0 - Build 26 - Upgrades-pre2",
            "note": "",
            "changes": [
                "* fixed buyable indicator to include buildingDiscount"
            ]
        },
        {
            "header": "Alpha 0.3.0 - Build 25 - Upgrades-pre1",
            "note": "Currently upgrades for building price, click power, noob, and player lbps",
            "changes": [
                "im not gonna put changelogs here because all i really did was open upgrades by default",
                "looking into having a beta branch so people can opt out of having their save wiped",
                "oh btw, i fixed the buy 10, 100 buttons, and splash ticker"
            ]
        },
        {
            "header": "Alpha 0.2.6 - Build 24",
            "note": "The Smoothing Part 3.1? Maybe (shrug)<br>This update shouldnt break saves, hopefully...",
            "changes": [
                "+ added 4 new splash texts",
                "* fixed 100 errors a second",
                "* splashes should no longer appear twice in a row"
            ]
        },
        {
            "header": "Alpha 0.2.5 - Build 22 - <b>The Smoothing <i>Part 3</i></b>",
            "note": "<i style=\"color: gray\">This last part of the smoothing will contain a beta version of upgrades, if you experience any issues, please tell me on [discord].</i><br>I was going to include beta testing for upgrades, but decided against it, as the smoothing is ui improvements, not upgrades.<br>However, progress on upgrades is currently :ok_hand: and if you really want to try the few upgrades there are currently, open inspect element console, and type <code>loadUpgrades()</code>",
            "changes": [
                "+ added a splah text, clicking it will instantly change it, but it also changes like every 15 to 30 seconds, i dont remember it is lol",
                "+ more rounded stuff",
                "+ buildings are now colored greed if you can buy them, and red if you cant",
                "+ you can click on tab headers to open that tab"
            ]
        },
        {
            "header": "Alpha 0.2.1 - Build 18 - <b>The Smoothing <i>Part 2</i></b>",
            "note": "Upgrades are coming soon, after the smoothing part 3 probably",
            "changes": [
                "+ more rounded stuff",
                "+ all tabs are now visible but collapse, part 3 will make them clickable to expand"
            ]
        },
        {
            "header": "Alpha 0.2.0 - Build 16 - <b>The Smoothing <i>Part 1</i></b>",
            "note": "Saves are going to be reset a lot in the near future. Don't get too attached to your saves",
            "changes": [
                "+ made tabs of middle bar look nicer",
                "+ added 4 new buildings, noob, speedrunner, streamer, and modder",
                "* buildings are now revealed after having at least 1 of the building before it",
                "* building layout changed, top row shows name, count, and lbps. putting mouse over building reveal cost and buy buttons",
                "* all existing building were pushed up, as noob replaced player, player replaced gamer, etc..."
            ]
        },
        {
            "header": "Alpha 0.1.7c - Build 14",
            "note": "Im sorry, but this update breaks existing saves, and I am unable to figure out how to fix this.<br>I need a better way to convert saves to newer versions, but until then, <b>do not expect your save to be fully stable until release</b>.<br>In order to play again, you must reset your save, then reload the page. Again, this will issue will be fixed in a future update.",
            "changes": []
        },
        {
            "header": "Alpha 0.1.7b - Build 13",
            "note": "Testing to fix everything because everything broke",
            "changes": []
        },
        {
            "header": "Alpha 0.1.7 - Build 12",
            "note": "Hey. I just added this changelog!",
            "changes": [
                "+ added changelog",
                "+ added a bunch of tabs",
                "* moved total lootboxes to stats tab",
                "+ options tab lets you change number notation"
            ]
        }
    ],
    "next": [
        "- prestige - ascend (probably alpha 0.7 or 0.8)",
        "- prestige - trancend (probably beta)",
        "- acheivements (probably beta something)",
        "- online chat (SOON MAYBE IDK THERES A LOT OF ISSUES AHHH)",
        "- clickables like golden cookies (maybe alpha 0.7ish)",
        "- online play (beta probably)",
        "- some kind of mod support with an API for making new stuff"
    ],
    "header": [
        "<p style='text-align: center;color: red;'>If you play on FireFox, Opera, IE, or Normal Edge, you may have problems!</p>",
        "<p style='text-align: center;color: red;'>This game was mostly tested in <a href='https://microsoftedgeinsider.com'>Edge Canary 79 (Edge Insider Build)</a> and <a href='https://www.google.com/chrome/canary/'>Chrome Canary 79</a></p>",
        "<br><a href='https://discord.gg/nHkGBun'>Join the discord for the latest news, updates, and to provide feedback or bug reports.</a>",
        "<p>Hey, theres a [test-branch] now!"
    ]
}

function changelogHeader() {
    ret = ""
    for (var line in changelog["header"]) {
        ret += changelog["header"][line]
    }
    return ret
}

function changelogNext() {
    ret = "<div class='cl-next'><h3 style='margin-bottom:0px'>Planned Features:</h3>"
    for (var next in changelog["next"]) {
        ret += changelog["next"][next] + "<br>"
    }
    return ret + "</div>"
}

/*
"versionInfo": {
                "branch": "test",
                "date": "10/11/2019",
                "build": 71,
                "verString": "Alpha 0.5.3",
                "verName": null
            },
            */
function formatChangelogHeader(data) {
    ret = ""

    if (data['branch'] == "test") {
        ret += "TB> "
    } else if (data['branch'] == "release") {
        ret += "Release> "
    } else {
        ret += data['branch'] + "> "
    }

    ret += data['verString']

    if (data['verName'] != null) {
        ret += " - " + data['verName']
    }

    ret += " - Build " + data['build'].toString() + " - "
    ret += "[" + data['date'] + "]"

    ret = "<h3 style='margin-bottom:0px'>" + ret + "</h3>"
    return ret;
}

function changelogContent() {
    ret = ""
    for (var update in changelog['allUpdates']) {
        tu = changelog["allUpdates"][update]
        ret += "<div class='cl-update'>"
        if (tu['versionInfo'] != null) {
            ret += formatChangelogHeader(tu['versionInfo'])
        } else {
            ret += "<h3 style='margin-bottom:0px'>" + tu.header + "</h3>"
        }
        if (tu.note != "") {
            ret += tu.note + "<br>"
            if (tu.changes.length > 0) {
                ret += "<br>"
            }
        }
        if (tu.changes.length > 0) {
            if (tu.note == "") {
                ret += "<br>"
            }
            ret += '<div class="cl-update-notes"><h4 style="margin-bottom:0px;margin-top:0px">Update Notes:</h4>'
            for (var change in tu.changes) {
                ret += tu.changes[change] + "<br>"
            }
            ret += '</div>'
        }
        ret += "</div>"
        ret += "<br>"
    }
    //replaces preset strings with other preset strings
    ret = ret.replace("[discord]", "<a href='https://discord.gg/nHkGBun'>discord</a>")
    ret = ret.replace("[test-branch]", "<a href='https://thederpymemesquad.github.io/ibr-beta/client/index.html'>test branch</a>")

    return ret
}

function populateChangelogTab() {
    var cl = document.getElementById('changelog-content')
    var fullContent = ""
    fullContent += changelogHeader()
    fullContent += changelogNext() + "<hr>"
    fullContent += changelogContent() + "<hr>You reached the end of the changelog!"
    cl.innerHTML = fullContent;
}