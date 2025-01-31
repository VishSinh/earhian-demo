// components/ui/data-table.tsx
"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
  import { CheckCircle2, Clock4, XCircle, Edit, Trash2 } from "lucide-react";
  import { Button } from "@/components/ui/button";
  import { Badge } from "@/components/ui/badge";
  import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationLink, PaginationNext } from "@/components/ui/pagination";
  import { useState } from "react";
  
  // Dummy data type
  export type User = {
    id: string;
    name: string;
    email: string;
    role: "Admin" | "User" | "Manager";
    status: "active" | "inactive" | "pending";
  };
  
  // Generate dummy data
  const generateDummyData = (): User[] => {
    const data: User[] = [];
    for (let i = 0; i < 50; i++) {
      data.push({
        id: `USER-${1000 + i}`,
        name: `User ${i + 1}`,
        email: `user${i + 1}@example.com`,
        role: i % 3 === 0 ? "Admin" : i % 3 === 1 ? "Manager" : "User",
        status: i % 4 === 0 ? "pending" : i % 2 === 0 ? "active" : "inactive",
      });
    }
    return data;
  };
  
  // Status Badge Component
  const StatusBadge = ({ status }: { status: User["status"] }) => {
    const statusConfig = {
      active: {
        icon: CheckCircle2,
        color: "bg-emerald-100 text-emerald-800 hover:bg-emerald-200",
      },
      inactive: {
        icon: XCircle,
        color: "bg-rose-100 text-rose-800 hover:bg-rose-200",
      },
      pending: {
        icon: Clock4,
        color: "bg-amber-100 text-amber-800 hover:bg-amber-200",
      },
    };
  
    const { icon: Icon, color } = statusConfig[status];
  
    return (
      <Badge className={`${color} gap-2`}>
        <Icon className="h-4 w-4" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };
  
  // Pagination Component
  const CustomPagination = ({
    currentPage,
    totalPages,
    onPageChange,
  }: {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
  }) => {
    return (
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage > 1) onPageChange(currentPage - 1);
              }}
              aria-disabled={currentPage === 1}
            />
          </PaginationItem>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onPageChange(page);
                }}
                isActive={page === currentPage}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}
  
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage < totalPages) onPageChange(currentPage + 1);
              }}
              aria-disabled={currentPage === totalPages}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
  };
  
  // Data Table Component
  export function DataTable() {
    const users = generateDummyData();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
  
    const totalPages = Math.ceil(users.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentUsers = users.slice(startIndex, endIndex);
  
    const handleDelete = (userId: string) => {
      console.log("Delete user:", userId);
      // Add your delete logic here
    };
  
    const handleEdit = (userId: string) => {
      console.log("Edit user:", userId);
      // Add your edit logic here
    };
  
    return (
      <div className="rounded-lg border shadow-sm">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="w-[150px]">ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[120px] text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentUsers.map((user) => (
              <TableRow key={user.id} className="hover:bg-gray-50">
                <TableCell className="font-medium">{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={
                      user.role === "Admin"
                        ? "border-purple-300 text-purple-700"
                        : user.role === "Manager"
                        ? "border-blue-300 text-blue-700"
                        : "border-gray-300 text-gray-700"
                    }
                  >
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell>
                  <StatusBadge status={user.status} />
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(user.id)}
                      className="text-gray-600 hover:text-blue-600"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(user.id)}
                      className="text-gray-600 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        <div className="border-t p-4">
          <CustomPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    );
  }