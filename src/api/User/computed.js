import { prisma } from "~/../generated/prisma-client";

export default {
    User: {
        fullName: (parent) => {
            console.log('parent', parent);//User를 반환하는 곳에서 username, firstName 등을 알 수 있다. 여기서는 fullName이라는 Query로 parent에 있는 요소들을 조합해서 사용할 수 있다. parent를 console에 찍어보면 리턴하는 user 정보가 나온다. 그 정보를 이용해서 아래 parent.firstName parent.lastName처럼 조합해서 사용할 수 있다.
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
    }
}