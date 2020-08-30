import { isAuthenticated } from "../../../middlewares";

export default {
    Mutation: {
        toggleLike: async (_, args, {request}) => {
            isAuthenticated(request);
            const {postId} = args;
            const {user} = request;

            try{
                const existingLike = await prisma.$exists.like({
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
                })
                if(existingLike){//좋아요가 이미 있을 때
                    //TO DO
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
            } catch {
                return false;
            }
        }
    }
}