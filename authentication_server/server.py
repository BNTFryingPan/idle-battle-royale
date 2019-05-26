import socketserver
import socket
import library as lib
import json
import http.server
import threading

with open("users.json", "r") as f:
   users = json.load(f)
   users['uuids'] = {}
   users['users'] = {}

def saveData():
    with open('users.json', 'w') as f:
        json.dump(users, f)

def getValueFromDict(_dict, path):
    try:
        exec("ret = " + str(_dict) + path)#, locals=locals())
        return ret
    except KeyError:
        return None

def getUsernameFromUUID(uuid):
    if getValueFromDict(users, '["uuids"]["' + uuid + '"]') is not None:
        return users['uuids'][uuid]
    else:
        return None

def getUuidFromUsername(username):
    if getValueFromDict(users, '["users"]["' + username + '"]') is not None:
        return users['users'][username]
    else:
        return None

def registerUser(username, uuid=None):
    if uuid == None:
        while True:
            uuid = lib.generateUUID()
            try:
                users['uuids'][uuid]
            except KeyError:
                break
        
    users['uuids'][uuid] = username
    users['users'][username] = uuid

# This is going to be the authentication server. It will be very insecure, but it should work.

PORT = 25534
#Handler = http.server.SimpleHTTPRequestHandler

class Handler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        print('path: ' + self.path)
        response = "hello. this is a test"
        responsecode = 200
        path = '/'.join(self.path.split('/')[1::])
        print('path list: ' + str(path))
        if len(path.split('/')) > 1:
            path = '/'.join(path.split('/'))
        else:
            path = path.split('/')[0]
        print('new path: ' + path)

        args = path.lower().split('/')
        rawArgs = path.split('/')

        try:
            if args[0] == 'getuuid':
                username = getUsernameFromUUID(args[1])
                if username != None:
                    response = username
                else:
                    response = "unable to find user"
                    responsecode = 404
            
            elif args[0] == 'registeruser':
                registerUser(args[1])
                response = 'done'

            elif args[0] == 'ping'
                response = 'pong'
                responsecode = 200

            else:
                response = 'unknown action'
                responsecode = 404
        except IndexError:
            response = "not enough args"
            responsecode = 404

        self.send_response(responsecode)
        self.end_headers()
        self.wfile.write(bytes(response, 'utf-8'))

httpd = socketserver.TCPServer(("", PORT), Handler)# as httpd:
print("serving at port", PORT)
threading.Thread(target=httpd.serve_forever).start()