import Link from "next/link";
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

  return (
    <nav className=" flex justify-between items-center px-5 border-b h-14 mb-5">
      <Link href={"/"}>
        <AiFillBug />
      </Link>
      <div className=" flex gap-4 items-center">
        {links.map((link, i) => (
          <Link href={link.href} key={i}>
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
