// COPYRIGHT STEVEN ALAN MOODY

// require
var express        = require('express');
var bodyParser     = require('body-parser');
var routes         = require('./routes/routes.js');
var session        = require('express-session');
var mongoose       = require('mongoose');
var passport       = require('passport');
var passportConfig = require('./auth/authConfig/passport.js');
var job = require('./senderDaemon.js').job;

mongoose.connect('mongodb://localhost/encapsulate');
var app = express();

app.use(session({
	secret: 'keyboard cat',
	resave: false,
	saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

// app config
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));

app.use('/', routes);
app.use('/view/dash', routes);
app.use('/auth/check', routes);
app.use('/auth/process-login', routes);
app.use('/auth/register-user', routes);
app.use('/api/me', routes);
app.use('/api/create-capsule', routes);
app.use('/api/get-capsules', routes);
app.use('/api/get-invites', routes);
app.use('/api/open-capsule/:capsuleId', routes);
app.use('/api/get-contributions/:capsuleId', routes);


// server
var port = 3000;
app.listen(port, function(){
	console.log('server is listening on port ' + port);
});