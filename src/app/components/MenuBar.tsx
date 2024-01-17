"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";

import "../styles/menubar.css";

import { HiMenuAlt3 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";

import Logo from "@/public/img/logo/logo-provisoire.png";

export default function MenuBar() {
  const [state, setState] = React.useState(false);

  const menus = [
    { title: "Accueil", path: "/" },
    { title: "Les Partenaires", path: "/partenaires" },
    { title: "J'achète ma carte", path: "/achetercarte" },
    { title: "Contact", path: "/contact" },
    { title: <FaUserCircle size={25} />, path: "/signup" },
  ];

  return (
    <nav className="bg-white w-full border-b md:border-0">
      <div className="items-center px-4 max-w-screen-xl mx-auto md:flex md:px-8">
        <div className="flex items-center justify-between py-3 md:py-5 md:block">
          <Link href="/">
            <div className="flex items-center">
              <Image src={Logo} alt="Logo" width={50} />
              <h1 className="text-2xl font-bold text-gray-800 ml-2">
                Amiens Food
              </h1>
            </div>
          </Link>
          <div className="md:hidden">
            <button
              className="text-gray-800 outline-none p-2 rounded-md"
              onClick={() => setState(!state)}
            >
              {state ? <AiOutlineClose size={25} /> : <HiMenuAlt3 size={25} />}
            </button>
          </div>
        </div>
        <div
          className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
            state ? "block" : "hidden"
          }`}
        >
          <ul className="justify-end items-center space-y-8 md:flex md:space-x-6 md:space-y-0">
            {menus.map((item, idx) => (
              <li key={idx} className="link-underline link-underline-black text-gray-800">
                <Link href={item.path}>{item.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
