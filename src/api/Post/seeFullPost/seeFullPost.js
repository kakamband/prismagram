import { prisma } from "~/../generated/prisma-client";
import { COMMENT_FRAGMENT } from "../../../fragment";

export default {
    Query: {
        seeFullPost: async (_, args) => {
            const { id } = args;
            const post = await prisma.post({ id });
            const comments = await prisma.post({ id }).comments().$fragment(COMMENT_FRAGMENT);//이중 참조할 수 있도록 fragment로 설정해줌.
            const likeCount = await prisma.likesConnection({ 
                where: { post: { id } } 
            })
            .aggregate()
            .count()
            
            return {
                post,
                comments,
                likeCount
            }
        }
    }
}