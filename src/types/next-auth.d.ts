//.접근법을 통해 자동완성에 보이게 해준다.
//ex session.user.id(원래는 아이디가 안보였음)
import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user?: {
      id?: string;
      role?: string;
    } & DefaultSession['user'];
  }
}
