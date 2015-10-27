// require
var express = require('express');
var bodyParser = require('body-parser');
var routes = require('./routes/routes.js')
var app = express();

// app config
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));

app.use('/', routes)

// server
var port = 3000;
app.listen(port, function(){
	console.log('server is listening on port ' + port);
});