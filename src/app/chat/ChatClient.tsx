'use client';
import Chat from '@/components/chat/Chat';
import Contacts from '@/components/chat/Contacts';
import { TUserWithChat } from '@/types';
import { User } from '@prisma/client';
import axios from 'axios';
import { useState } from 'react';
import useSWR from 'swr';

interface ChatClientProps {
  currentUser?: User | null;
}

const ChatClient = ({ currentUser }: ChatClientProps) => {
  //받는 사람 상태
  const [receiver, setReceiver] = useState({
    receiverId: '',
    receiverName: '',
    receiverImage: '',
  });
  //반응형 레이아웃 상태
  const [layout, setLayout] = useState(false);

  const fetcher = (url: string) => axios.get(url).then((res) => res.data);
  //폴링
  const {
    data: users,
    error,
    isLoading,
  } = useSWR('/api/chat', fetcher, {
    // 1초마다 요청을 보냄
    refreshInterval: 1000,
  });

  //현재 유저가 메세지를 보낸 유저인지 확인
  const currentUserWithMessage = users?.find(
    (user: TUserWithChat) => user.email === currentUser?.email
  );

  if (isLoading) return <p>loading...</p>;
  if (error) return <p>Error!</p>;

  return (
    <main>
      <div className='grid grid-cols-[1fr] md:grid-cols-[300px_1fr]'>
        {/* md보다 클 때는 둘 다 보이기 */}
        {/* md보다 작고 layout이 true일 때는 contact 안 보임 */}
        <section className={`md:flex ${layout && 'hidden'}`}>
          <Contacts
            users={users}
            currentUser={currentUserWithMessage}
            setLayout={setLayout}
            setReceiver={setReceiver}
          />
        </section>

        {/* md보다 작고 layout이 false일 때는 chat 안 보임 */}
        <section className={`md:flex ${!layout && 'hidden'}`}>
          <Chat
            currentUser={currentUserWithMessage}
            receiver={receiver}
            setLayout={setLayout}
          />
        </section>
      </div>
    </main>
  );
};

export default ChatClient;
