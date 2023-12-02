'use client';
import React from 'react';
import Heading from './Heading';
import Button from './Button';
import { useRouter } from 'next/navigation';

interface EmptyStateProps {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
}

// 처음에는 그냥 EmptyState를 jsx로 바로 사용했지만
// 재 사용성을 위해 프랍스로 받음
const EmptyState = ({
  title = '일치하는 항목이 없습니다',
  subtitle = '다른 검색어를 입력하거나, 필터를 조정해보세요.',
  showReset,
}: EmptyStateProps) => {
  const router = useRouter();

  return (
    <div className='h-[60vh] flex flex-col gap-2 justify-center items-center'>
      <Heading title={title} center subtitle={subtitle} />
      <div className='w-48 mt-4'>
        {showReset && (
          <Button
            outline
            label='모든 필터 제거'
            onClick={() => router.push('/')}
          />
        )}
      </div>
    </div>
  );
};

export default EmptyState;
