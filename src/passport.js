import { prisma } from "~/../generated/prisma-client";
import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
};

const verifyUser = async (payload, done) => {
    try{
        const user = await prisma.user({id:payload.id})
        if(user !== null){
            return done(null, user);
        }else{
            return done(null, false);
        }
    }catch(error){
        return done(error, false);
    }
}

//토큰을 받아서 해석한 후 사용자를 찾고, 사용자가 존재한다면 req 객체에 사용자를 추가하고 graphql 함수를 실행하도록 함
export const authenticateJwt = (req, res, next) => passport.authenticate("jwt", {session:false}, (err, user) => {
    if(user){
        req.user = user;
    }
    next();
})(req, res, next);//함수를 리턴해줌.


passport.use(new Strategy(jwtOptions, verifyUser))
passport.initialize()