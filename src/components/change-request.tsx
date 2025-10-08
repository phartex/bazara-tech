import CardWrapper from "@/components/ui/card-wrapper";
import React from "react";
import { LineCharts } from "./DashboardChart";
import { changeRequestData } from "@/store/data/dashboard";


function ChangeRequest() {
  return (
    <div>
      <CardWrapper
        title="Change Request By Status"
        icon={"/images/icons/finger.png"}
        expandedIcon={"/images/icons/hamburger.svg"}
        showTitleLine
      >
        <div className="min-w-full">
        
          <div className="min-h-[390px] w-full">
            <LineCharts data={changeRequestData}/>
          </div>
        </div>
      </CardWrapper>
    </div>
  );
}

export default ChangeRequest;
