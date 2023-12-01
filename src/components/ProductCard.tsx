'use client';
import { Product, User } from '@prisma/client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import HeartButton from './HeartButton';
import getCurrentUser from '@/app/actions/getCurrentUser';

interface ProductCardProps {
  currentUser?: User | null;
  data: Product;
}

const ProductCard = ({ currentUser, data }: ProductCardProps) => {
  const router = useRouter();
  return (
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
        <div>
          <div>
            {data.price} <span className='font-light'>원</span>
          </div>
          <div>{/* {data.createdAt} */}</div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
