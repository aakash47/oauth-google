const passport = require('passport')

const  GoogleStrategy = require('passport-google-oauth20').Strategy;
const GOOGLE_CLIENT_ID = '396449129271-11nqprpbmcbar40ef1qf0e6n9imj0guh.apps.googleusercontent.com'
const GOOGLE_CLIENT_SECRET = '6VPPwLlQg_e92bpKTPI8viMe'
passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/google/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
      return cb(null, profile);
  }
));
passport.serializeUser(function(user,done){
    done(null,user)
})
passport.deserializeUser(function(user,done){
    done(null,user)
})