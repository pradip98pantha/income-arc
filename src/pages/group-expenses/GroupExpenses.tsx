
import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { PlusIcon, UsersIcon, FilterIcon, ArrowDownIcon, DownloadIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { DatePickerWithRange } from "@/components/DateRangePicker";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";

// Mock data for group expenses
const mockGroupExpenses = [
  {
    id: 1,
    title: "Vacation Trip",
    totalAmount: 1250.00,
    members: ["John", "Alice", "Bob", "Sarah"],
    date: "2025-04-10",
    advancedBy: "John",
    advanceAmount: 500,
    status: "active"
  },
  {
    id: 2,
    title: "Dinner Party",
    totalAmount: 320.50,
    members: ["Mike", "Emma", "David"],
    date: "2025-04-08",
    advancedBy: "Emma",
    advanceAmount: 150,
    status: "settled"
  },
  {
    id: 3,
    title: "Office Gift",
    totalAmount: 180.00,
    members: ["Alice", "David", "Sarah", "Tom", "Lisa"],
    date: "2025-04-05",
    advancedBy: "Alice",
    advanceAmount: 180,
    status: "active"
  },
  {
    id: 4,
    title: "Weekend Getaway",
    totalAmount: 850.75,
    members: ["John", "Mike", "Lisa"],
    date: "2025-04-02",
    advancedBy: "Lisa",
    advanceAmount: 400,
    status: "active"
  }
];

const GroupExpenses: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const filteredExpenses = mockGroupExpenses.filter(expense => {
    const matchesSearch = expense.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === "all" || expense.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const handleAddNewGroup = () => {
    toast({
      title: "Create Group Expense",
      description: "Group expense creation form would open here",
    });
  };

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Group Expenses</h1>
        <p className="text-muted-foreground">
          Track and manage shared expenses and advances
        </p>
      </div>

      <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-3 mb-6">
        <Card>
          <CardHeader className="pb-2 px-4 pt-4">
            <CardDescription>Active Groups</CardDescription>
            <CardTitle className="text-xl md:text-2xl">{mockGroupExpenses.filter(g => g.status === "active").length}</CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <div className="text-xs text-muted-foreground">
              Groups with ongoing expenses
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2 px-4 pt-4">
            <CardDescription>Total Advanced</CardDescription>
            <CardTitle className="text-xl md:text-2xl">
              ${mockGroupExpenses.reduce((sum, group) => sum + group.advanceAmount, 0).toFixed(2)}
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <div className="text-xs text-muted-foreground">
              Total amount advanced across all groups
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2 px-4 pt-4">
            <CardDescription>Total Group Expenses</CardDescription>
            <CardTitle className="text-xl md:text-2xl">
              ${mockGroupExpenses.reduce((sum, group) => sum + group.totalAmount, 0).toFixed(2)}
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <div className="text-xs text-muted-foreground">
              Combined expenses from all groups
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="px-6 py-4">
          <CardTitle className="text-lg">Group Expense Tracking</CardTitle>
          <CardDescription>Manage and track group expenses and advances</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 justify-between mb-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <DatePickerWithRange />
              <div className="relative w-full sm:w-[200px]">
                <select
                  className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm leading-loose focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 appearance-none pr-8"
                  defaultValue="all"
                  onChange={(e) => setSelectedStatus(e.target.value)}
                >
                  <option value="all">All Statuses</option>
                  <option value="active">Active</option>
                  <option value="settled">Settled</option>
                </select>
                <FilterIcon className="absolute right-3 top-3 h-4 w-4 opacity-50" />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative">
                <Input
                  type="search"
                  placeholder="Search groups..."
                  className="w-full sm:w-[200px]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon">
                <DownloadIcon className="h-4 w-4" />
                <span className="sr-only">Download report</span>
              </Button>
              <Button onClick={handleAddNewGroup}>
                <PlusIcon className="mr-2 h-4 w-4" />
                New Group Expense
              </Button>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Group Name</TableHead>
                  <TableHead>Members</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Advanced By</TableHead>
                  <TableHead>Advance Amount</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredExpenses.map((group) => (
                  <TableRow key={group.id} className="cursor-pointer hover:bg-muted/50">
                    <TableCell className="font-medium">{group.title}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <UsersIcon className="h-4 w-4 mr-2" />
                        <span>{group.members.length}</span>
                      </div>
                    </TableCell>
                    <TableCell>{group.date}</TableCell>
                    <TableCell>{group.advancedBy}</TableCell>
                    <TableCell>${group.advanceAmount.toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge variant={group.status === "active" ? "default" : "secondary"}>
                        {group.status === "active" ? "Active" : "Settled"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default GroupExpenses;
