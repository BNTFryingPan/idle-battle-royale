import http.server
import socketserver
import threading
# This is the server that will manage running the game for users in a web browser. This may be rather complicated
# as it will probably require having a second server, for javascript responses

PORT = 80
#Handler = http.server.SimpleHTTPRequestHandler

class Handler(http.server.SimpleHTTPRequestHandler):
    def _getFinalPath(self, path):
        if path.endswith('/'):
            if not path.endswith('.html/'):
                return path + 'index.html'
            else:
                return ''.join(path.split('')[::-1])

    def do_GET(self):
        print(self.path)
        originalPath = self.path
        if self.path == "/game":
            self.path = '/client/webclient/index.html'
        elif self.path.endswith('/'):
            self.path = self.path + 'index.html'
        #elif not self.path.endswith('.html'):
            
        try:
            file_to_open = open(self.path[1:]).read()
            if originalPath == '/game':
                file_to_open = file_to_open.replace('style.css', 'client/webclient/style.css')
                file_to_open = file_to_open.replace('js/game.js', 'client/webclient/js/game.js')
                file_to_open = file_to_open.replace('js/upgrades.js', 'client/webclient/js/upgrades.js')
                file_to_open = file_to_open.replace('js/buildings.js', 'client/webclient/js/buildings.js')
                file_to_open = file_to_open.replace('js/interface.js', 'client/webclient/js/interface.js')
            #print(file_to_open)
            self.send_response(200)
        except:
            try:
                file_to_open = open(self.path[1:] + '.html')
                self.send_response(200)
            except:
                file_to_open = open("404.html").read()
                self.send_response(404)
        self.end_headers()
        self.wfile.write(bytes(file_to_open, 'utf-8'))

httpd = socketserver.TCPServer(("", PORT), Handler)# as httpd:
print("serving at port", PORT)
threading.Thread(target=httpd.serve_forever).start()