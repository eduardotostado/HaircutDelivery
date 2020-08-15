const passport = require('passport')

const {User} = require('../models/User')

const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

passport.use(
    new JwtStrategy({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: 'secret-text'
    }, async function(jwtPayload, done) {
        try{
            const user = await User.findOne({id: jwtPayload.id})
            if(!user){
                return done(new Error(), false)
            } else {
                return done(null, user)
            }
        } catch (err) {
            return done(new Error(), false)
        }
    })
)

module.exports = null