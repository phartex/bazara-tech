"use client";

import React from "react";
import CardWrapper from "@/components/ui/card-wrapper";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar, ChevronDown, Download, MoreVertical } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { teamIncidentTicket } from "@/store/data/dashboard";


function IncidentTicket() {
  return (
    <div className="mt-6">
      <CardWrapper
        title="Incident Tickets Assigned to my Team"
        icon={"/images/icons/finger.png"}
        expandedIcon={"/images/icons/hamburger.svg"}
        showTitleLine
      >
        {/* Filters */}
        <div className="flex flex-wrap justify-between items-center gap-3 mb-4">
          <div className="flex items-center gap-3 flex-wrap">
            <Input
              placeholder="Search by user name"
              className="w-[220px] md:w-[260px]"
            />
            <Button
              variant="outline"
              className="flex items-center gap-2 text-[#1659E6] border border-gray-300"
            >
              <Calendar className="h-4 w-4" />
              24/04/2025
            </Button>
            <Button
              variant="outline"
              className="flex items-center gap-2 border border-gray-300"
            >
              More Filters
              <ChevronDown className="h-4 w-4" />
            </Button>
          </div>

          <Button
            className="flex items-center gap-2 bg-[#1659E6] hover:bg-[#1659E6]/90 text-white"
          >
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-[#1659E6] text-white ">
              <TableRow>
                {teamIncidentTicket.header.map((header, i) => (
                  <TableHead key={i} className="text-white font-medium">
                    {header}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>

            <TableBody>
              {teamIncidentTicket.body.map((row, i) => (
                <TableRow key={i} className="hover:bg-gray-50">
                  {row.map((cell, j) => (
                    <TableCell key={j} className="py-3">
                      {/* Show badge for status column */}
                      {cell === "Pending" ? (
                        <Badge className="bg-yellow-100 text-yellow-800 rounded-md">
                          {cell}
                        </Badge>
                      ) : (
                        cell
                      )}
                    </TableCell>
                  ))}

                  {/* Action Menu */}
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="p-0 h-auto">
                          <MoreVertical className="h-4 w-4 text-gray-500" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Assign</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardWrapper>
    </div>
  );
}

export default IncidentTicket;
