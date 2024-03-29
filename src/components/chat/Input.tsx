'use client';
import { previewImage } from '@/helpers/previewImage';
import { uploadImage } from '@/helpers/uploadImage';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { CgClose } from 'react-icons/cg';
import { IoImageOutline } from 'react-icons/io5';
import { RiSendPlaneLine } from 'react-icons/ri';
import useSWRMutation from 'swr/mutation';

interface ChatInputProps {
  receiverId: string;
  currentUserId: string;
}

const sendRequest = async (
  url: string,
  {
    arg,
  }: {
    arg: {
      text: string;
      image: string;
      receiverId: string;
      senderId: string;
    };
  }
) => {
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(arg),
  }).then((res) => res.json());
};

const ChatInput = ({ receiverId, currentUserId }: ChatInputProps) => {
  const [message, setMessage] = useState('');
  //이미지 업로드 버튼 ref
  const imageRef = useRef<HTMLInputElement>(null);
  // 이미지 url을 받을 상태
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [image, setImage] = useState<File | null>(null);

  // swr 뮤테이션 사용 시 trigger 함수가 호출되면 요청
  const { trigger } = useSWRMutation('/api/chat', sendRequest);

  const chooseImage = () => {
    imageRef.current?.click();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const imageUrl = image ? await uploadImage(image as File) : null;

    if (message || imageUrl) {
      try {
        trigger({
          text: message,
          image: imageUrl,
          receiverId,
          senderId: currentUserId,
        });
        // await axios.post('/api/chat', {
        //   text: message,
        //   image: imageUrl,
        //   receiverId,
        //   senderId: currentUserId,
        // });
      } catch (error) {
        console.log('chat input error', error);
      }
    }
    setMessage('');
    setImage(null);
    setImagePreview(null);
  };

  const removePreviewImage = () => {
    setImage(null);
    setImagePreview(null);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='relative flex items-center justify-between w-full gap-4 p-2 pl-4 border-[1px] border-gray-300 rounded-md shadow-sm'
    >
      {imagePreview && (
        <div className='absolute right-0 w-full overflow-hidden rounded-md bottom-[4.3rem] max-w-[300px] shadow-md'>
          <Image
            src={imagePreview}
            alt='preview'
            width={300}
            height={300}
            layout='responsive'
            className='object-cover'
          />
          <span
            onClick={removePreviewImage}
            className='absolute flex items-center justify-center p-2 text-xl text-white cursor-pointer 
            top-2 right-2 rounded-full opacity-60 hover:opacity-100'
          >
            <CgClose />
          </span>
        </div>
      )}
      <input
        className='w-full text-base outline-none'
        type='text'
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder='메시지를 작성해주세요'
      />
      {/* 이미지업로드 */}
      <input
        type='file'
        className='hidden'
        ref={imageRef}
        accept='image/*'
        multiple={false}
        onChange={(e) => previewImage(e, setImagePreview, setImage)}
      />

      <div
        onClick={chooseImage}
        className='text-2xl text-gray-200 cursor-pointer'
      >
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
