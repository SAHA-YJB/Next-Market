'use client';
import { PRODUCTS_PER_PAGE } from '@/constants';
import { useSearchParams } from 'next/navigation';
import React, { PropsWithChildren } from 'react';
import qs from 'query-string';
import Link from 'next/link';

type PaginationLinkProps = {
  page: number;
  disabled?: boolean;
  active?: boolean;
} & PropsWithChildren;
// children: React.ReactNode
// 이 방법 말고도 & PropsWithChildren; 이것도 있다

const PaginationLink = ({
  page,
  disabled,
  active,
  children,
}: PaginationLinkProps) => {
  const params = useSearchParams();
  const limit = PRODUCTS_PER_PAGE;
  const skip = page ? (Number(page) - 1) * limit : 0;

  let currentQuery = {};

  if (params) {
    // ex)category=interior 이런값을 객체로 변환
    currentQuery = qs.parse(params?.toString());
  }

  // 페이지랑 스킵 추가
  const updatedQuery = {
    ...currentQuery,
    page,
    skip,
  };

  return (
    <Link
      href={{ query: updatedQuery }}
      className={`
    p-2
    text-2xl
    ${active ? 'font-bold text-green-500' : 'text-gray-500'}
    ${disabled ? 'pointer-events-none text-gray-500' : ''}
  `}
    >
      {children}
    </Link>
  );
};

export default PaginationLink;
