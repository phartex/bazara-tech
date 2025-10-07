import React from 'react';
import NavLink from './component/navlink'
import SearchInput from '@/components/ui/search-input'

const Header = () => {

      const navLinks: NavLinkProps[] = [
    {
      title: 'Home',
      url: '/dashboard',
    },
    {
      title: 'Workbench',
      url: '#',
    },
    {
      title: 'Tickets',
      url: '#',
    },
    {
      title: 'Service Catalogue',
      url: '#',
    },
    {
      title: 'Knowledge Management',
      url: '#',
    },
    {
      title: 'Admin Settings',
      url: '#',
    },
  ]
  return (
  <div className="">
        {/* Nav bar */}
        <div className="flex items-center w-full px-4 py-4">
          {/* Logo */}
          <div className="flex flex-1/3  flex-col lg:flex-row items-center gap-2 w-full ">
          <div className="flex items-center gap-1">

            <Image
              src="/images/logo.svg"
              alt="Company Logo"
              width={22}
              height={22}
              priority
              />
            <p className="text-primary text-[#1659E6] text-lg font-semibold ">
              Bazara
            </p>
              </div>
              <div className="ml-2">

            <SearchInput placeholder='Search for anything' />
              </div>

          </div>

          {/* Links */}
          <div className=" flex-3/4 z-30 justify-center flex">
            {navLinks.map((link, index) => (
              <NavLink key={index} {...link} />
            ))}
          </div>

          {/* Avatar */}
          <div className="flex   gap-4 ">
            <Image
              src={`/images/icons/notification.svg`}
              height={32}
              width={32}
              alt="notification"
            />
            <Image
              src={`/images/icons/more.svg`}
              height={32}
              width={32}
              alt="notification"
            />
            <Profile />
          </div>
        </div>

        <div className="block h-10  w-full bg-[#1659E6]"></div>

        
      </div>
  )
}

export default Header
