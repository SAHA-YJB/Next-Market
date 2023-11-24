"use client";
import Link from "next/link";
import { useState } from "react";
import NavItem from "./NavItem";

const Navbar = () => {
  const [menu, setMenu] = useState(false);
  const menuClickHandler = () => {
    setMenu(!menu);
  };
  return (
    <nav className="relative z-10 bg-green-600 text-white">
      <div className="sm:mx-10 lg:mx-20 mx-5 flex justify-between items-center">
        <div className="flex items-center text-2xl h-14">
          <Link href={"/"}>Logo</Link>
        </div>

        <div className="text-2xl sm:hidden">
          {menu === false ? (
            <button onClick={menuClickHandler}>+</button>
          ) : (
            <button onClick={menuClickHandler}>-</button>
          )}
        </div>

        <div className="hidden sm:block">
          <NavItem />
        </div>

        <div className="block sm:hidden">
          {menu === false ? null : <NavItem mobile />}
        </div>
      </div>

      <div></div>
    </nav>
  );
};

export default Navbar;
