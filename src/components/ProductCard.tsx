'use client';
import { Product, User } from '@prisma/client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import HeartButton from './HeartButton';
import { fromNow } from '@/helpers/dayjs';

interface ProductCardProps {
  // 프리즈마 스키마에 작성한 모델을 토대로 타입을 만들어줌
  currentUser?: User | null;
  data: Product;
}

const ProductCard = ({ currentUser, data }: ProductCardProps) => {
  const router = useRouter();
  return (
    // ex)
    // col-span-2는 요소가 그리드 컬럼 2개를 차지하도록 설정
    // col-span-3은 요소가 그리드 컬럼 3개를 차지하도록 설정
    <div
      onClick={() => router.push(`/products/${data.id}`)}
      className='col-span-1 cursor-pointer group'
    >
      <div className='flex flex-col w-full gap-2'>
        <div className='relative w-full overflow-hidden aspect-square rounded-xl'>
          <Image
            src={data.imageSrc}
            fill
            sizes='auto'
            className='object-cover w-ull h-full transition group-hover:scale-110'
            alt='product'
          />
          <div className='absolute top-3 right-3'>
            <HeartButton currentUser={currentUser} productId={data.id} />
          </div>
        </div>

        <div className='text-lg font-semibold'>{data.title}</div>
        <div className='font-light text-neutral-500'>{data.category}</div>
        <div className='flex items-center justify-between gap-1'>
          <div>
            {data.price} <span className='font-light'>원</span>
          </div>
          <div className='text-neutral-400 font-light'>
            {fromNow(data.createdAt)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
