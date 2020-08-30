import {prisma} from "~/../generated/prisma-client";
import { isAuthenticated } from "../../../middlewares";

export default {
    Mutation: {
        toggleLike: async (_, args, {request}) => {
            isAuthenticated(request);
            const {postId} = args;
            const {user} = request;
            const filterOptions = {
                AND: [
                    {
                        user:{
                            id: user.id
                        }
                    },
                    {
                        post:{
                            id: postId
                        }
                    }
                ]
            }

            try{
                const existingLike = await prisma.$exists.like(filterOptions)
                if(existingLike){//좋아요가 이미 존재할 때
                    await prisma.deleteManyLikes(filterOptions);
                }else{//좋아요가 없을 때 좋아요 생성
                    await prisma.createLike({
                        user: {
                            connect: {
                                id: user.id
                            },
                        },
                        post: {
                            connect: {
                                id: postId
                            }
                        }
                    });
                }
                return true;
            } catch(error) {
                console.log(error)
                return false;
            }
        }
    }
}