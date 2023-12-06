import { TConversation, TUserWithChat } from '@/types';
import React from 'react';
import Avatar from '../Avatar';
import { fromNow } from '@/helpers/dayjs';

interface UserProps {
  user: TUserWithChat;
  currentUserId: string;
}

const User = ({ user, currentUserId }: UserProps) => {
  // 현재 유저와 메세지를 주고 받은 유저의 메시지 중 마지막 메시지 정보를 추출
  const messagesWithCurrentUser = user.conversations.find(
    (conversation: TConversation) => {
      conversation.users.find((user) => user.id === currentUserId);
    }
  );
  const latestMessage = messagesWithCurrentUser?.messages.slice(-1)[0];

  return (
    <div className='grid grid-cols-[40px_1fr_5px] grid-rows-[40px] gap-3 py-3 px-4 border-b-[1px] hover:cursor-pointer hover:bg-green-300'>
      <div>
        <Avatar src={user.image} />
      </div>
      <div>
        <h3>{user.name}</h3>
        {latestMessage && (
          <p className='overflow-hidden text-xs font-medium text-gray-600 break-words whitespace-pre-wrap'>
            {latestMessage.text}
          </p>
        )}
        {latestMessage && latestMessage.imageSrc && (
          <p className='text-xs font-medium text-gray-600'>사진</p>
        )}
      </div>
      <div className='flex justify-end text-xs text-gray-500'>
        {latestMessage && (
          <p className='text-xs font-medium text-gray-600'>
            {fromNow(latestMessage.createdAt)}
          </p>
        )}
      </div>
    </div>
  );
};

export default User;
