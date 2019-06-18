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
        logToChatOutput('<b>Error:</b> <i>' + e + '</i>')
    }

    ws.onmessage = function(e) {
        logToChatOutput('<b>From Server:</b> ' + e.data)
        //console.log(e)
    }

    ws.onclose = function() {
        logToChatOutput('<b>Disconnected from server!</b>')
        chatData['isConnected'] = false
    }
}

helpString = `Available commands: /help, /connect <address> <username>`

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
    sendPacket('chat $' + JSON.stringify(packetData))
}

function loginToChat() {
    //chatData['username'] = username
    sendPacket('login $' + chatData['username'])
    logToChatOutput('<i>Logged into chat server as ' + chatData['username'] + '</i>')
}

function connectToServer(address, username) {
    chatData['username'] = username
    initWebsocket(address)
}

function logToChatOutput(msg) {
    var chatOutput = document.getElementById('chat-log');
    chatOutput.innerHTML += '<br>' + msg;
    chatOutput.scrollTop = chatOutput.scrollHeight;
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
    //console.log('done')
}

function sendChatMessage() {
    var chatInput = document.getElementById('chat-input');
    var msg = chatInput.value
    //console.log(chatOutput.value)
    if (msg.startsWith('/')) {
        var cmdargs = msg.split(' ')
        if (msg.startsWith('/help')) {
            logToChatOutput(helpString)
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