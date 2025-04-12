
import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { DatePickerWithRange } from "@/components/DateRangePicker";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { PlusIcon, ArrowDownIcon, FilterIcon, DownloadIcon, TrendingUpIcon, UsersIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { useNavigate } from "react-router-dom";

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

// Chart data
const chartData = [
  { name: "Groceries", value: 125 },
  { name: "Utilities", value: 210 },
  { name: "Entertainment", value: 85 },
  { name: "Dining", value: 140 },
  { name: "Transportation", value: 90 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

const Expenses: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  
  // Total expenses calculation
  const totalExpenses = mockExpensesData.reduce((sum, item) => sum + item.amount, 0);

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Expenses</h1>
        <p className="text-muted-foreground">
          Track and manage your expenses
        </p>
      </div>

      <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-3 mb-6">
        <Card>
          <CardHeader className="pb-2 px-4 pt-4">
            <CardDescription>Total Expenses</CardDescription>
            <CardTitle className="text-xl md:text-2xl flex items-center">
              ${totalExpenses.toLocaleString()}
              <ArrowDownIcon className="ml-2 h-4 w-4 text-red-500" />
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <div className="text-xs text-muted-foreground">
              Total expenses for selected period
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2 px-4 pt-4">
            <CardDescription>Budget Status</CardDescription>
            <CardTitle className="text-xl md:text-2xl flex items-center">
              <span className="text-green-500">Under Budget</span>
              <TrendingUpIcon className="ml-2 h-4 w-4 text-green-500" />
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <div className="text-xs text-muted-foreground">
              $250 under your monthly budget
            </div>
          </CardContent>
        </Card>

        <Card 
          className="cursor-pointer hover:bg-muted/50 transition-colors"
          onClick={() => navigate('/group-expenses')}
        >
          <CardHeader className="pb-2 px-4 pt-4">
            <CardDescription className="flex items-center gap-2">
              <UsersIcon className="h-4 w-4" /> Group Expenses
            </CardDescription>
            <CardTitle className="text-xl md:text-2xl">4 Active Groups</CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <div className="text-xs text-muted-foreground">
              Manage shared expenses and advances
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-3 mb-6">
        <Card className="md:col-span-2">
          <CardHeader className="px-6 py-4">
            <CardTitle className="text-lg">Expense Entries</CardTitle>
            <CardDescription>Your recent expenses</CardDescription>
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
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="px-6 py-4">
            <CardTitle className="text-lg">Expense Breakdown</CardTitle>
            <CardDescription>By category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {chartData.map((entry, index) => (
                <div key={`legend-${index}`} className="flex items-center">
                  <div 
                    className="w-3 h-3 mr-2"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  ></div>
                  <span className="text-xs">{entry.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Expenses;
