'use client';
import { IoImageOutline } from 'react-icons/io5';
import { RiSendPlaneLine } from 'react-icons/ri';
import { useState } from 'react';
import axios from 'axios';
interface ChatInputProps {
  receiverId: string;
  currentUserId: string;
}

const ChatInput = ({ receiverId, currentUserId }: ChatInputProps) => {
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const imageUrl = '';

    if (message || imageUrl) {
      try {
        await axios.post('/api/chat', {
          text: message,
          image: imageUrl,
          receiverId,
          senderId: currentUserId,
        });
      } catch (error) {
        console.log('챗인풋에러', error);
      }
    }
    setMessage('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='relative flex items-center justify-between w-full gap-4 p-2 pl-4 border-[1px] border-gray-300 rounded-md shadow-sm'
    >
      <input
        className='w-full text-base outline-none'
        type='text'
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder='메시지를 작성해주세요'
      />
      <div className='text-2xl text-gray-200 cursor-pointer'>
        <IoImageOutline />
      </div>
      <button
        type='submit'
        className='flex items-center justify-center p-2 text-gray-900 bg-green-500 rounded-lg hover:bg-green-600 disabled:opacity-60'
      >
        <RiSendPlaneLine className='text-white' />
      </button>
    </form>
  );
};

export default ChatInput;
