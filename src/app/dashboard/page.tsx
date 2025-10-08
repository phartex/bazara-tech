"use client";
import ApprovalTable from "@/components/approval-table";
import ChangeRequest from "@/components/change-request";
import Header from "@/components/Header/Header";
import IncidentTicket from "@/components/incident-table";
import Statistics from "@/components/statistics";
import TicketManagement from "@/components/ticket-management";
import TicketRequest from "@/components/ticket-request";
import TicketResolution from "@/components/ticket-resolution";


export default function Dashboard() {
  return (
    <div className="">
      <Header />
      <h1 className="text-2xl font-bold mb-6 p-4">Home</h1>


      <div className="overflow-x-auto rounded-lg border border-gray-200 p-4 m-4">
        <Statistics />
        <TicketManagement />
        <ChangeRequest />
        <ApprovalTable />
        <IncidentTicket />
        <TicketResolution />
        <TicketRequest />
      </div>

    </div>
  );
}
