"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLink: React.FC<NavLinkProps> = ({ title, url }) => {
  const pathname = usePathname();
  const isActive = pathname === url;

  return (
    <Link href={url} className={`mx-2 lg:mx-4 text-sm p-2 rounded ${isActive ? 'bg-[#E8EEFD] text-[#1659E6]' : 'text-gray-700'}`}>
      {title}
    </Link>
  );
};
export default NavLink