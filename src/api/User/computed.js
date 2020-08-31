import { prisma } from "~/../generated/prisma-client";

export default {
    User: {
        fullName: (parent) => {
            console.log('parent', parent);
            return `${parent.firstName} ${parent.lastName}`;
        },
        isFollowing: async (parent, _, { request }) => {
            const { user } = request;
            const { id: parentId } = parent;
            try {
                const exists = await prisma.$exists.user({
                    AND: [
                        { id: user.id },//내 id
                        { following_some: { id: parentId } }//그 사람의 followers배열에 내가 존재하는지 확인
                    ]
                });
                console.log('exists', exists)
                return exists;
            } catch (error) {
                console.log(error);
                return false;
            }


        },
        isSelf: (parent, _, { request }) => {
            const { user } = request;
            const { id: parentId } = parent;
            return user.id === parentId;
        }
    },
    Post: {
        isLiked: async (parent, _, { request }) => {
            const { user } = request;
            const { id } = parent;
            return prisma.$exists.like({
                AND: [
                    {
                        user: {
                            id: user.id
                        }
                    },
                    {
                        post: {
                            id
                        }
                    }
                ]
            })

        }
    }
}