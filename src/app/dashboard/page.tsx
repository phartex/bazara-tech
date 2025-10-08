"use client";
import Header from "@/components/Header/Header";
import { useEffect, useState } from "react";

export default function Dashboard() {




  return (
    <div className="">
      <Header />
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>


      <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-md p-4 m-4">
        {/* <Statistics />
        <TicketManagent />
        <ChangeRequest />
        <AwaitingApproval />
        <IncidentTicket />
        <TicketResolution />
        <TicketRequest /> */}
      </div>

    </div>
  );
}
