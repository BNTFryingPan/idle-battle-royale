var themes = [
    {
        'name': "Classic (Default)",
        "file": 'classic'
    },
    {
        'name': 'Dark',
        'file': 'dark'
    },
    {
        'name': 'Light',
        'file': 'light'
    },
    {
        'name': 'Custom',
        'file': '%custom%'
    }
]

function setTheme(themeLocation) {
    if (themeLocation == null) {
        notify('Error!', "Game set null theme", 10);
        console.log('null theme set')
        return;
    }
    document.getElementById('theme-changer').innerHTML = "*{transition-duration: 0ms !important;}"
    document.getElementById('theme').href = themeLocation
    document.getElementById('custom-theme').href = "./style-req.css"
    var i = 0
    var clear = window.setInterval(function(){
        if (i > 2) {
            document.getElementById('theme-changer').innerHTML = "";
            window.clearInterval(clear);
        } else {
            i++;
        }
    }, 100)
}

function setCustomTheme(themeLocation) {
    document.getElementById('theme-changer').innerHTML = "*{transition-duration: 0ms !important;}"
    document.getElementById('custom-theme').href = themeLocation
    var i = 0
    var clear = window.setInterval(function(){
        if (i > 2) {
            document.getElementById('theme-changer').innerHTML = "";
            window.clearInterval(clear);
        } else {
            i++;
        }
    }, 100)
}

function setLocalTheme(name) {
    setTheme('./themes/' + name + '.css')
}

function updateThemeFromSelector() {
    var newTheme = document.getElementById('option-theme').value

    if (newTheme == "%custom%") {
        int.useCustomTheme = true;
        notify('custom theme enabled', 'use the new thing to set theme location')
        console.log('setting saved theme to custom')
        window.game.options['theme'] = 'custom'
        updateCustomTheme()
    } else {
        int.useCustomTheme = false;
        setLocalTheme(newTheme)
        window.game.options['theme'] = document.getElementById('option-theme').value
    }
}

function updateCustomTheme() {
    if (int.useCustomTheme) {
        console.log('setting custom theme')
        setCustomTheme(document.getElementById('custom-theme-location').value)
        window.game.options['customTheme'] = document.getElementById('custom-theme-location').value
    } else {
        notify('custom theme not enabled', 'if you want to set a custom theme, set theme to custom')
    }
}

function loadThemeFromSave() {
    document.getElementById('option-theme').value = window.game.options['theme'];
    if (window.game.options['theme'] == 'custom') {
        int.useCustomTheme = true
        document.getElementById('custom-theme-location').value = window.game.options['customTheme']
        console.log('loading custom theme')
        setCustomTheme(window.game.options['customTheme'])
    } else {
        setLocalTheme(window.game.options['theme']);
    }
}

function loadThemeSelector() {
    var themeSelector = document.getElementById('option-theme')
    for (var i = 0; i < themes.length; i++) {
        themeSelector.innerHTML = themeSelector.innerHTML + "<option value=" + themes[i].file + ">" + themes[i].name + "</option>"
    }
}