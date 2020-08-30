import { prisma } from "~/../generated/prisma-client";

export default {
    Query: {
        me: async (_,__, {request, isAuthenticated}) => {
            isAuthenticated(request);
            const {user} = request;
            const userProfile = await prisma.user({id:user.id})
            const posts = await prisma.user({id:user.id}).posts()
            return {
                user: userProfile,//UserProfile과 다른 것임.
                posts
            }
        }
    },
    User: {
        fullName: (parent) => {
            console.log('parent', parent);
            return `${parent.firstName} ${parent.lastName}`;
        }
    }
}