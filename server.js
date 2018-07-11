var express = require('express');
var bodyParser = require('body-parser');
var pg = require('pg');
var http = require('http')
var https = require('https')
var url = require('url')
var util = require('util')

var app = express();

app.set('port', process.env.PORT || 5000);

app.use(express.static('public'));
app.use(bodyParser.json());

app.post('/update', function(req, res) {
    if (!req.body.maquina) {
        handleError(res, "Invalid user input", "Must provide a  machine name.", 400);
    }else if (!req.body.status) {
        handleError(res, "Invalid user input", "Must provide a Status.", 400);
    } if (!req.body.origin) {
        handleError(res, "Invalid user input", "Must provide an Origin.", 400);
    } if (!req.body.subject) {
        handleError(res, "Invalid user input", "Must provide an Subject.", 400);
    }else{
		res.redirect("https://arduinoopencase.herokuapp.com/update/?maquina="+req.body.maquina+"&origin="+req.body.origin+"&status="+req.body.status+"&subject="+req.body.subject);
    	/*var options={
				protocol:"https:",
				host:"https://arduinoopencase.herokuapp.com",
				hostname:"arduinoopencase.herokuapp.com",
    			path:"/update",
    			port:11096,
    			headers: [ 	'ConTent-Length', '123456',
							'content-LENGTH', '123',
							'content-type', 'text/json',
							'CONNECTION', 'keep-alive',
							'Host', 'arduinoopencase.herokuapp.com' ],
    		    body: JSON.stringify({"maquina": req.body.maquina,
    		    						"status": req.body.status,
    		    						"origin":req.body.origin,
    		    						"subject": req.body.subject})
		}
		console.log('Startin request');
    	var req = https.get(options, function(res) {
    		  console.log('STATUS: ' + res.statusCode);
    		  console.log('HEADERS: ' + JSON.stringify(res.headers));

    		  // Buffer the body entirely for processing as a whole.
    		  var bodyChunks = [];
    		  res.on('data', function(chunk) {
    		    // You can process streamed parts here...
    		    bodyChunks.push(chunk);
    		  }).on('end', function() {
    		    var body = Buffer.concat(bodyChunks);
    		    console.log('BODY: ' + body);
    		    // ...and/or process the entire body here.
    		  })
    		});

    		req.on('error', function(e) {
    		  console.log('ERROR: ' + e.message);
    		  res.json({"ERROR":e.message});
			});
			*/
    }

});
app.get('/update', function(req, res) {
	console.log(req.query);

    if (!req.query.maquina) {
        handleError(res, "Invalid user input", "Must provide a  machine name.", 400);
    }else if (!req.query.status) {
        handleError(res, "Invalid user input", "Must provide a Status.", 400);
    } if (!req.query.origin) {
        handleError(res, "Invalid user input", "Must provide an Origin.", 400);
    } if (!req.query.subject) {
        handleError(res, "Invalid user input", "Must provide an Subject.", 400);
    }else{

    }
});
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}
app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
