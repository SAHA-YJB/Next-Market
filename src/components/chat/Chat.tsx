import { TUserWithChat } from '@/types';
import React, { useEffect, useRef } from 'react';
import ChatInput from './Input';
import ChatHeader from './ChatHeader';
import Message from './Message';

interface ChatProps {
  currentUser: TUserWithChat;
  receiver: {
    receiverId: string;
    receiverName: string;
    receiverImage: string;
  };
  setLayout: (layout: boolean) => void;
}

const Chat = ({ currentUser, receiver, setLayout }: ChatProps) => {
  //메시지 최신 자동 스크롤
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({ behavior: 'smooth' });
  };
  useEffect(() => {
    scrollToBottom();
  });

  // 내가 날린 대화 제외 상대방 대화 배열화
  const conversation = currentUser?.conversations.find((conversation) =>
    conversation.users.find((user) => user.id === receiver.receiverId)
  );

  if (!receiver.receiverName || !currentUser) {
    return <div className='w-full h-full'></div>;
  }

  return (
    <div className='w-full'>
      <div>
        <ChatHeader
          setLayout={setLayout}
          receiverName={receiver?.receiverName}
          receiverImage={receiver?.receiverImage}
          lastMessageTime={
            // 마지막 메시지 시간 추출
            conversation?.messages
              .filter((message) => message.receiverId === currentUser.id)
              .slice(-1)[0]?.createdAt
          }
        />
      </div>

      <div className='flex flex-col gap-8 p-4 overflow-auto h-[calc(100vh_-_60px_-_70px_-_80px)]'>
        {conversation &&
          conversation.messages.map((message) => {
            return (
              <Message
                key={message.id}
                isSender={message.senderId === currentUser.id}
                messageText={message.text}
                messageImage={message.imageSrc}
                receiverName={receiver.receiverName}
                receiverImage={receiver.receiverImage}
                senderImage={currentUser.image}
                time={message.createdAt}
              />
            );
          })}
        <div ref={messagesEndRef} />
      </div>

      <div>
        <ChatInput
          receiverId={receiver?.receiverId}
          currentUserId={currentUser?.id}
        />
      </div>
    </div>
  );
};

export default Chat;
