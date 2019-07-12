function chatCacheElements() {
    //chatOutput = document.getElementById('chat-log')
    //chatInput = document.getElementById('chat-inp')
    chatButton = document.getElementById('chat-button')
    //chatButton.enabled = true;
}

var ws;

function chatDataInit() {
    this.isConnected = false
    this.username = 'none'
    this.connectedTo = null
    this.clientid = -1
    this.lastInput = ''
}

var chatData = new chatDataInit()

function initWebsocket(address) {
    ws = new WebSocket(address)
    ws.onopen = function() {
        logToChatOutput('<i>Connected to chat server, <b>Logging in...</b></i>')
        chatData['isConnected'] = true
        loginToChat()
    }

    ws.onerror = function(e) {
        logToChatOutput('<b>Error:</b> <i>' + e.data + '</i>')
    }

    ws.onmessage = function(e) {
        if (e.data == 'disconnected') {
            ws.send('disconnecting')
            ws.close()
        } else if (e.data.startsWith('directLog $')) {
            logToChatOutput(e.data.slice(11))
        } else {
            logToChatOutput('<b>From Server:</b> ' + e.data)
        }
        //console.log(e)
    }

    ws.onclose = function() {
        logToChatOutput('<b>Disconnected from server!</b>')
        chatData['isConnected'] = false
        showLoginPrompt();
    }
}

helpString = `Available commands:
/help
/connect <address> <username>`

//function connectButton() {

//}
//document.addEventListener()

function sendPacket(data) {
    if (chatData['isConnected'] == true) {
        ws.send(data)
    } else {
        logToChatOutput('<b>Error:</b> <i>Chat client sent packet before ws connected!</i>')
    }
}

function sendChatPacket(msg) {
    var packetData = {'message': msg, 'user': chatData['username']}
    sendPacket('chat %' + JSON.stringify(packetData))
}

function loginToChat() {
    //chatData['username'] = username
    sendPacket('login %' + chatData['username'])
    logToChatOutput('<i>Logged into chat server as ' + chatData['username'] + '</i>')
}

function connectToServer(address, username) {
    if (chatData['isConnected'] != true) {
        chatData['username'] = username
        initWebsocket(address)
    } else {
        logToChatOutput('Already connected to a server! Do /disconnect first!')
    }
}

function logToChatOutput(msg) {
    var chatOutput = document.getElementById('chat-log');
    chatOutput.innerHTML += '<br>' + msg;
    chatOutput.scrollTop = chatOutput.scrollHeight;
}

function loginToChatWithForm() {
    var username = document.getElementById('clp-user').value;
    var server = document.getElementById('clp-address').value;
    var server = "wss://leotomas.ddns.net:25544"
    logToChatOutput(username + " -> " + server)
    hideLoginPrompt()
    connectToServer(server, username)
}

function hideLoginPrompt() {
    document.getElementById('chat-login-prompt').style.zIndex = -5
    document.getElementById('chat-button').enabled = true
    //logToChatOutput('hidden login')
}

function showLoginPrompt() {
    document.getElementById('chat-login-prompt').style.zIndex = 5
    document.getElementById('chat-button').enabled = false
}

function loadChatPopout() {
    document.getElementById('chat-log').remove();
    document.getElementById('chat-input').remove();
    document.getElementById('chat-button').remove();
    chatOutBox = document.createElement('div');
    chatOutBox.id = 'chat-log';
    chatOutBox.style = 'height: 95%';
    chatOutBox.class = 'chat-only';
    chatOutBox.innerHTML = '<b>Type /connect [address] [username] to connect to chat</b>';
    chatInBox = document.createElement('input');
    chatInBox.type = 'text';
    chatInBox.id = 'chat-input';
    chatInBox.placeholder = 'Type a message here!';
    chatInBox.style = 'width: 90%; height: 4%';
    chatSendBtn = document.createElement('button');
    //console.log('creating button data')
    chatSendBtn.id = 'chat-button';
    chatSendBtn.class = 'fancy-button';
    chatSendBtn.onclick = function() {sendChatMessage()}
    chatSendBtn.innerHTML = 'Send';
    chatSendBtn.enabled = true
    chatSendBtn.style = 'width: 9%; height: 4%';
    //console.log('created button')
    var c = document.getElementById('client');
    c.appendChild(chatOutBox);
    c.appendChild(chatInBox);
    c.appendChild(chatSendBtn);
    c.style.display = 'block';

    loadChatInputEnterThing();
}

function loadChatInputEnterThing() {
    document.getElementById('chat-input').addEventListener("keyup", event => {
        if (event.key === 'Enter') {
            sendChatMessage();
            event.preventDefault();
        } else if (event.key === 'ArrowUp') {
            var inp = document.getElementById('chat-input').value;
            document.getElementById('chat-input').value = chatData.lastInput;
            chatData.lastInput = inp;
        } else {
            return false;
        }
    })
}

function sendChatMessage() {
    var chatInput = document.getElementById('chat-input');
    var msg = chatInput.value;
    chatData.lastInput = msg;
    //console.log(chatOutput.value)
    if (msg.startsWith('/')) {
        var cmdargs = msg.split(' ')
        if (msg.startsWith('/help')) {
            logToChatOutput("<i>" + helpString + "</i>")
        } else if (msg.startsWith('/showlogin')) {
            showLoginPrompt()
            logToChatOutput('Made login prompt visible!')
        } else if (msg.startsWith('/hidelogin')) {
            hideLoginPrompt()
            logToChatOutput('Hidden login prompt. click <b onclick="showLoginPrompt()">here</b> to show again.')
        } else if (msg.startsWith('/disconnect')) {
            if (chatData['isConnected'] == true) {
                sendPacket("/exit")
            }
        } else if (msg.startsWith('/connect')) {
            if (chatData['isConnected'] != true) {
                address = cmdargs[1]
                username = cmdargs[2]
                if (address == null || username == null) {
                    logToChatOutput("<i>Usage: /connect [address] [username]</i>")
                } else {
                    connectToServer(address, username)
                }
            } else {
                logToChatOutput("<i>You are already connected to a chat server!</i>")
            }
        } else {
            logToChatOutput('<i>Invalid Command.</i>')
        }
    } else {
        if (msg != '') {
            if (chatData['isConnected'] != true) {
                logToChatOutput('<i>You must connect to a chat server first!</i>')
            } else {
                logToChatOutput(msg)
                sendChatPacket(msg)
            }
        }
    }
    chatInput.value = "";
}