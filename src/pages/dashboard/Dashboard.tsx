
import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpIcon, ArrowDownIcon, TrendingUpIcon, AlertCircleIcon, UsersIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

// This would come from your API in a real app
const mockData = {
  totalIncome: 4500,
  totalExpenses: 2850,
  balance: 1650,
  budget: 3000,
  recentExpenses: [
    { id: 1, amount: 45.99, category: "Groceries", date: "2025-04-10" },
    { id: 2, amount: 89.50, category: "Utilities", date: "2025-04-09" },
    { id: 3, amount: 12.99, category: "Subscription", date: "2025-04-08" },
    { id: 4, amount: 35.00, category: "Dining", date: "2025-04-07" },
  ],
  groupExpenses: [
    { id: 1, title: "Vacation Trip", totalAmount: 1250.00, members: 4, advancedBy: "John", date: "2025-04-10" },
    { id: 2, title: "Dinner Party", totalAmount: 320.50, members: 3, advancedBy: "Emma", date: "2025-04-08" },
  ]
};

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your financial situation
        </p>
      </div>

      <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-6 md:mb-8">
        <Card>
          <CardHeader className="pb-2 px-4 pt-4">
            <CardDescription>Total Income</CardDescription>
            <CardTitle className="text-xl md:text-2xl flex items-center">
              ${mockData.totalIncome.toLocaleString()}
              <ArrowUpIcon className="ml-2 h-4 w-4 text-green-500" />
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <div className="text-xs text-muted-foreground">
              Monthly income across all sources
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2 px-4 pt-4">
            <CardDescription>Total Expenses</CardDescription>
            <CardTitle className="text-xl md:text-2xl flex items-center">
              ${mockData.totalExpenses.toLocaleString()}
              <ArrowDownIcon className="ml-2 h-4 w-4 text-red-500" />
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <div className="text-xs text-muted-foreground">
              Monthly expenses across all categories
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2 px-4 pt-4">
            <CardDescription>Current Balance</CardDescription>
            <CardTitle className="text-xl md:text-2xl flex items-center">
              ${mockData.balance.toLocaleString()}
              <TrendingUpIcon className="ml-2 h-4 w-4 text-blue-500" />
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <div className="text-xs text-muted-foreground">
              Income minus expenses this month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2 px-4 pt-4">
            <CardDescription>Budget Status</CardDescription>
            <CardTitle className="text-xl md:text-2xl flex items-center">
              {mockData.totalExpenses < mockData.budget ? (
                <span className="text-green-500">Under Budget</span>
              ) : (
                <span className="text-red-500 flex items-center">
                  Over Budget
                  <AlertCircleIcon className="ml-2 h-4 w-4" />
                </span>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <div className="text-xs text-muted-foreground">
              {`${Math.abs(mockData.budget - mockData.totalExpenses).toLocaleString()} ${
                mockData.totalExpenses < mockData.budget ? "under" : "over"
              } your monthly budget`}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2">
        <Card>
          <CardHeader className="px-4 pt-4">
            <CardTitle className="text-lg md:text-xl">Recent Expenses</CardTitle>
            <CardDescription>Your latest transactions</CardDescription>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <div className="space-y-3">
              {mockData.recentExpenses.map(expense => (
                <div key={expense.id} className="flex justify-between items-center border-b pb-2 last:border-0">
                  <div>
                    <div className="font-medium">{expense.category}</div>
                    <div className="text-sm text-muted-foreground">{expense.date}</div>
                  </div>
                  <div className="font-semibold">${expense.amount.toFixed(2)}</div>
                </div>
              ))}
              <Button variant="outline" size="sm" className="w-full mt-2" onClick={() => navigate('/expenses')}>
                View All Expenses
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="px-4 pt-4">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-lg md:text-xl">Group Expenses</CardTitle>
                <CardDescription>Recent group expenses with advances</CardDescription>
              </div>
              <UsersIcon className="h-5 w-5 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <div className="space-y-3">
              {mockData.groupExpenses.map(group => (
                <div key={group.id} className="flex justify-between items-center border-b pb-2 last:border-0">
                  <div>
                    <div className="font-medium">{group.title}</div>
                    <div className="text-sm text-muted-foreground flex items-center gap-1">
                      <UsersIcon className="h-3 w-3" /> {group.members} members
                    </div>
                  </div>
                  <div>
                    <div className="font-semibold text-right">${group.totalAmount.toFixed(2)}</div>
                    <div className="text-sm text-muted-foreground text-right">
                      Advanced by: {group.advancedBy}
                    </div>
                  </div>
                </div>
              ))}
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full mt-2" 
                onClick={() => navigate('/group-expenses')}
              >
                Manage Group Expenses
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
