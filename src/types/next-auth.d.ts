//.접근법을 통해 자동완성에 보이게 해준다.
import { DefaultSession } from "next-auth";

declare module 'next-auth' {
  interface Session {
    user?: {
      id?: string;
      role?: string;
    } & DefaultSession["user"]
  }
}