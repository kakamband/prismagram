import "./env";
import { GraphQLServer } from "graphql-yoga";
import logger from "morgan";
import schema from "~/schema";
import {sendSecretMail} from "./utils";
import "./passport"
import { authenticateJwt } from "./passport";

// sendSecretMail("jackoss@naver.com", "123")  //nodemailer인증이 안되니 mailgun으로 대체할 것

const PORT = process.env.PORT || 4000;


//GraphQLServer에 Express가 내장되어 있음.
const server = new GraphQLServer({ 
    schema, 
    context: ({request}) => ({request})
});//context는 resolver사이에서 정보를 공유할 때 사용

//Middleware
server.express.use(logger("dev"));
server.express.use(authenticateJwt);

server.start({port: PORT}, () => console.log(`🐶Server running on http://localhost:${PORT}`));