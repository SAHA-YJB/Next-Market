import { User } from '@prisma/client';
import React from 'react';
import Heading from '../Heading';
import Image from 'next/image';
import HeartButton from '../HeartButton';

interface ProductHeadProps {
  title: string;
  imageSrc: string;
  id: string;
  currentUser?: User | null;
}

const ProductHead = ({
  title,
  imageSrc,
  id,
  currentUser,
}: ProductHeadProps) => {
  return (
    <>
      <Heading title={title} />
      <div className='w-full h-[60vh] overflow-hidden rounded-xl relative'>
        <Image
          fill
          src={imageSrc}
          alt='product'
          className='object-cover w-full'
          priority
        />
        <div className='absolute top-5 right-5'>
          <HeartButton productId={id} currentUser={currentUser} />
        </div>
      </div>
    </>
  );
};

export default ProductHead;
