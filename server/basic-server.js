/* Import node's http module: */
var handleRequest = require('./request-handler')
var http = require('http');
//console.log(handleRequest);

var port = 3000;

var ip = '127.0.0.1';


var server = http.createServer(handleRequest.requestHandler);
console.log('Listening on http://' + ip + ':' + port);
server.listen(port, ip);


