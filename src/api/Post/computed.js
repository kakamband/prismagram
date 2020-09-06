import { prisma } from "~/../generated/prisma-client";

export default {

    Post: {
        files: parent => prisma.post({id: parent.id}).files(),//이렇게 하면 fragment사용하지 않아도 됨
        comments: parent => prisma.post({id: parent.id}).comments(),//comments: ({id}) => prisma.post({id}).comments() 이렇게 하면 더 깔끔.
        user: parent => prisma.post({id: parent.id}).user(),
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

        },
        likeCount: (parent, _, { request }) => prisma.likesConnection({
            where: { post: { id: parent.id } }
        })
            .aggregate()
            .count()
    }
}