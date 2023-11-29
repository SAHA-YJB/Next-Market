import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

// 특정 경로 접근 권한 설정
// 어드민으로 시작하는 모든 경로는 로그인이 되어야 가능-> /:path*
// .env에서도 처리해야함
// export const config = {matcher:["/admin/:path*", '/user']}

// 어떠한 경로든 상관없이 경로처리 v
export async function middleware(req: NextRequest) {
  //getToken은 세션을 가져옴
  const session = await getToken({ req, secret: process.env.JWT_SECRET });
  const pathname = req.nextUrl.pathname;

  //로그인된 유저만 접근 가능하게 함
  if (pathname.startsWith('/user') && !session) {
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

  //어드민만 접근 가능하게 함
  if (pathname.startsWith('/admin') && session?.role !== 'Admin') {
    return NextResponse.redirect(new URL('/', req.url));
  }

  //로그인된 유저는 로그인/회원가입 페이지 접근 불가
  if (pathname.startsWith('/auth') && session) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  // 조건이 전부 아니면 그냥 통과
  return NextResponse.next();
}
