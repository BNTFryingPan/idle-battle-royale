from websocket_server import WebsocketServer

clients = {}

def client_left(client, server):
    msg = "Client ({}) left".format(client['id'])
    print(msg)
    try:
        clients.pop(client['id'])
    except:
        print("Error in removing client {}".format(client['id']))
    for cl in clients.values():
        server.send_message(cl, msg)


def new_client(client, server):
    msg = "New client ({}) connected".format(client['id'])
    print(msg)
    for cl in clients.values():
        server.send_message(cl, msg)
    clients[client['id']] = client


def msg_received(client, server, msg):
    msg = "Client ({id}) : {msg}".format(id=client['id'], msg=msg)
    print(msg)
    clientid = client['id']
    for cl in clients:
        if cl != clientid:
            cl = clients[cl]
            server.send_message(cl, str(msg))

server = WebsocketServer(25544)
server.set_fn_client_left(client_left)
server.set_fn_new_client(new_client)
server.set_fn_message_received(msg_received)
server.run_forever()