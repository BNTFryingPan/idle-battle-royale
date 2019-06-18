var changelog = {
    "allUpdates": [
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
                "as usual, join the discord for the latest news on stuff"
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
            "note": "<i style=\"color: gray\">This last part of the smoothing will contain a beta version of upgrades, if you experience any issues, please tell me on discord.</i><br>I was going to include beta testing for upgrades, but decided against it, as the smoothing is ui improvements, not upgrades.<br>However, progress on upgrades is currently :ok_hand: and if you really want to try the few upgrades there are currently, open inspect element console, and type <code>loadUpgrades()</code>",
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
        "- prestige (probably alpha 0.5 or 0.6)",
        "- acheivements (probably beta something)",
        "- online chat (THIS UPDATE PROBABLY)",
        "- clickables like golden cookies (maybe alpha 0.7ish)"
    ],
    "header": [
        "<p style='text-align: center;color: red;'>If you play on FireFox, Opera, IE, or Normal Edge, you may have problems!</p>",
        "<p style='text-align: center;color: red;'>This game was mostly tested in <a href='https://microsoftedgeinsider.com'>Edge Canary 76 (Edge Insider Build)</a> and <a href='https://www.google.com/chrome/canary/'>Chrome Canary 77</a></p>",
        "<br><a href='https://discord.gg/nHkGBun'>Join the discord for the latest news, updates, and to provide feedback or bug reports.</a>"
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
    ret = "<div class='cl-next'><h3 style='margin-bottom:0px'>Whats Next?</h3>"
    for (var next in changelog["next"]) {
        ret += changelog["next"][next] + "<br>"
    }
    return ret + "</div>"
}

function changelogContent() {
    ret = ""
    for (var update in changelog['allUpdates']) {
        tu = changelog["allUpdates"][update]
        ret += "<div class='cl-update'>"
        ret += "<h3 style='margin-bottom:0px'>" + tu.header + "</h3>"
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