import prisma from '@/helpers/prismadb';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

//회원가입로직
export async function POST(req: Request) {
  const body = await req.json();

  const { email, password, name } = body;

  //비밀번호 암호화(비크립트)
  const hashedPassword = await bcrypt.hash(password, 12);

  //프리즈마 유저 생성
  const user = await prisma.user.create({
    data: {
      email,
      name,
      hashedPassword,
    },
  });
  // 클라이언트에 보내주기
  return NextResponse.json(user);
}
