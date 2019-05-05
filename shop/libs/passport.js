const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const config = require('../config');
const mysql = require('mysql');

const connection = mysql.createConnection(config.MYSQL);
connection.connect()

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.TOKEN_KEY;

module.exports = passport=>{
    passport.use(new JwtStrategy(opts,async function(jwt_payload,done){

        connection.query("select * from user where id=?",[jwt_payload.id],(err,result,feilds)=>{
            const user = JSON.parse(JSON.stringify(result[0]));
            if(user){
                return done(null,user);
            }else{
                return done(null,false);
            }
        });        
    }));
}