import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import React from "react";

export interface CardWrapperProps {
  children?: React.ReactNode;
  title: string;
  isTitleLight?:boolean
  expandedIcon?: string | StaticImport;
  expandedFunction?: (params?: unknown) => void;
  showTitleLine?: boolean;
  icon?: string | StaticImport;
}
function CardWrapper(props: CardWrapperProps) {
  
  return (
    <div className=" rounded-md bg-white p-5 border border-gray-300 shadow-md drop-shadow-md">
      <div className=" flex w-full items-center ">
        {props.icon && (
          <div className="mr-2">
            <Image src={props.icon} alt="left icon" height={16} width={16} />
          </div>
        )}

        <h3 className={`${props.isTitleLight?"font-normal":"font-bold"}  text-md  text-[#333333]`}>{props.title}</h3>
        <div className=" ml-auto  h-4 ">
          {props.expandedIcon && (
            <button
              type="button"
              className=" cursor-pointer"
              onClick={props.expandedFunction}
            >
              <Image
                src={props.expandedIcon}
                alt="right icon"
                height={16}
                width={16}
              />
            </button>
          )}
        </div>
      </div>
      {props.showTitleLine && (
        <hr className=" border-[#F5F5F5] border w-full mt-3 " />
      )}
      <div className="mt-4 w-full">{props.children}</div>
    </div>
  );
}

export default CardWrapper;
