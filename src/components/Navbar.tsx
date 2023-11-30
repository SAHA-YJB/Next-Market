'use client';
import Link from 'next/link';
import { useState } from 'react';
import NavItem from './NavItem';
import { User } from '@prisma/client';

interface NavbarProps {
  //프리즈마 모델에 있는 유저타입
  currentUser?: User | null;
}

const Navbar = ({ currentUser }: NavbarProps) => {
  const [menu, setMenu] = useState(false);
  const menuClickHandler = () => {
    setMenu(!menu);
  };
  return (
    <nav className='relative z-10 bg-green-500 text-white'>
      <div className='sm:mx-10 lg:mx-20 mx-5 flex justify-between items-center'>
        <div className='flex items-center text-2xl h-14'>
          <Link href={'/'}>Logo</Link>
        </div>

        {/* 원래는 안 보이지만 스몰보다 클 때 보임 */}
        <div className='hidden sm:block'>
          {/* 현재유저 내려주기 */}
          <NavItem currentUser={currentUser} />
        </div>

        {/* 원래는 보이지만 스몰보다 클 때 안보임 */}
        <div className='block sm:hidden'>
          {menu === false ? null : <NavItem mobile currentUser={currentUser} />}
        </div>

        {/* 스몰보다 클 때 안보임 */}
        <div className='text-2xl sm:hidden'>
          {menu === false ? (
            <button onClick={menuClickHandler}>+</button>
          ) : (
            <button onClick={menuClickHandler}>-</button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
