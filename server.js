var express = require('express');
var bodyParser = require('body-parser');
var pg = require('pg');
var http = require('http')
var https = require('https')
var url = require('url')
var util = require('util')
var modRewrite = require('connect-modrewrite');
var querystring = require('querystring');

var app = express();

app.set('port', process.env.PORT || 5000);

app.use(express.static('public'));
app.use(bodyParser.json());

app.post('/update', function(reqOrigen, resOrigen) {
    if (!reqOrigen.body.maquina) {
        handleError(resOrigen, "Invalid user input", "Must provide a  machine name.", 400);
    }else if (!reqOrigen.body.status) {
        handleError(resOrigen, "Invalid user input", "Must provide a Status.", 400);
    } if (!reqOrigen.body.origin) {
        handleError(resOrigen, "Invalid user input", "Must provide an Origin.", 400);
    } if (!reqOrigen.body.subject) {
        handleError(resOrigen, "Invalid user input", "Must provide an Subject.", 400);
    }else{  	
    	const https = require('https');
    	
    	const postData = querystring.stringify({
  		  'maquina': reqOrigen.body.maquina,
  		  'status':reqOrigen.body.status,
  		  'origin':reqOrigen.body.origin,
  		  'subject':reqOrigen.body.subject
  		});

    	const options = {
    	  hostname: 'arduinoopencase.herokuapp.com',
    	  port: 443,
    	  path: '/update/?'+postData,
    	  method: 'GET',
    	};

    	const req = https.request(options, (res) => {
    	  console.log('statusCode:', res.statusCode);
    	  console.log('headers:', res.headers);

    	  res.on('data', (d) => {
    	    process.stdout.write(d);
    	  });
    	});

    	req.on('error', (e) => {
    	  console.error(e);
    	});
    	req.end(postData);
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
    	console.log("redireccionando GET");
    	//res.redirect("https://arduinoopencase.herokuapp.com/update/?maquina="+req.query.maquina+"&origin="+req.query.origin+"&status="+req.query.status+"&subject="+req.query.subject);
    }
});
app.use(modRewrite([
'http://192.168.1.47:5000/update  https://arduinoopencase.herokuapp.com/update/?maquina=Maquina%201&origin=Web&status=New&subject=Reponer%20linea']));
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}
app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
