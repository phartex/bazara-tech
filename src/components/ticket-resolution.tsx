import CardWrapper from "@/components/ui/card-wrapper";
import React from "react";
import { BarCharts } from "./DashboardChart";
import { ticketResolutionData } from "@/store/data/dashboard";


function TicketResolution() {
  return (
    <div className="my-4">
      <CardWrapper
        title="Tickets Resolved by Agent - Team"
        icon={"/images/icons/finger.png"}
        expandedIcon={"/images/icons/hamburger.svg"}
        showTitleLine
      >
        <div className="">
          {/* Chart */}
          <div className=" h-[400px]">
            <BarCharts data={ticketResolutionData} />
          </div>
        </div>
      </CardWrapper>
    </div>
  );
}

export default TicketResolution;
