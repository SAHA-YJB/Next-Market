import { TUserWithChat } from '@/types';
import React from 'react';
import User from './User';

interface ContactsProps {
  users: TUserWithChat[];
  currentUser: TUserWithChat;
  setLayout: (layout: boolean) => void;
  setReceiver: (receiver: {
    receiverId: string;
    receiverName: string;
    receiverImage: string;
  }) => void;
}

const Contacts = ({
  users,
  currentUser,
  setLayout,
  setReceiver,
}: ContactsProps) => {
  // 유저정보 저장
  const filterMessages = (
    userId: string,
    userName: string | null,
    userImage: string | null
  ) => {
    setReceiver({
      receiverId: userId,
      receiverName: userName || '',
      receiverImage: userImage || '',
    });
  };

  return (
    <div className='w-full overflow-auto h-[calc(100vh_-_56px)] border-[1px]'>
      <h1 className='m-4 text-2xl font-semibold'>채팅</h1>
      <hr />

      <div className='flex flex-col'>
        {users.length > 0 &&
          users
            // 현재 유저 제외 필터링
            .filter((user) => user.id !== currentUser?.id)
            .map((user) => {
              return (
                <div
                  key={user.id}
                  onClick={() => {
                    // 유저 정보 저장
                    filterMessages(user.id, user.name, user.image);
                    setLayout(true);
                  }}
                >
                  <User user={user} currentUserId={currentUser?.id} />
                </div>
              );
            })}
      </div>
    </div>
  );
};

export default Contacts;
