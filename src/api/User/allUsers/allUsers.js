import {prisma} from "~/../generated/prisma-client";

export default {
    Query: {
        allUsers: async () => prisma.users()//여기서는 await 생략 가능
    }
}