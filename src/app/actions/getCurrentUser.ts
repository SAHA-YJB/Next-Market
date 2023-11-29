import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';

//getServerSession 모듈화
export async function getSession() {
  return await getServerSession(authOptions);
}

//디비에서 유저데이터 가져오기
//어느컴포넌트에서든 쓸 수 있게 함수화
export default async function getCurrentUser() {
  try {
    const session = await getSession();
    if (!session?.user?.email) {
      return null;
    }

    const currentUser = await prisma?.user.findUnique({
      where: {
        email: session.user.email,
      },
    });
    if (!currentUser) {
      return null;
    }
    return currentUser;
  } catch (error) {
    return null;
  }
}
