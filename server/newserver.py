import socket
import time
import threading
import json
import logging as log
import urllib


#import serverproperties as cfg

#import socketserver

#server = socketserver.ThreadingTCPServer()
#server.

#sock = socket.socket()

#sock.connect(('localhost', 25545))
#sock.bind(('localhost', 25545))
#sock.listen()

class client(object):
    def __init__(self, address, connection, uuid, server):
        """Currently you should use the username instead of a UUID, as the auth server hasnt been made yet"""
        self.address = address
        self.connection = connection
        self.uuid = uuid
        self.server = server
        self._getUsername()

    def _getUsername(self):
        self.username = self.uuid
        return self.username

    def _send(self, packet):
        if type(packet) == type(b"hello"):
            self.connection.sendall(packet)

        else:
            self.connection.sendall(bytes(packet, 'utf-8'))

    def _clientLoop(self):
        while True:
            try:
                packet = self.connection.recv(1024)
                if not packet:
                    print("disconnected from client")
                    self.server._handleDisconnect(self)
                    break
                else:
                    print(str(self.address) + "> " + str(packet))
                    self._handlePacket(packet)
            except (ConnectionResetError,ConnectionAbortedError,ConnectionRefusedError,ConnectionError):
                print("disconnected from client")
                self.server._handleDisconnect(self)
                break
            #print('packet get')

    def _handlePacket(self, packet):
        data = packet.strip().decode()
        if data.startswith('hs '):
            if data.startswith('hs user %'):
                username = data.split('%')[1]
                if username.startswith('*modded-'):
                    print("Unsupported client")
                    self._send(bytes('hs return $ unsupported client', "utf-8"))
                elif username in self.server.gamedata['usernames']:
                    print('Username taken')
                    self._send(bytes("hs return $ username taken", "utf-8"))
                else:
                    print("Auth complete")
                    self._send(bytes("hs return $ auth complete", "utf-8"))
                    self.server.gamedata['usernames'].append(username)
                    #user = client(self.address, self.connection, self.username, self.server)
                    #self.server.clients[username] = user
                    #self.server.clients[username] = packet.request
                    self.server.broadcast("sysmsg $[+] " + username + " has joined the game.")
            elif data.startswith('hs confirm %'):
                print("Auth confirmed")
            elif data.startswith('hs cancel %'):
                print('Client canceled authentication')
        elif data.startswith('quit %'):
            username = data.split('%')[1]
            self.server.broadcast("sysmsg $[-] " + username + " has left the game.")
        elif data.startswith('chatevent %'):
            # the chat packet should be a json formatted string
            cpack = data.split("%")
            fpack = "%".join(cpack[1::])
            spack = json.loads(fpack)
            self.server._handleChatMsg(spack)
            #self.server.broadcast("chatmsg $" + spack["username"] + "> " + spack["message"])
        elif data.startswith('game.requestdata %'):
            # retreive this players data
            playerdata = self.server.gamedata['playerdata'][self.uuid]
            self.playerdata = playerdata
            self._send('game.data $')
        else:
            print("Unknown packet type!")



class gameServer(object):
    def __init__(self, protocolver, verstirng):
        self.gamedata = {
            "usernames": [], #list of usernames on the server
            "playerdata": {} # dict of uuid:{playerdata}
            }
        self.clients = [] #list of clients
        self.userUUIDs = {} #dict of username:uuid
        self.protocolVersion = protocolver
        self.versionString = verstirng
        self.sock = socket.socket()
        #self.authSock = socket.socket()

    def _handleDisconnect(self, client):
        self.clients.remove(client)
        #self.gamedata['usernames'].remove(client.uuid)
        
    def _sendPacket(self, client, packetType, packetData):
        packet = packetType + " $" + packetData
        client._send(packet)

    def _handleChatMsg(self, chatmsg):
        if type(chatmsg) == type(""):
            pass
        elif type(chatmsg) == type({}):
            if chatmsg["type"] == "chat":
                self.broadcast("chatmsg $" + '{"content":"' + chatmsg["username"] + '> ' + chatmsg["message"] + '"}')

    def _startServer(self):
        self.sock.bind(("localhost", 25545))
        self.sock.listen()
        self._acceptConnLoop()

    def _pingAuthServer(self):
        pass

    def _acceptConnLoop(self):
        print("Now listening...\n")
        while True:
            print('looking for new connections')
            conn, addr = self.sock.accept()

            #print('New connection from %s:%d' % (addr[0], addr[1]))
            #print("new connection")
            _client = client(addr, conn, "unknown", self)
            #print('created client object')
            self.clients.append(_client)
            #print('added client to list')
            a = threading.Thread(target=_client._clientLoop)
            a.start()
            #print('created client thread')
            #_client._clientLoop()
            #data = conn.recv(1024)
            #if not data:
            #    break
            #elif data == 'killsrv':
            #    conn.close()
            #    sys.exit()
            #else:
            #    print(data)
    
    def broadcast(self, packet):
        for _client in self.clients:
            _client._send(packet)

        print('sending ' + str(packet))
        
        #if packet.startswith("sysmsg $"):
        #    print()

if __name__ == '__main__':
    serv = gameServer(2, "a 0.1.0")
    serv._startServer()