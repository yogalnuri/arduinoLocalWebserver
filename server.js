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
    	console.log("redireccionano POST");
    	console.log("https://arduinoopencase.herokuapp.com/update/?maquina="+req.body.maquina.replace(" ","%20")+"&origin="+req.body.origin.replace(" ","%20")+"&status="+req.body.status.replace(" ","%20")+"&subject="+req.body.subject.replace(" ","%20"));
    	console.log("La que vale");
    	console.log("https://arduinoopencase.herokuapp.com/update/?maquina=Maquina%201&origin=Web&status=New&subject=Reponer%20linea");
    	try{
    		res.redirect("https://arduinoopencase.herokuapp.com/update/?maquina="+req.body.maquina.replace(" ","%20")+"&origin="+req.body.origin.replace(" ","%20")+"&status="+req.body.status.replace(" ","%20")+"&subject="+req.body.subject.replace(" ","%20"));	
    		 res.json({"OK": "redireccionado"});
    	}catch(e){
    		console.log(e.message);
    	}
		
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
    	res.redirect("https://arduinoopencase.herokuapp.com/update/?maquina="+req.query.maquina+"&origin="+req.query.origin+"&status="+req.query.status+"&subject="+req.query.subject);
    }
});
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}
app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
