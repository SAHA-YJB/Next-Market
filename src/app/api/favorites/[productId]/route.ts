import getCurrentUser from '@/app/actions/getCurrentUser';
import { NextResponse } from 'next/server';
import prisma from '@/helpers/prismadb';

interface params {
  productId?: string;
}

export async function POST(request: Request, { params }: { params: params }) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return Response.redirect('/auth/login');
  }

  const { productId } = params;
  if (!productId || typeof productId !== 'string') {
    return new Error('유효하지 않은 아이디입니다.');
  }

  let favoriteIds = [...(currentUser.favoriteIds || [])];
  favoriteIds.push(productId);

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
