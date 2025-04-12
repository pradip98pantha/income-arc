
import React from "react";
import { Card, CardHeader, CardDescription, CardTitle, CardContent } from "@/components/ui/card";
import { ArrowUpIcon, ArrowDownIcon } from "lucide-react";

const ReportSummaryCards: React.FC = () => {
  return (
    <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-6">
      <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-800">
        <CardHeader className="pb-2 px-4 pt-4">
          <CardDescription>Total Expenses</CardDescription>
          <CardTitle className="text-xl md:text-2xl flex items-center">
            $3,150.00
            <ArrowDownIcon className="ml-2 h-4 w-4 text-red-500" />
          </CardTitle>
        </CardHeader>
        <CardContent className="px-4 pb-4">
          <div className="text-xs text-muted-foreground">
            <span className="text-red-500 font-medium">+12%</span> from last month
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-800">
        <CardHeader className="pb-2 px-4 pt-4">
          <CardDescription>Total Income</CardDescription>
          <CardTitle className="text-xl md:text-2xl flex items-center">
            $4,500.00
            <ArrowUpIcon className="ml-2 h-4 w-4 text-green-500" />
          </CardTitle>
        </CardHeader>
        <CardContent className="px-4 pb-4">
          <div className="text-xs text-muted-foreground">
            <span className="text-green-500 font-medium">+5%</span> from last month
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-800">
        <CardHeader className="pb-2 px-4 pt-4">
          <CardDescription>Savings</CardDescription>
          <CardTitle className="text-xl md:text-2xl flex items-center">
            $1,350.00
          </CardTitle>
        </CardHeader>
        <CardContent className="px-4 pb-4">
          <div className="text-xs text-muted-foreground">
            30% of your monthly income
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 border-yellow-200 dark:border-yellow-800">
        <CardHeader className="pb-2 px-4 pt-4">
          <CardDescription>Top Expense</CardDescription>
          <CardTitle className="text-xl md:text-2xl">
            Food & Dining
          </CardTitle>
        </CardHeader>
        <CardContent className="px-4 pb-4">
          <div className="text-xs text-muted-foreground">
            28% of your total expenses
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportSummaryCards;
