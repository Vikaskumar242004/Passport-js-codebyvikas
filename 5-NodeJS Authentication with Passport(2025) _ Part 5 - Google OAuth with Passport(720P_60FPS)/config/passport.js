const { compareSync } = require('bcrypt');
const passport = require('passport')
const UserModel = require('./database')

const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: "12882414652-mb6fg0a7o4h1m480ogvlng778cm9dhet.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:5000/auth/google/callback"
},
    function (accessToken, refreshToken, profile, cb) {
        console.log(accessToken,profile);
        UserModel.findOne({googleId : profile.id},(err,user) =>{
            if(err) return cb(err,null);
            if(!user){
                let newUser = new UserModel({
                    googleId : profile.id,
                    name : profile.displayName
                })
                newUser.save();
                return cb(null,newUser);
            }else{
                return cb(null,user)
            }
        })
    }
));

//Persists user data inside session
passport.serializeUser(function (user, done) {
    done(null, user.id);
});

//Fetches session details using session id
passport.deserializeUser(function (id, done) {
    UserModel.findById(id, function (err, user) {
        done(err, user);
    });
});