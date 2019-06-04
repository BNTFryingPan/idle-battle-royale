import socket
import sys
import threading
import json
import time
import logging

clientVersionString = "a 0.1.0"
clientProtocolVerson = 2

#CURRENCY = LOOTBOXES

# minor issue, i think i might make the client web only for a while

def launchGame():
    serverhost = input("Server Adress: ")
    username = input("Username: ")
    #password = input("Password: ") # commented out until i actually add passwords after making the auth server
    hostport = serverhost.split(':')
    if len(hostport) == 1:
        print("Using default port 25545")
        host = hostport[0]
        port = 25545
    else:
        host = hostport[0]
        try:
            port = int(hostport(1))
        except TypeError:
            print("Invalid Port! Using default port 25545")
            port = 25545
    game = client(host, port, username)
    game._startClient()

class client(object):
    def __init__(self, host, port, username):
        self.ready = False
        self.host = host
        self.port = port
        self.hostname = (self.host, self.port)
        self.username = username
        self.sock = socket.socket()
        self.isClosing = False

    def _send(self, packet):
        self.sock.sendto(bytes(packet, "utf-8"), self.hostname)

    def _startClient(self):
        a = threading.Thread(target=self._recvThread)
        b = threading.Thread(target=self._inputThread, daemon=True)
        a.start()
        try:
            self._startFirstSocket()
            self._connect()
            self._startHandshake()
        except Exception:
            print("An error occured. Aborting connection.")
            self.sock.close()
            sys.exit()
        b.start()

    def _startFirstSocket(self):
        self.sock = socket.socket()
        self.sock.setblocking(True)
        self.sock.settimeout(None)
        self.sock.setsockopt(socket.SOL_SOCKET, socket.SO_KEEPALIVE, 1)
        self.sock.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    
    def _connect(self):
        self.sock.connect(self.hostname)

    def _startHandshake(self):
        print("Connected to " + self.host + ":" + str(self.port))
        print("Starting handshake...") # currently, 'authentication' just makes sure the client isnt modded, this will change though
        self._send("hs user %" + self.username)
        self.ready = True
        #print("sent handshake")

    def _recvThread(self):
        loop = True
        while loop:
            if self.isClosing:
                break
            if self.ready: #and self.socketOpen:
                try:
                    ret = self.sock.recv(1024)
                    if not ret:
                        print("Disconnected from server.")
                        self.isClosing = True
                        break
                    callback = ret.strip().decode()
                    #print("from server > " + str(callback))
                    if callback.startswith("hs return $ username taken"):
                        self._send("hs cancel %" + self.username)
                        self.sock.close()
                        print("Username is already taken on this server!")
                        break

                    elif callback.startswith("hs return $ unsupported client"):
                        self._send("hs cancel %" + self.username)
                        self.sock.close()
                        print("Server does not support this client")
                        break

                    elif callback.startswith("hs return $ auth complete"):
                        self._send("hs confirm %" + self.username)
                        print("Authentication complete!")

                    elif callback.startswith('sysmsg $'):
                        print("[SYSTEM>>- " + '%'.join(callback.split('%')[1::]) + "]")

                    elif callback.startswith('chatmsg $'):
                        stage2 = callback.split('$')
                        stage1 = stage2[1::]
                        stage0 = "$".join(stage1)
                        chatdata = json.loads(stage0)
                        print(chatdata['content'])

                    #else:
                        #if callback != "":
                            #print(callback)
                except (ConnectionAbortedError,OSError):
                    pass
                except Exception as err:
                    print("An error occured in recv thread.")
                    self.isClosing = True
                    try:
                        self._send("quit %" + self.username)
                    except:
                        pass
                    raise err
            #else:
                #print('not ready')
                time.sleep(0.1)
        self.isClosing = True

    def _inputThread(self):
        loop = True
        while loop:
            if self.isClosing:
                break
            try:
                inp = input("")
                if inp.startswith("/"):
                    if inp.startswith('/exit'):
                        self._send('quit %' + self.username)
                        print("Leaving Server")
                        self.sock.close()
                        self.isClosing = True
                    # here, we will parse the message as a command, and see if its a local command or a server command
                else:
                    chatpacketjson = json.loads('{"type":"chat","username":"' + str(self.username) + '","message":"' + inp + '"}')
                    chatpacketstr = json.dumps(chatpacketjson, separators=(',', ':'))
                    self._send("chatevent %" + chatpacketstr)
            except (KeyboardInterrupt,EOFError):
                self.isClosing = True
                print("Leaving Server")
                try:
                    self._send('quit %' + self.username)
                    self.sock.close()
                except:
                    pass
            except Exception as err:
                print('Error occured in input thread. Stopping client...')
                self.isClosing = True
                try:
                    self._send('quit %' + self.username)
                    self.sock.close()
                except:
                    pass
                raise err
        self.isClosing = True

launchGame()
