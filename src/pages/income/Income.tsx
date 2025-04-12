
import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { DatePickerWithRange } from "@/components/DateRangePicker";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { PlusIcon, ArrowUpIcon, FilterIcon, DownloadIcon } from "lucide-react";
import { Input } from "@/components/ui/input";

// Mock data for income entries
const mockIncomeData = [
  { id: 1, source: "Salary", amount: 3500, date: "2025-04-01", category: "Employment" },
  { id: 2, source: "Freelance Work", amount: 750, date: "2025-04-05", category: "Self-employment" },
  { id: 3, source: "Dividend", amount: 125, date: "2025-04-10", category: "Investment" },
  { id: 4, source: "Rental Income", amount: 950, date: "2025-04-15", category: "Property" },
  { id: 5, source: "Side Project", amount: 300, date: "2025-04-20", category: "Self-employment" },
];

// Mock data for income categories
const incomeCategories = [
  { value: 'all', label: 'All Categories' },
  { value: 'employment', label: 'Employment' },
  { value: 'self-employment', label: 'Self-employment' },
  { value: 'investment', label: 'Investment' },
  { value: 'property', label: 'Property' },
  { value: 'other', label: 'Other' },
];

const Income: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Total income calculation
  const totalIncome = mockIncomeData.reduce((sum, item) => sum + item.amount, 0);

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Income</h1>
        <p className="text-muted-foreground">
          Track and manage your income sources
        </p>
      </div>

      <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-3 mb-6">
        <Card>
          <CardHeader className="pb-2 px-4 pt-4">
            <CardDescription>Total Income</CardDescription>
            <CardTitle className="text-xl md:text-2xl flex items-center">
              ${totalIncome.toLocaleString()}
              <ArrowUpIcon className="ml-2 h-4 w-4 text-green-500" />
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <div className="text-xs text-muted-foreground">
              Total income for selected period
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6">
        <CardHeader className="px-6 py-4">
          <CardTitle className="text-lg">Income Entries</CardTitle>
          <CardDescription>Manage your income sources and entries</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 justify-between mb-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <DatePickerWithRange />
              <div className="relative w-full sm:w-[200px]">
                <select
                  className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm leading-loose focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 appearance-none pr-8"
                  defaultValue="all"
                >
                  {incomeCategories.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
                <FilterIcon className="absolute right-3 top-3 h-4 w-4 opacity-50" />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative">
                <Input
                  type="search"
                  placeholder="Search income..."
                  className="w-full sm:w-[200px]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon">
                <DownloadIcon className="h-4 w-4" />
                <span className="sr-only">Download report</span>
              </Button>
              <Button>
                <PlusIcon className="mr-2 h-4 w-4" />
                Add Income
              </Button>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Source</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockIncomeData.map((income) => (
                  <TableRow key={income.id} className="cursor-pointer hover:bg-muted/50">
                    <TableCell className="font-medium">{income.source}</TableCell>
                    <TableCell>{income.category}</TableCell>
                    <TableCell>{income.date}</TableCell>
                    <TableCell className="text-right">${income.amount.toFixed(2)}</TableCell>
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

export default Income;
