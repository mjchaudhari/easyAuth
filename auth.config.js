
    module.exports = {

    'facebookAuth' : {
        'clientID'      : 'your-secret-clientID-here', // your App ID
        'clientSecret'  : 'your-client-secret-here', // your App Secret
        'callbackURL'   : 'http://localhost:8080/auth/facebook/callback'
    },

    'twitterAuth' : {
        'consumerKey'       : 'your-consumer-key-here',
        'consumerSecret'    : 'your-client-secret-here',
        'callbackURL'       : 'http://localhost:8080/auth/twitter/callback'
    },

    'googleAuth' : {
        'clientID'      : '361115299133-m3sveqoq7o5c5s7qev5vrpb8hgcd9bvu.apps.googleusercontent.com',
        'clientSecret'  : 'UAfCKO28lxiIkeD3GmQTb9Us',
        'callbackURL'   : 'https://easyauth-mjchaudhari.c9.io/auth/googlecallback',
        'realm'         : 'https://easyauth-mjchaudhari.c9.io',
        'scope'         : 'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/plus.profile.emails.read'
    }

};

