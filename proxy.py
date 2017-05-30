import requests
from urlparse import urlparse, parse_qs
from BaseHTTPServer import BaseHTTPRequestHandler,HTTPServer
import json
PORT = 8080


    
class myHandler(BaseHTTPRequestHandler):
    def byteify(input):
        if isinstance(input, dict):
            return {byteify(key): byteify(value)
                    for key, value in input.iteritems()}
        elif isinstance(input, list):
            return [byteify(element) for element in input]
        elif isinstance(input, unicode):
            return input.encode('utf-8')
        else:
            return input
    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', 'http://localhost:3000')
        self.send_header('Access-Control-Allow-Credentials', 'true')
        self.send_header('Access-Control-Allow-Methods', 'GET, OPTIONS')
        self.send_header("Access-Control-Allow-Headers", "Authorization, Content-Type")
        self.end_headers()
    def do_GET(self):
        print self.path
        URL = "http://api.repo.nypl.org"
        params = parse_qs(urlparse(self.path).query)
        path = urlparse(self.path).path
        if params :
            trick_headers = {}
            for name, value in self.headers.items():
                if (name == "authorization"):
                    trick_headers["Authorization"] = value
            r = requests.get(URL + path, headers = trick_headers, params = params)
            self.send_response(r.status_code)
            self.send_header("Access-Control-Allow-Origin", "http://localhost:3000")
            self.send_header('Access-Control-Allow-Methods', 'GET, OPTIONS')
            self.send_header('Access-Control-Allow-Credentials', 'true')
            self.send_header("Access-Control-Allow-Headers", "X-Requested-With")
            self.send_header("Access-Control-Allow-Headers", "Content-Type")
            self.send_header("Access-Control-Allow-Headers", "Authorization")
            self.end_headers()
            print(r.status_code)
            try:
                self.wfile.write(r.text)
            except:
                print "something went wrong"
        else:
            print "error. please type any param"
        return


try:
    server = HTTPServer(('', PORT), myHandler)
    print 'Started server on port ', PORT
    server.serve_forever()
except KeyboardInterrupt:
    print "^C received, shutting down the web server"
    server.socket.close()
    
