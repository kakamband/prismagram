import { prisma } from "~/../generated/prisma-client";

export default {
    Mutation: {
        editUser: async (_, args, { request, isAuthenticated }) => {//server.js에서 context에 isAuthenricated 넣어줌으로써 사용할 때마다 import 해주지 않아도 됨.
            isAuthenticated(request);
            const { avatar, username, email, firstName, lastName, bio } = args;
            const { user } = request;
            return prisma.updateUser({
                where: { id: user.id },
                data: { username, email, firstName, lastName, bio }
            })
        }
    }
}