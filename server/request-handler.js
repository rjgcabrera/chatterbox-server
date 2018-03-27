
var url = require('url');

var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'application/json',
};

var objId = 1;
var messages = [{
  username: 'Jono',
  text: 'Do my bidding!',
  roomname: 'lobby',
  objectId: objId
}];

// var messages = [];

var requestHandler = function(request, response) {

  console.log('Serving request type ' + request.method + ' for url ' + request.url);

  if (request.method === 'GET') {
    var statusCode = 200; 
    var headers = defaultCorsHeaders;
  
    var test = url.parse(request.url);
    if (test.pathname !== '/classes/messages') {
      statusCode = 404;
      response.writeHead(statusCode, headers);
      response.end('Error');
    } else {
      statusCode = 200;
      response.writeHead(statusCode, headers);
      response.end(JSON.stringify({
      results: messages
      }));  
    }
    
    // The outgoing status.
  

  // See the note below about CORS headers.

  // .writeHead() writes to the request line and headers of the response,
  // which includes the status and all headers.
    
    
    
  // Make sure to always call response.end() - Node may not send
  // anything back to the client until you do. The string you pass to
  // response.end() will be the body of the response - i.e. what shows
  // up in the browser.
  //
  // Calling .end "flushes" the response's internal buffer, forcing
  // node to actually send all the data over to the client.
  
  } else if (request.method === 'POST') {
    //TODO: POST handler
    var statusCode = 201;
    var headers = defaultCorsHeaders;
    
    var body = "";
    request.on('data', function(chunk) {
      body += chunk;
    });
    request.on('end', function() {
      var msg = JSON.parse(body);
      msg.objectId = ++objId;
      messages.push(msg);
      console.log('MESSAGES: ', messages);
      response.writeHead(statusCode, headers);
      response.end(JSON.stringify({objectId: objId}));
    });
    console.log('MESSAGES: ', messages);
    
  }
  else if (request.method === 'OPTIONS') {
    response.writeHead(200, defaultCorsHeaders);
    response.end();
  }
 
};

exports.requestHandler = requestHandler;
