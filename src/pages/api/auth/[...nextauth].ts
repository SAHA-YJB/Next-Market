//넥스트 어스는 아직은 app안에 api폴더에서 사용 불가 일단은 pages폴더에 api폴더를 만들어서 사용
//프리즈마 어댑터 세팅
import prisma from '@/helpers/prismadb';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import bcrypt from 'bcryptjs';
import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import KakaoProvider from 'next-auth/providers/kakao';

//나중에 다른 곳에서 사용해야 할 수도 있음
export const authOptions: NextAuthOptions = {
  //공용프리즈마클라이언트
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
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('다시 시도해보세요!');
        }

        //유저 찾는 부분
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });
        if (!user || !user.hashedPassword) {
          throw new Error('다시 시도해보세요!');
        }
        // 비밀번호 체크
        // compare 함수를 사용하여 비밀번호가 일치하는지 확인
        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        if (!isCorrectPassword) {
          throw new Error('다시 시도해보세요!');
        }
        return user;
      },
    }),
  ],
  //원래는 넥스트어스에서 제공하는 페이지이지만 커스텀 페이지로 대체
  pages: {
    signIn: '/auth/login',
  },
  //세션 데이터 jwt에 저장
  session: {
    strategy: 'jwt',
  },
  jwt: {
    //토큰 생성
    secret: process.env.JWT_SECRET,
    maxAge: 30 * 24 * 60 * 60, //30일
  },
  //jwt토큰에 유저정보를 추가
  callbacks: {
    async jwt({ token, user }) {
      // 토큰에 유저정보 추가
      return { ...token, ...user };
    },
    //jwt리턴값이 세션의 매개변수 토큰으로 감
    async session({ session, token }) {
      // 세션.유저 안에 토큰값 넣기
      session.user = token;
      return session;
    },
  },
};
export default NextAuth(authOptions);
