const dotenv = require('dotenv');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
//const {JwtStrategy, ExtractJwt} = require('passport-jwt');
const User = require('../models/User')

dotenv.config();

const notAuthorized = {status:401, message:'Não autorizado.'};

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_JWT
}
passport.use(new JwtStrategy(options, async (payload,done) => {
  const user = await User.findByPk(payload.id);

  if(user){
    return done(null, user)
  }else{
    return done(notAuthorized,false);
  }
}));

module.exports = {
  privateRoute:(req,res,next) => {
    const authFunction = passport.authenticate('jwt',(err,user)=>{
      req.user = user;
      if(user){
        next();
      }else{
        next(notAuthorized);
      }
    });
    authFunction(req,res,next);
  },
  generateToken: (data)=>{
    return jwt.sign(data,process.env.SECRET_JWT);
  }
}
