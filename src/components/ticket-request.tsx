import CardWrapper from "@/components/ui/card-wrapper";
import Image from "next/image";
import React from "react";
import { BigBarChart } from "./DashboardChart";

function TicketRequest() {
  const header = ["Title", "Module", "ID", "Created By"];
  const body: string[][] = [];
  return (
    <div className="w-full">

      <div className="flex w-full gap-4">
        {/* change request by status */}
        <div className="w-full">
          <CardWrapper
            title="Change Request By Status"
            icon="/images/icons/finger.png"
            expandedIcon="/images/icons/hamburger.svg"
            showTitleLine
          >
            <div className="min-w-full">
              {/* todo: chart */}
              <div className="w-full">
                <BigBarChart />
              </div>
            </div>
          </CardWrapper>
        </div>

        {/*Request Tickt -my Team  */}
        <div className="w-full">
          <CardWrapper
            title="Request Ticket -my Team"
            icon={"/images/icons/finger.png"}
            expandedIcon={"/images/icons/hamburger.svg"}
            showTitleLine
          >
            <div className="w-full border border-gray-200 rounded-lg overflow-hidden">
              <table className="min-w-full text-sm text-left border-collapse">
                {/* Table Header */}
                <thead className="bg-blue-600 text-white">
                  <tr>
                    {header.map((head, index) => (
                      <th
                        key={index}
                        className={`px-4 py-2 font-semibold ${index === 0 ? "rounded-tl-lg" : ""
                          } ${index === header.length - 1 ? "rounded-tr-lg" : ""}`}
                      >
                        {head}
                      </th>
                    ))}
                  </tr>
                </thead>

                {/* Table Body */}
                <tbody>
                  {body.length === 0 ? (
                    <tr>
                      <td colSpan={header.length} className="py-10 text-center">
                        <div className="flex flex-col items-center justify-center py-14">
                           <Image src={"/images/icons/leading-icon-frame.svg"} alt="empty table" width={40} height={40} />
                          <h3 className="text-base font-semibold text-gray-800">
                            No item found
                          </h3>
                          <p className="text-sm text-gray-500">
                            Request found will be displayed here
                          </p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    body.map((row, rowIndex) => (
                      <tr
                        key={rowIndex}
                        className="border-b hover:bg-gray-50 last:border-none"
                      >
                        {row.map((cell, cellIndex) => (
                          <td key={cellIndex} className="px-4 py-2 text-gray-700">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>


          </CardWrapper>
        </div>
      </div>

    </div>
  );
}

export default TicketRequest;
