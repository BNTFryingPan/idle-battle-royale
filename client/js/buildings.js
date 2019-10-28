// sorry ortiel but i stole your balancing because its so good lol
function bicon(name) {
    return './icons/buildings/' + "noob" + '.png'
}

var noob = {
    name: "Noob",
    intname: "noob",
    icon: bicon('noob'),
    parent: {amount: 1},
    desc: "<i>quiet, these people cant know whats actually going on</i>",
    basepersec: 0.1,
    persec: 0.1,
    multiplier: 1,
    basecost: 15,
    amount: 0,
    multiplier: 1,
    onBuy: function() {},
    onSell: function() {}
}

var player = {
    name: "Player",
    intname: "player",
    icon: bicon('player'),
    parent: "noob",
    desc: "just your average player of video games",
    basepersec: 1,
    persec: 1,
    multiplier: 1,
    basecost: 100,
    amount: 0,
    multiplier: 1,
    onBuy: function() {},
    onSell: function() {}
}

var gamer = {
    name: "Gamer",
    intname: "gamer",
    icon: bicon('gamer'),
    parent: "player",
    desc: "<b>gamer time</b>",
    basepersec: 8,
    persec: 8,
    multiplier: 1,
    basecost: 1100,
    amount: 0,
    multiplier: 1,
    onBuy: function() {},
    onSell: function() {}
}

var nolife = {
    name: "No Lifer",
    intname: "nolife",
    icon: bicon('nolife'),
    parent: "gamer",
    desc: "Dont you hate it when you have to fight someone whos played their entire life and you just started?",
    basepersec: 47,
    persec: 47,
    multiplier: 1,
    basecost: 12e3,
    amount: 0,
    multiplier: 1,
    onBuy: function() {},
    onSell: function() {}
}

var epicgamer = {
    name: "Epic Gamer",
    intname: "epicgamer",
    icon: bicon('epicgamer'),
    parent: "nolife",
    desc: "These guys really know what they are doing",
    basepersec: 260,
    persec: 260,
    multiplier: 1,
    basecost: 13e4,
    amount: 0,
    multiplier: 1,
    onBuy: function() {},
    onSell: function() {}
}

var speedrunner = {
    name: "Speedrunner", 
    intname: "speedrunner",
    icon: bicon('speedrunner'),
    parent: "epicgamer",
    desc: "Id like to somehow make this game appeal at GDQ. not sure how. probably some interesting button placement",
    basepersec: 1400,
    persec: 1400,
    multiplier: 1,
    basecost: 14e5,
    amount: 0,
    multiplier: 1,
    onBuy: function() {},
    onSell: function() {}
}

var streamer = {
    name: "Streamer",
    intname: "streamer",
    icon: bicon('streamer'),
    parent: "speedrunner",
    desc: "shoutouts to twitch.......<br><a href='https://twitch.tv/titan_unlimited'>and titan",
    basepersec: 7800,
    persec: 7800,
    multiplier: 1,
    basecost: 2e7,
    amount: 0,
    multiplier: 1,
    onBuy: function() {},
    onSell: function() {}
}

var modder = {
    name: "Modder",
    intname: "modder",
    icon: bicon('modder'),
    parent: "streamer",
    desc: "Shoutouts to mods. they are pretty fun",
    basepersec: 44e3,
    persec: 44e3,
    multiplier: 1,
    basecost: 33e7,
    amount: 0,
    multiplier: 1,
    onBuy: function() {},
    onSell: function() {}
}

var celery = {
    name: "Celebrity",
    intname: "celery",
    icon: bicon('celery'),
    parent: "modder",
    desc: "They only play because you give them free stuff",
    basepersec: 26e5,
    persec: 26e5,
    multiplier: 1,
    basecost: 51e8,
    amount: 0,
    multiplier: 1,
    onBuy: function() {},
    onSell: function() {}
}

var memelord = {
    name: "Meme Lord",
    intname: "memelord",
    icon: bicon('memelord'),
    parent: "celery",
    desc: "Knows everything there is to know about memes",
    basepersec: 1.6e5,
    persec: 1.6e5,
    multiplier: 1,
    basecost: 71e9,
    amount: 0,
    onBuy: function() {},
    onSell: function() {}
}

var lawer = {
    name: "Legal Team",
    intname: "lawer",
    icon: bicon('lawer'),
    parent: "memelord",
    desc: "These guys are true boomers",
    basepersec: 1e7,
    persec: 1e7,
    multiplier: 1,
    basecost: 1e12,
    amount: 0,
    onBuy: function() {},
    onSell: function() {}
}

var b12 = {
    name: "Building 12",
    intname: "b12",
    icon: bicon('b12'),
    parent: "lawer",
    desc: "Placeholder building to help with progression. have an idea what should go here? put it on discord!",
    basepersec: 65e7,
    persec: 65e7,
    multiplier: 1,
    basecost: 14e12,
    amount: 0,
    onBuy: function() {},
    onSell: function() {}
}

var b13 = {
    name: "Building 13",
    intname: "b13",
    icon: bicon('b13'),
    parent: "b12",
    desc: "Placeholder building to help with progression. have an idea what should go here? put it on discord!",
    basepersec: 43e7,
    persec: 43e7,
    multiplier: 1,
    basecost: 17e13,
    amount: 0,
    onBuy: function() {},
    onSell: function() {}
}

var b14 = {
    name: "Building 14",
    intname: "b14",
    icon: bicon('player'),
    parent: "b13",
    desc: "Placeholder building to help with progression. have an idea what should go here? put it on discord!",
    basepersec: 29e8,
    persec: 29e8,
    multiplier: 1,
    basecost: 21e14,
    amount: 0,
    onBuy: function() {},
    onSell: function() {}
}

var b15 = {
    name: "Building 15",
    intname: "b15",
    icon: bicon('player'),
    parent: "b14",
    desc: "Placeholder building to help with progression. have an idea what should go here? put it on discord!",
    basepersec: 21e9,
    persec: 21e9,
    multiplier: 1,
    basecost: 26e15,
    amount: 0,
    onBuy: function() {},
    onSell: function() {}
}

var b16 = {
    name: "Building 16",
    intname: "b16",
    icon: bicon('player'),
    parent: "b15",
    desc: "Placeholder building to help with progression. have an idea what should go here? put it on discord!",
    basepersec: 15e10,
    persec: 15e10,
    multiplier: 1,
    basecost: 31e16,
    amount: 0,
    onBuy: function() {},
    onSell: function() {}
}

/// cost -> lbps
// ***1   tril -> 10  mil***
// ***14  tril -> 65  mil***
// ***170 tril -> 430 mil***
// ***2.1 quad -> 2.9 bil***
// ***26  quad -> 21  bil***
// ***310 quad -> 150 bil***

var buildings = {
    noob: noob,
    player: player,
    gamer: gamer,
    nolife: nolife,
    epicgamer: epicgamer,
    speedrunner: speedrunner,
    streamer: streamer,
    modder: modder,
    celery: celery,
    memelord: memelord,
    lawer: lawer,
    b12: b12,
    b13: b13,
    b14: b14,
    b15: b15,
    b16: b16
}

var priceMultiplier = 1.125;
var buildingBuyMode = true;