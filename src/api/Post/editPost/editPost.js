import { prisma } from "../../../../generated/prisma-client";
import { FULL_POST_FRAGMENT } from "../../../fragment";

const EDIT = "EDIT"
const DELETE = "DELETE";

export default {
    Mutation: {
        editPost: async (_, args, { request, isAuthenticated }) => {
            isAuthenticated(request);
            const { id, caption, location, action } = args;
            const { user } = request;
            const post = await prisma.$exists.post({ id, user: { id: user.id } });
            if (post) {
                if(action === "EDIT"){
                    return prisma.updatePost({
                        data: { caption, location },
                        where: { id }
                    }).$fragment(FULL_POST_FRAGMENT)//FRAGMENT 붙이면 user들 정보까지 볼 수 있음
                }else if(action === "DELETE"){
                    return prisma.deletePost({id})
                } 
            } else {
                throw Error("You can't do that");
            }
        }
    }
}