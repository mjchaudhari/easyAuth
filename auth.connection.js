var mongoose = require("mongoose"),
    mongoURI = 'mongodb://127.0.0.1:27017/easyAuth';
    mongoose.connect(mongoURI);

    var db = mongoose.connection;
    
    db.on('error',console.error.bind(console, 'connection error:'));
    db.once('open', function callback() {
    	console.log("Connected to db");
    	
    });

module.exports = db;
    
