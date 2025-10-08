
import {v4} from "uuid"
import React from "react";
import TicketCard from "./ui/ticket-card";
import { statisticsData } from "@/store/data/dashboard";

function Statistics() {
  return (
    <div>
      <div className="flex flex-wrap justify-between ">
        {
          statisticsData.map(item=> <TicketCard key={v4()} {...item} />)
        }
       
      
      </div>
    </div>
  );
}

export default Statistics;
