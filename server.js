// server.js

// set up ======================================================================
// get all the tools we need
var express  = require('express');
var app      = express();
var port     = process.env.PORT || 8080;
var passport = require('passport');
var authConnection  = require("./auth.connection.js");
var path = require("path");
require('./passport')(passport); // pass passport for configuration

// configuration ===============================================================
var conn = authConnection.authConnection;

app.configure(function() {
	// set up our express application
	app.use(express.logger('dev')); // log every request to the console
	app.use(express.cookieParser()); // read cookies (needed for auth)
	app.use(express.bodyParser()); // get information from html forms
	console.log("Static files path :" + __dirname+'/views');
    app.use(express.static(path.join(__dirname, "/views")))	
	// required for passport
	app.use(express.session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
	app.use(passport.initialize());
	app.use(passport.session()); // persistent login sessions
	//app.use(flash()); // use connect-flash for flash messages stored in session
    app.use(function(req, res, next) {
          res.header("Access-Control-Allow-Origin", "*");
          res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
          next();
        });
});

// routes ======================================================================
require('./routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

// launch ======================================================================
 
app.listen(port);
console.log('The magic happens on port ' + port);
