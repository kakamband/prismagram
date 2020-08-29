import { generateSecret } from "../../../utils";
import {prisma} from "~/../generated/prisma-client";

export default {
    Mutation: {
        requestSecret: async(_, args) => {
            const {email} = args;
            const loginSecret = generateSecret();
            console.log('loginSecret:', loginSecret);
            try{
                await prisma.updateUser({data:{loginSecret}, where:{email}})//unique한 요소로만 검색 가능
                return true
            }catch(error){
                console.log(error)
                return false
            }
        } 
    }
}