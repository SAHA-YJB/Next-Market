'use client';
import Chat from '@/components/chat/Chat';
import Contacts from '@/components/chat/Contacts';
import { TUserWithChat } from '@/types';
import { User } from '@prisma/client';
import axios from 'axios';
import { useState } from 'react';
import useSwr from 'swr';

interface ChatClientProps {
  currentUser?: User | null;
}

const ChatClient = ({ currentUser }: ChatClientProps) => {
  const [receiver, setReceiver] = useState({
    receiverId: '',
    receiverName: '',
    receiverImage: '',
  });
  const [layout, setLayout] = useState(false);

  //폴링
  const fetcher = (url: string) => axios.get(url).then((res) => res.data);
  const {
    data: users,
    error,
    isLoading,
  } = useSwr('/api/chat', fetcher, {
    refreshInterval: 1000,
  });

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
