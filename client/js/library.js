// this file contains a lot of code copied off the internet from places like stack overflow.
// although i would love to credit everybody who made them, i cant because the people who post
// answers could get that from somewhere else, so im just choosing to credit 'people on stack overflow'

function lzw_encode(s) {
    var dict = {};
    var data = (s + "").split("");
    var out = [];
    var currChar;
    var phrase = data[0];
    var code = 256;

    for (var i=1; i<data.length; i++) {
        currChar=data[i];
        if (dict['_' + phrase + currChar] != null) {
            phrase += currChar;
        } else {
            out.push(phrase.length > 1 ? dict['_'+phrase] : phrase.charCodeAt(0));
            dict['_' + phrase + currChar] = code;
            code++;
            phrase=currChar;
        }
    }
    out.push(phrase.length > 1 ? dict['_'+phrase] : phrase.charCodeAt(0));
    
    for (var i=0; i<out.length; i++) {
        out[i] = String.fromCharCode(out[i]);
    }
    return out.join("");
}

function lzw_decode(s) {
    var dict = {};
    var data = (s + "").split("");
    var currChar = data[0];
    var oldPhrase = currChar;
    var out = [currChar];
    var code = 256;
    var phrase;
    
    for (var i=1; i<data.length; i++) {
        var currCode = data[i].charCodeAt(0);
        
        if (currCode < 256) {
            phrase = data[i];
        } else {
            phrase = dict['_'+currCode] ? dict['_'+currCode] : (oldPhrase + currChar);
        }
        out.push(phrase);
        currChar = phrase.charAt(0);
        dict['_'+code] = oldPhrase + currChar;
        code++;
        oldPhrase = phrase;
    }
    return out.join("");
}

function encode_utf8(s) {
    return unescape(encodeURIComponent(s));
}

function decode_utf8(s) {
    return decodeURIComponent(escape(s));
}

function abbrNum(number, notation="opt") { 
    if (notation == "opt") { 
        notation = window.game.options['shortNumbers']
    } else if (!notation in ['short', 'long', 'sci', 'raw']) {
        console.warn('WARNING: Invalid use of abbrNum(), valid arg2 options are [opt, short, long, sci, raw], not ' + notation + '. Reverting to default of opt')
        notify('Error!', "Invalid use of abbrNum()<br>Check console for details")
        notation = window.game.options['shortNumbers']
    }
    decPlaces = 3; decPlaces = Math.pow(10,decPlaces);
    number = parseFloat(number.toFixed(2))
    //this little bit of code was taken from main.js of cookie clicker 2.019 and slightly modified
    var longShort = [' thousand', ' million', ' billion', ' trillion', ' quadrillion', ' quintillion', ' sextillion', ' septillion', ' octillion', ' nonillion'];
    var longPrefixes = [' ', ' un', ' duo', ' tre', ' qattuor', ' quin', ' sex', ' septen', ' octo', ' novem'];
    var longSuffixes = ['decillion', 'vigintillion', 'trigintillion', 'quadragintillion', 'quinquagintillion', 'sexagintillion', 'septuagintillion', 'octogintillion', 'nonagintillion'];
    var shortShort = ['k', 'm', 'b', 't', 'q', 'Q', 's', 'S', 'o', 'n'];
    var shortPrefixes = ['', 'u', 'd', 't', 'q', 'Q', 's', 'S', 'o', 'n'];
    var shortSuffixes = ['d', 'v', 't', 'q', 'Q', 's', 'S', 'o', 'n'];
    // scientific notation part here wasnt from cookie clicker
    var shortSci = []
    for (var i = 3; i <= 304; i+=3) {
        shortSci.push("e+" + i)
    }

    for (var i in longSuffixes ) {
        for (var ii in longPrefixes ) {
            longShort.push(' '+longPrefixes[ii]+ longSuffixes[i] ); 
        }
    }

    for (var i in shortSuffixes) {
        for (var ii in shortPrefixes) {
            shortShort.push(''+shortPrefixes[ii]+shortSuffixes[i]); 
        } 
    } 
    // end code 'stolen' from cookie clicker
    try {
        if (notation == "raw") { 
            return number.toString() 
        } else if (notation == "long") { 
            var abbrev = longShort; 
        } else if (notation == "short") {
            var abbrev = shortShort; 
        } else if (notation == "sci") { 
            var abbrev = shortSci; 
        } else { 
            var abbrev = longShort; 
        }
    } catch {
        abbrev = shortShort;
    }
    for (var i=abbrev.length-1; i>=0; i--) {
        var size = Math.pow(10,(i+1)*3);
        if(size <= number) {
            number = Math.round(number*decPlaces/size)/decPlaces;
            if((number == 1000) && (i < abbrev.length - 1)) {
                number = 1;i++;
            }
            number += abbrev[i];
            break;
        }
    }
    return number;
}

function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

function getCurrentTime() {
    var d = new Date();
    var h = addZero(d.getHours());
    var m = addZero(d.getMinutes());
    var s = addZero(d.getSeconds());
    return h + ":" + m + ":" + s;
}

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(
        /[?&]+([^=&]+)=([^&]*)/gi,
        function(m,key,value) {
            vars[key] = value;
        });
    return vars; 
}

function getUrlParam(parameter, defaultvalue) {
    var urlparameter = defaultvalue;
    if (window.location.href.indexOf(parameter) > -1) {
        urlparameter = getUrlVars()[parameter];
    }
    return urlparameter;
}


window.onmousemove = function (e) {
    if (!int.isLoaded) {return}
    var x = e.clientX,
        y = e.clientY;
    document.getElementById('tooltip').style.top = (y+5) + 'px';
    document.getElementById('tooltip').style.left = (x+5) + 'px';

    if (x < window.innerWidth / 3.5) {
        document.getElementById('tooltip').style.transform = "translate(0, 0)";
    } else {
        document.getElementById('tooltip').style.transform = "translate(-100%, 0)";
    }


    hoveredElement = document.elementFromPoint(x, y)
    hoveredElementTT = hoveredElement.getAttribute('data-tt')
    if (hoveredElementTT != null) {
        setToolTip(hoveredElementTT);
    } else {
        hideToolTip()
    }
    
};

function setToolTip(text) {
    document.getElementById('tooltip').classList.add('visible')
    document.getElementById('tooltip-header').innerHTML = text
}

function hideToolTip() {
    document.getElementById('tooltip').classList.remove('visible')
}

function showPopupDialog(title, content) {
    
}

window.onerror = function(e) {
    notify('Error!', "Check the console for details! ")
}