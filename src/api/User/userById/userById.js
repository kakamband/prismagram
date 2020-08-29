import {prisma} from "~/../generated/prisma-client";

export default {
    Query: {
        userById: async(_, args) => {
            const {id} = args;
            return await prisma.user({id}).$fragment()//return await prisma.user({id:id}).$fragment()와 같은 것임, $fragment()를 쓰는 이유는 무한한 코드를 만드는 것을 방지하기 위해서임.
        }
    }
}