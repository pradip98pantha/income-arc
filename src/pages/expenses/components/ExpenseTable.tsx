
import React, { useState } from "react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { DatePickerWithRange } from "@/components/DateRangePicker";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FilterIcon, DownloadIcon, PlusIcon } from "lucide-react";

// Mock data for expense entries
const mockExpensesData = [
  { id: 1, description: "Grocery Shopping", amount: 85.99, date: "2025-04-12", category: "Groceries" },
  { id: 2, description: "Electricity Bill", amount: 120.50, date: "2025-04-10", category: "Utilities" },
  { id: 3, description: "Netflix Subscription", amount: 15.99, date: "2025-04-07", category: "Entertainment" },
  { id: 4, description: "Dinner with Friends", amount: 65.00, date: "2025-04-05", category: "Dining" },
  { id: 5, description: "Gas", amount: 45.25, date: "2025-04-03", category: "Transportation" },
];

// Mock data for expense categories
const expenseCategories = [
  { value: 'all', label: 'All Categories' },
  { value: 'groceries', label: 'Groceries' },
  { value: 'utilities', label: 'Utilities' },
  { value: 'entertainment', label: 'Entertainment' },
  { value: 'dining', label: 'Dining' },
  { value: 'transportation', label: 'Transportation' },
  { value: 'other', label: 'Other' },
];

interface ExpenseTableProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const ExpenseTable: React.FC<ExpenseTableProps> = ({ searchTerm, setSearchTerm }) => {
  return (
    <div>
      <div className="flex flex-col md:flex-row gap-4 justify-between mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <DatePickerWithRange />
          <div className="relative w-full sm:w-[200px]">
            <select
              className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm leading-loose focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 appearance-none pr-8"
              defaultValue="all"
            >
              {expenseCategories.map((category) => (
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
              placeholder="Search expenses..."
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
            Add Expense
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Description</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockExpensesData.map((expense) => (
              <TableRow key={expense.id} className="cursor-pointer hover:bg-muted/50">
                <TableCell className="font-medium">{expense.description}</TableCell>
                <TableCell>{expense.category}</TableCell>
                <TableCell>{expense.date}</TableCell>
                <TableCell className="text-right">${expense.amount.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ExpenseTable;
export { mockExpensesData };
