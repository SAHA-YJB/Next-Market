import getCurrentUser from '@/app/actions/getCurrentUser';
import { NextResponse } from 'next/server';
import prisma from '@/helpers/prismadb';

export async function GET(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.redirect('/auth/login');
  }

  //유저 찾기
  const users = await prisma.user.findMany({
    include: {
      conversations: {
        include: {
          messages: {
            include: {
              sender: true,
              receiver: true,
            },
            orderBy: {
              // 오름차순
              createdAt: 'asc',
            },
          },
          users: true,
        },
      },
    },
  });
  return NextResponse.json(users);
}

// 챗인풋에서 요청을 보낸 후 요기로옴
export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.redirect('/auth/login');
  }

  const body = await request.json();

  //이미 둘이 대화를 한 conversation이 있는지 찾기
  const conversation = await prisma.conversation.findFirst({
    where: {
      AND: [
        {
          users: {
            some: {
              id: body.senderId,
            },
          },
        },
        {
          users: {
            some: {
              id: body.receiverId,
            },
          },
        },
      ],
    },
  });

  //기존의 conversation이 있다면 메시지만 생성하기
  if (conversation) {
    try {
      const message = await prisma.message.create({
        data: {
          text: body.text,
          imageSrc: body.image,
          senderId: body.senderId,
          receiverId: body.receiverId,
          conversationId: conversation.id,
        },
      });

      return NextResponse.json(message);
    } catch (error) {
      return NextResponse.json(error);
    }
  } else {
    // 처음 대화라면 컨벌세이션과 메시지 생성하기
    const newConversation = await prisma.conversation.create({
      data: {
        senderId: body.senderId,
        receiverId: body.receiverId,
        users: {
          connect: [
            {
              id: body.senderId,
            },
            {
              id: body.receiverId,
            },
          ],
        },
      },
    });

    try {
      //기존의 conversation이 있다면 메시지만 생성하기
      const message = await prisma.message.create({
        data: {
          text: body.text,
          imageSrc: body.image,
          senderId: body.senderId,
          receiverId: body.receiverId,
          conversationId: newConversation.id,
        },
      });

      return NextResponse.json(message);
    } catch (error) {
      return NextResponse.json(error);
    }
  }
}
