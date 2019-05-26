import socketserver
import socket
import logging
import json
import threading
import library as lib

#socketserver.

#logging.basicConfig()

serverVersionString = "a 0.0.1"
serverProtocolVersion = 1

#import modloader # work in progress

#server = socketserver.TCPServer()

def startServer():
    global server
    global serverThread
    server = gameServer(serverProtocolVersion, serverVersionString)
    serverThread = threading.Thread(target=server.start())
    serverThread.start()

class client(object):
    def __init__(self, username, address, sock):
        self.username = username
        self.address = address
        self.socket = sock
        #if self.socket == None:
            #self.socket = socket.create_connection(self.address)

    def _send(self, packetType, data):
        self.socket.sendto(packetType + " $" + data, self.address)

class gameServer(object):
    def __init__(self, protocolver, verstirng):
        self.gamedata = {"usernames":[],"playerdata":{}}
        self.clients = {} #dict of uuid:client object
        self.userUUIDs = {} #dict of username:uuid
        self.protocolVersion = protocolver
        self.versionString = verstirng

    def start(self):
        self.sockserver = socketserver.ThreadingTCPServer(('localhost', 25545), packetHandler)
        self.sock = self.sockserver.socket
        #self.sockserver.
        self.sockserver.serve_forever()

    def formatAddress(self, address):
        return "{0[0]}:{0[1]}".format(address)

    def handlePacket(self, packet):
        #pack = {}
        #print(str(packet.data))
        rawdata = packet.request.recv(1024)
        if not rawdata:
            print("connection lost to a client")
        else:
            data = rawdata.strip().decode()
            #data = packet.data
            print("< " + data)

    def sendPacket(self, packet, to):
        """to should be either a username or a UUID"""
        try:
            out = self.clients[to]
        except KeyError:
            try:
                out = self.clients[self.userUUIDs[to]]
            except KeyError:
                raise AttributeError("No client found!")

        out.sendall(packet)
        print(str(to) + ' > ' + str(packet))
        

    def broadcast(self, packet, exclude=[]):
        if type(packet) != type(b""):
            packet = bytes(packet, 'utf-8')
        for _client in self.clients:
            if _client not in exclude:
                self.sock.sendto(packet, _client)
                #self.clients[_client].send(packet)
        print("broadcast > " + str(packet))

class packetHandler(socketserver.BaseRequestHandler):
    """Represents a game server. the server should only need to make one of these objects."""

    def handle(self):
        global server
        #print("client address: " + str(self.client_address))
        # self.request is the TCP socket connected to the client
        #server.handlePacket(self.request.recv(1024))
        server.handlePacket(self)
        #self.data = self.request.recv(1024).strip()
        #fullpacket = self.data.decode()
        #print("{} wrote:".format(self.client_address[0]))
        #print(fullpacket)
        # just send back the same data, but upper-cased
        #self.request.sendall(self.data.upper())
        
class clientHandler(object):
    def __init__(self, username, socketobj):
        self.conn = socketobj
        self.username = username

    def inputThread(self):
        pass

    def sendPacket(self, packet):
        pass
        

if __name__ == "__main__":
    startServer()