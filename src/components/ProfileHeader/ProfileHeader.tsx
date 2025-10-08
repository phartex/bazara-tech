
"use client";
import { Menu, MenuButton, Transition } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";

export default function ProfileHeader() {
  return (
    <div className="relative inline-block text-left">
      <Menu as="div" className=" relative inline-block text-left">
        {/* Button */}
        <MenuButton className=" w-8 cursor-pointer focus:outline-none">
          <Image src={`/images/icons/wrapper.svg`} height={32} width={32} alt='notification' />
  
        </MenuButton>

        {/* Dropdown */}
        <Transition
          as={Fragment}
          enter="transition ease-out duration-150"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-100"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className=" absolute z-50 right-full bottom-full top-0  mt-3 w-64 origin-top-right bg-white shadow-[#1018280A] shadow-lg rounded-xl border border-gray-100 focus:outline-none">
        
        <div className="bg-white  shadow-[#1018280A] drop-shadow-lg shadow-lg rounded-xl ">
            {/* User info */}
            <div className="flex items-center gap-3 p-4 border-b border-gray-100">
              <div className="bg-blue-100 p-2 rounded-full">
                {/* <FiUser className="w-6 h-6 text-blue-600" /> */}
                 <Image src={`/images/icons/wrapper.svg`} height={32} width={32} alt='notification'  />
  
              </div>
              <div>
                <p className="font-medium text-gray-800">Daniel Joseph</p>
                <p className="text-xs text-gray-500 truncate w-40">
                  daniel.joseph@accessbankplc.com
                </p>
              </div>
            </div>

            {/* Menu items */}
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <Link
                  href="#"
                    className={`w-full flex items-center gap-3 px-4 py-3 ${
                      active ? "bg-gray-50" : ""
                    } text-gray-700`}
                  >
                    <Image src={`/images/icons/wrapper.svg`} height={16} width={16} alt='profile'  />
      <span>Profile</span>
                  </Link>
                )}
              </Menu.Item>

              <Menu.Item>
                {({ active }) => (
                  <Link
                  href="/logout"
                    className={`w-full flex items-center gap-3 px-4 py-3 ${
                      active ? "bg-red-50" : ""
                    } text-red-500`}
                  >
                       <Image src={`/images/icons/logout.svg`} height={16} width={16} alt='logout'  />
  
                    <span>Logout</span>
                  </Link>
                )}
              </Menu.Item>
            </div>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
