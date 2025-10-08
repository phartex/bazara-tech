import CardWrapper from "@/components/ui/card-wrapper";
import React from "react";
import Image from "next/image";
import { DonutChartCard, HorizontalChart } from "./DashboardChart";
import { pendingData, ticketManagementData } from "@/store/data/dashboard";

function TicketManagement() {

  return (
    <div>
      <div className="my-4 gap-4 flex items-center w-full ">
        <div className="flex-">
          {/* Ticket Resolved */}
          <div className="mb-6">
            <CardWrapper
              title="Tickets Resolved by Agent - Team"
              icon={"/images/icons/x.svg"}
              expandedIcon={"/images/icons/hamburger.svg"}
              showTitleLine
            >
              {/* chart */}
              <div className="h-[380px] ">
                {/* <AgentTicketsChart /> */}
                <HorizontalChart ticketData={ticketManagementData} />
                {/* <DashboardChart /> */}
              </div>
            </CardWrapper>
          </div>

          {/* Average Response Time */}
          <div className="flex  w-full gap-2 justify-between">
            {["", ""].map((item, index) => (
              <div key={index} className="flex w-full ">
                <CardWrapper
                  title="Average Incident Response Time - Me"
                  expandedIcon="/images/icons/exp-arrows.svg"
                  showTitleLine
                >
                  <div className="flex justify-between">
                    <div className="">
                      <h6 className="text-lg font-semibold mb-3">
                        {" "}
                        0:04:01 <span className="text-[#A3A3A3]">Hours</span>
                      </h6>
                      <p className="text-xs  text-[#22C55E]">
                        11.2%
                        <span className="ml-1 text-[#808080]">
                          response time this week
                        </span>
                      </p>
                    </div>
                    <div className="">
                      <Image
                        src={"/images/chart-positive.svg"}
                        alt="chart-positive"
                        width={65}
                        height={54}
                      />
                    </div>
                  </div>
                </CardWrapper>
              </div>
            ))}
          </div>
        </div>

        {/* Pending Tickets and Category*/}
        <div className="flex flex-1 flex-col gap-4 w-full">
          {pendingData.map((item, index) => (
            <div className="" key={index}>
              <CardWrapper
                title={item.name}
                icon={"/images/icons/finger.png"}
                expandedIcon={"/images/icons/hamburger.svg"}
                showTitleLine
              >
                <div className=" max-w-full">
                  <h6 className="text-xl font-bold">{item.value}</h6>
                  <p className="text-[#808080] text-sm">{item.name}</p>
                </div>
              </CardWrapper>
            </div>
          ))}

          {/* Change result by category */}
          <div className="">
            <CardWrapper
              title="Change Result By Category"
              icon={"/images/icons/finger.png"}
              expandedIcon={"/images/icons/hamburger.svg"}
              showTitleLine
            >
              <div className="flex items-center justify-center min-h-[230px]">
                <DonutChartCard />
              </div>
            </CardWrapper>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TicketManagement;
