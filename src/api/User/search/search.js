import {prisma} from "~/../generated/prisma-client";

export default {
    Query: {
        search: async(_, args) => prisma.users({where:{
            OR: [
                {username_contains: args.term},
                {firstName_contains: args.term},
                {lastName_contains: args.term}
            ]
        }})
    }
}