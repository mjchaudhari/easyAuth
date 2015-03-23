var User = require("../models/user.model.js");

    exports._isLoggedIn = function (req, res, next) {
        // if user is authenticated in the session, carry on
        if (req.isAuthenticated())
            return next();
    
        // if they aren't redirect them to the home page
        res.redirect('/');
    }

    exports.validateUser = function(accessToken, refreshToken, profile, done) {
    	User.findOne({email: profile.emails[0].value},
	        function(err,usr) {
                if(usr === null){
                    var u = User();
                    u.userName = profile.emails[0].value;    
                    u.firstName = profile.name.givenName;
                    u.lastName = profile.name.familyName;
                    u.internalId = profile.id;
                    u.providerId = profile.id;
                    u.pic = profile._json.image;
                    u.provider = profile.provider;
                    u.lastLogin = new Date();
                    u.city = "";
                    u.country = "";
                    u.email = profile.emails[0].value;    
                    u.createdOn = new Date();
                    u.token = accessToken;
                    
                    u.save(function(err){
                        if(err){
                            console.error(err);
                            return done(err,null);
                        }
                        console.log(u);
                        process.nextTick(function() {
            			    return done(null,u);
            		    });
                    });
                }
                else    {
                    usr.token = accessToken;
                    usr.save(function(err,usr,num) {
            			if(err)	{
            				console.log('error saving token');
            			}
            		});
            		process.nextTick(function() {
            			return done(null,usr);
            		});
                }
	    });
      };
	
    //Get Users
    exports.getUsers = function (req, res) {
        console.log("controller : get users");
        
        var filter = req.body.filter ;
        
        User.find(filter, function(err, users){
            if(err){
                console.error(err);
                res.send({message:"error", error:err});
                return;
            }
            
            res.json({message:"", data:users});
        });
    };
     
    //find user by user name
    exports.getUserById = function (providerId, done ) {
        console.log("controller : get user");
        User.findById(providerId, function(err, user) {
            done(err, user);    
        });
    };
    
    //find user by user name
    exports.getUser = function (req, res) {
        console.log("controller : get users");
        
        var filter = req.params.userName;
        
        User.findOne({"userName": filter}, function(err, user){
            if(err){
                console.error(err);
                res.send({message:"error", error:err});
                return;
            }
            res.json({message:"", data:user});
        });
    };
    //Create new User
    exports.postUser = function (req, res) {
        console.log("controller : post user");
        var u = getFromBody(req);
        
        createUser(u, function (err, data) {
            if(err){
                console.error(err);
                res.send({message:"error", error:err});
                return;
            }
            console.log(data);
            res.json({message:"", data:data});
        })
    };
    
    //Update existing user
    exports.updateUser = function (req,res) {
        console.log("controller : post user");
        
        User.findOne({"userName":req.params.userName}, function (err, user ) {
            if(err){
                console.error(err);
                res.send({message:"error", error:err});
                return;
            }
            
            if (!user) {
                console.error(err);
                res.send({message:"error", error:"User with user name '" + req.params.userName + "' not found."});
                return;
            }
           
            //update user now
            if (req.body.firstName) {
                user.firstName = req.body.firstName;    
            }
            
            if(req.body.lastName){
                user.lastName = req.body.lastName;
            }
            
            user.save(function (err) {
                if(err){
                    console.error(err);
                    res.send({message:"error", error:err});
                }
                
                res.json({message:"Ok", data:user});
            });
        });
    }
    ///create new user object and set proporties as per request
    var getFromBody = function (req) {
        var u = new User();
        var r = req.body;
        
        if (r.userName) {
            u.userName = r.userName;    
        }
        if (r.firstName) {
            u.firstName = r.firstName;
        }
        if (r.lastName) {
            u.lastName = r.lastName;
        }
        if (r.internalId) {
            u.internalId = "12345";
        }
        if (r.pic) {
            u.pic = r.pic;
        }
        if (r.provider) {
            u.provider = r.provider;
        }
        if (r.lastLogin) {
            u.lastLogin = new Date();
        }
        if (r.city) {
            u.city = r.city;
        }
        if (r.country) {
            u.country = r.country;
        }
        if (r.email) {
            u.email = r.email;
        }
        u.createdOn = new Date();
        return u;
    }
    
    var createUser = function (u, callback) {
        u.save(function(err){
            if(err){
                console.error(err);
                callback(err, null);
                return;
            }
            console.log(u);
            callback(null, u);
        });
    }