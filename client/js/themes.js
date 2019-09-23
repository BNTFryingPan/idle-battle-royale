var themeList = [
    'classic',
    'dark'
    //'light',
]

function setTheme(themeLocation) {
    document.getElementById('theme').href = themeLocation
}

function setLocalTheme(name) {
    document.getElementById('theme').href = './themes/' + name + '.css'
}

function updateThemeFromSelector() {
    document.getElementById('theme').href = './themes/' + document.getElementById('option-theme').value + '.css'
}