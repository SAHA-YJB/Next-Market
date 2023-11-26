"use client";
//넥스트 어스에서 제공하는 로그인 로그아웃 함수
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const NavItem = ({ mobile }: { mobile?: boolean }) => {
  const { data: session, status } = useSession();
  console.log({ session }, status);
  return (
    <ul
      className={`text-md flex justify-center gap-4 w-full items-center 
      ${mobile && "flex-col"} h-full`}
    >
      <li className="py-2 text-center border-b-4 cursor-pointer">
        <Link href="/admin">Admin</Link>
      </li>
      <li className="py-2 text-center border-b-4 cursor-pointer">
        <Link href="/user">User</Link>
      </li>
      {session?.user ? (
        <li className="py-2 text-center border-b-4 cursor-pointer">
          <button onClick={() => signOut()}>Logout</button>
        </li>
      ) : (
        <li className="py-2 text-center border-b-4 cursor-pointer">
          <button onClick={() => signIn()}>Login</button>
        </li>
      )}
    </ul>
  );
};

export default NavItem;
