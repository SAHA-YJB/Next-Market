import React from 'react';
import { TbBeach, TbMountain, TbPool } from 'react-icons/tb';
import { GiBoatFishing, GiIsland, GiWindmill } from 'react-icons/gi';
import { MdOutlineVilla } from 'react-icons/md';
import { FaSkiing } from 'react-icons/fa';

export const categories = [
  {
    label: '디지털 기기',
    path: 'digital',
    icon: TbBeach,
    description: '디지털 기기 카테고리',
  },
  {
    label: '생활가전',
    path: 'appliances',
    icon: GiWindmill,
    description: '생활 가전 카테고리',
  },
  {
    label: '가구 인테리어',
    path: 'interior',
    icon: MdOutlineVilla,
    description: '인테리어 카테고리',
  },
  {
    label: '여성의류',
    path: 'women clothing',
    icon: TbMountain,
    description: '여성의류 카테고리',
  },
  {
    label: '남성패션/잡화',
    path: 'max-fashion',
    icon: TbPool,
    description: '남성패션 잡화 카테고리',
  },
  {
    label: '뷰티/미용',
    path: 'beauty',
    icon: GiIsland,
    description: '뷰티/미용 카테고리',
  },
  {
    label: '스포츠/레저',
    path: 'sport',
    icon: GiBoatFishing,
    description: '스포츠/레저 카테고리',
  },
  {
    label: '중고차',
    path: 'used-car',
    icon: FaSkiing,
    description: '중고차 카테고리',
  },
];

const Categories = () => {
  return <div>Categories</div>;
};

export default Categories;
