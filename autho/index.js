const express = require('express')
const passport = require('passport')
const session = require('express-session')
require('./auth')
function isLoggedIn(req,res,next){
    req.user?next(): res.sendStatus(401);
}
const app = express();
app.use(session({ secret: 'cats' }));
app.use(passport.initialize());
app.use(passport.session());
app.get('/', (req, res) => {
    res.send('<a href="/auth/google">Authenticate with google</a>');
});
app.get('/protected', isLoggedIn,(req, res) => {
    res.send(`hello ${req.user.displayName} <a href="/logout">Logout with google</a>`);
});
app.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile'] }))

app.get('/logout',(req,res)=>{
    req.logout();
    req.session.destroy();
    res.send('good bye <a href="/auth/google"">sign in with google</a>')
})

app.listen(5000, () => console.log('listening on: 5000'));

app.get('/google/callback',passport.authenticate('google',{
    successRedirect:'/protected',
    failureRedirect:'/auth/failure'

}))
app.get('/auth/failure',(req,res)=>{
    res.send('something went wrong')
})