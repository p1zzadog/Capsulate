// require
var express        = require('express');
var bodyParser     = require('body-parser');
var routes         = require('./routes/routes.js');
var authRoutes     = require('./routes/authRoutes.js');
var session        = require('express-session');
var mongoose       = require('mongoose');
var passport       = require('passport');
var passportConfig = require('./auth/authConfig/passport.js');

mongoose.connect('mongodb://localhost/encapsulate');
var app = express();

// app config
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));

app.use('/', routes);
app.use('/auth/process-login', routes);
app.use('/auth/register-user', authRoutes);

// server
var port = 3000;
app.listen(port, function(){
	console.log('server is listening on port ' + port);
});