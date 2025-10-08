import React from "react";
import Image from "next/image";
import CardWrapper, { CardWrapperProps } from "./card-wrapper";

interface TicketCardProps extends CardWrapperProps, Statistics{

}

function TicketCard(props: TicketCardProps) {
  const {percentage_change,value}=props
  return (
    <div className="w-[400px]">
      <CardWrapper {...props}
      isTitleLight
      >
        <div className="flex justify-between  max-w-lg">
          <div className="">
            <h6 className="text-lg font-bold">{value}</h6>
            <p className={`${percentage_change>0?"text-[#22C55E]":'text-[#E43A39]'} text-xs `}>
              {percentage_change>0?"+":''}{percentage_change}% <span className="text-[#808080]">this week</span>
            </p>
          </div>
          <div className="mx-2">
            <Image
              src={"/images/chart.png"}
              height={40}
              width={130}
              alt="chart"
            />
          </div>
        </div>
      </CardWrapper>
    </div>
  );
}

export default TicketCard;
