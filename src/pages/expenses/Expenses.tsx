
import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ExpensesSummary from "./components/ExpensesSummary";
import ExpenseTable, { mockExpensesData } from "./components/ExpenseTable";
import ExpenseChart from "./components/ExpenseChart";

const Expenses: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
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

      <ExpensesSummary totalExpenses={totalExpenses} />

      <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-3 mb-6">
        <Card className="md:col-span-2">
          <CardHeader className="px-6 py-4">
            <CardTitle className="text-lg">Expense Entries</CardTitle>
            <CardDescription>Your recent expenses</CardDescription>
          </CardHeader>
          <CardContent>
            <ExpenseTable 
              searchTerm={searchTerm} 
              setSearchTerm={setSearchTerm} 
            />
          </CardContent>
        </Card>

        <ExpenseChart />
      </div>
    </DashboardLayout>
  );
};

export default Expenses;
