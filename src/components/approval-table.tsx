"use client";
import React from "react";
import CardWrapper from "@/components/ui/card-wrapper";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { approvalTable } from "@/store/data/dashboard";

function ApprovalTable() {
  return (
    <div className="mt-6">
      <CardWrapper
        title="Awaiting Approval"
        icon={"/images/icons/finger.png"}
        expandedIcon={"/images/icons/hamburger.svg"}
        showTitleLine
      >
        <div className="overflow-x-auto rounded-xl border border-gray-100 shadow-sm mt-4">
          <Table>
            <TableHeader className="bg-[#1659E6] text-white">
              <TableRow>
                {approvalTable.header.map((head, index) => (
                  <TableHead key={index} className="text-white font-semibold">
                    {head}
                  </TableHead>
                ))}
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="">
              {approvalTable.body.map((row, rowIndex) => (
                <TableRow key={rowIndex} className="hover:bg-gray-50">
                  {row.slice(0, 6).map((cell, cellIndex) => (
                    <TableCell key={cellIndex} className="py-3 text-gray-700">
                      {cell}
                    </TableCell>
                  ))}
                  <TableCell>
                    <Badge className="bg-yellow-100 text-yellow-800 font-medium px-3 py-1 rounded-full">
                      {row[6]}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View</DropdownMenuItem>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Delete</DropdownMenuItem>
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

export default ApprovalTable;
