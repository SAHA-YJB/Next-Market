import getCurrentUser from '@/app/actions/getCurrentUser';
import { NextResponse } from 'next/server';
import prisma from '@/helpers/prismadb';

interface params {
  productId?: string;
}
// productId가 params임
export async function POST(request: Request, { params }: { params: params }) {
  // 로그인된 유저가 보낸 요청인지 확인 후 아니라면 로그인페이지로 리다이렉트
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return Response.redirect('/auth/login');
  }

  const { productId } = params;
  if (!productId || typeof productId !== 'string') {
    return new Error('유효하지 않은 아이디입니다.');
  }

  // 현재 유저의 좋아요 리스트에 productId가 없다면 추가
  let favoriteIds = [...(currentUser.favoriteIds || [])];
  favoriteIds.push(productId);

  // 유저테이블에 아이디가 현재유저의 아이디와 같은 것에 favoriteIds를 업데이트
  const user = await prisma?.user.update({
    where: { id: currentUser.id },
    data: { favoriteIds },
  });

  return NextResponse.json(user);
}
// // // // // // //// // // // // // //// // // // // // //// // // // // // //
export async function DELETE(request: Request, { params }: { params: params }) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return Response.redirect('/auth/login');
  }

  const { productId } = params;
  if (!productId || typeof productId !== 'string') {
    return new Error('유효하지 않은 아이디입니다.');
  }

  let favoriteIds = [...(currentUser.favoriteIds || [])];
  favoriteIds = favoriteIds.filter((id) => id !== productId);

  const user = await prisma?.user.update({
    where: { id: currentUser.id },
    data: { favoriteIds },
  });

  return NextResponse.json(user);
}
