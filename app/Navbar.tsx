"use client";

import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { AiFillBug } from "react-icons/ai";

const Navbar = () => {
  const links = [
    {
      label: "Dashboard",
      href: "/",
    },
    {
      label: "Issues",
      href: "/issues",
    },
  ];

  const currentPath = usePathname();

  return (
    <nav className=" flex gap-4 items-center px-5 border-b h-14 mb-5">
      <Link href={"/"}>
        <AiFillBug />
      </Link>
      <div className=" flex gap-4 items-center">
        {links.map((link, i) => (
          <Link
            href={link.href}
            className={classNames({
              "text-zinc-500 hover:text-zinc-800 transition-colors": true,
              "text-zinc-900": link.href === currentPath,
              "text-zinc-500": link.href !== currentPath,
            })}
            key={i}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
