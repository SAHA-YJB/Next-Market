'use client';
import useFavorite from '@/hooks/useFavorite';
import { User } from '@prisma/client';
import React from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

interface HeartButtonProps {
  currentUser?: User | null;
  productId: string;
}

const HeartButton = ({ currentUser, productId }: HeartButtonProps) => {
  const { hasFavorite, toggleFavorite } = useFavorite({
    currentUser,
    productId,
  });
  return (
    <div
      onClick={toggleFavorite}
      className='relative transition cursor-pointer hover:opacity-80'
    >
      <AiOutlineHeart
        size={28}
        className='fill-white absolute -top-[2px] -right-[2px]'
      />
      <AiFillHeart
        size={24}
        className={hasFavorite ? `fill-rose-500` : 'fill-neutral-500/70'}
      />
    </div>
  );
};

export default HeartButton;
