import sys
import time
import threading
import socket
import json
import logging as log
import traceback
log.basicConfig(filename='clientlog.txt', filemode='w+', format='%(module)s: %(threadName)s: %(funcName)s: [%(levelname)s] %(message)s', level=log.DEBUG)

def cliSend(data):
    print(data)
    sys.stdout.flush()

class serverClient(object):
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
        b = threading.Thread(target=self.inpThread)
        a.start()
        try:
            self._startFirstSocket()
            self._connect()
            self._startHandshake()
        except Exception:
            cliSend("directLog $An error occured. Aborting connection.")
            log.error(traceback.format_exc())
            cliSend("disconnected")
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
        cliSend("directLog $Connected to " + self.host + ":" + str(self.port))
        cliSend("directLog $Starting handshake...") # currently, 'authentication' just makes sure the client isnt modded, this will change though
        self._send("hs user %" + self.username)
        self.ready = True
        #cliSend("sent handshake")

    def _recvThread(self):
        loop = True
        while loop:
            if self.isClosing:
                break
            if self.ready: #and self.socketOpen:
                try:
                    ret = self.sock.recv(1024)
                    if not ret:
                        cliSend("directLog $Disconnected from server.")
                        cliSend("disconnected")
                        self.isClosing = True
                        break
                    retLines = ret.split(b'\r\n')
                    for line in retLines:
                        log.info('got msg from server')
                        callback = line.strip().decode()
                        log.info("from server: " + callback)
                        #cliSend("from server > " + str(callback))
                        if callback.startswith("hs return $ username taken"):
                            self._send("hs cancel %" + self.username)
                            self.sock.close()
                            cliSend("directLog $Username is already taken on this server!")
                            cliSend("disconnected")
                            break

                        elif callback.startswith("hs return $ unsupported client"):
                            self._send("hs cancel %" + self.username)
                            self.sock.close()
                            cliSend("directLog $Server does not support this client")
                            cliSend("disconnected")
                            break

                        elif callback.startswith("hs return $ auth complete"):
                            self._send("hs confirm %" + self.username)
                            cliSend("directLog $Authentication complete!")

                        elif callback.startswith('sysmsg $'):
                            cliSend("directLog $[SYSTEM>>- " + callback.split('$', 1)[1] + "]")

                        elif callback.startswith('chatmsg $'):
                            stage2 = callback.split('$')
                            stage1 = stage2[1::]
                            stage0 = "$".join(stage1)
                            chatdata = json.loads(stage0)
                            cliSend("directLog $" + chatdata['content'])

                except (ConnectionAbortedError,OSError):
                    pass
                except Exception as err:
                    cliSend("directLog $An error occured in recv thread.")
                    log.error(traceback.format_exc())
                    cliSend("disconnected")
                    self.isClosing = True
                    try:
                        self._send("quit %" + self.username)
                    except:
                        pass
                    raise err
            #else:
                #cliSend('not ready')
                #time.sleep(0.1)
        self.isClosing = True

    def recvFromClient(self, packet):
        try:
            inp = packet
            log.info('from client: ' + inp)
            if inp.startswith("/"):
                if inp.startswith('/exit'):
                    self._send('quit %' + self.username)
                    cliSend("directLog $Leaving Server")
                    self.sock.close()
                    self.isClosing = True
                # here, we will parse the message as a command, and see if its a local command or a server command
            else:
                chatinjson = json.loads(inp.split('chat %', 1)[1])
                jsontoload = '{"type":"chat","username":"' + str(self.username) + '","message":"' + chatinjson['message'] + '"}'
                log.info(jsontoload)
                chatpacketjson = json.loads(jsontoload)
                chatpacketstr = json.dumps(chatpacketjson, separators=(',', ':'))
                self._send("chatevent %" + chatpacketstr)
        except Exception as err:
            cliSend('directLog $Error occured in input thread. Stopping client...')
            log.error(traceback.format_exc())
            self.isClosing = True
            try:
                self._send('quit %' + self.username)
                self.sock.close()
            except:
                pass
            raise err
        self.isClosing = True

    def inpThread(self):
        while True:
            packet = sys.stdin.readline().strip()
            self.recvFromClient(packet)

#def recv()

def startProxy():
    serverhost = "localhost:25545"
    username = sys.stdin.readline().strip().split('%')[1] #first message should be username!
    #password = input("Password: ") # commented out until i actually add passwords after making the auth server
    hostport = serverhost.split(':')
    if len(hostport) == 1:
        cliSend("directLog $Using default port 25544")
        host = hostport[0]
        port = 25545
    else:
        host = hostport[0]
        try:
            port = int(hostport(1))
        except TypeError:
            cliSend("directLog $Invalid Port! Using default port 25545")
            port = 25545
    game = serverClient(host, port, username)
    game._startClient()


startProxy()