
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDownIcon, TrendingUpIcon, UsersIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ExpensesSummaryProps {
  totalExpenses: number;
}

const ExpensesSummary: React.FC<ExpensesSummaryProps> = ({ totalExpenses }) => {
  const navigate = useNavigate();
  
  return (
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
  );
};

export default ExpensesSummary;
