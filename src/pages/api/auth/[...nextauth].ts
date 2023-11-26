//넥스트 어스는 아직은 app안에 api폴더에서 사용 불가 일단은 pages폴더에 api폴더를 만들어서 사용
import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/helpers/prismadb";
import CredentialsProvider from "next-auth/providers/credentials";
import KakaoProvider from "next-auth/providers/kakao";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID!,
      clientSecret: process.env.KAKAO_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("이메일과 비밀번호를 입력해주세요");
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });
        if (!user || !user.hashedPassword) {
          throw new Error("다시 시도해보세요!");
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );
        if (!isCorrectPassword) {
          throw new Error("다시 시도해보세요!");
        }
        return user;
      },
    }),
  ],
  //커스텀페이지 로그인 로그아웃
  pages: {
    signIn: "/auth/login",
  },
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    maxAge: 30 * 24 * 60 * 60, //30일
  },
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    //jwt리턴값이 세션의 매개변수 토큰으로 감
    async session({ session, token }) {
      session.user = token;
      return session;
    },
  },
};
export default NextAuth(authOptions);
