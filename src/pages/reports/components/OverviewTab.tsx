
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

// Mock data for visualizations
const mockMonthlyExpenses = [
  { month: "Jan", amount: 1200 },
  { month: "Feb", amount: 1800 },
  { month: "Mar", amount: 1400 },
  { month: "Apr", amount: 2200 },
  { month: "May", amount: 1900 },
  { month: "Jun", amount: 1600 },
];

const OverviewTab: React.FC = () => {
  return (
    <Card>
      <CardHeader className="px-4 pt-4">
        <CardTitle className="text-lg md:text-xl">Monthly Expense Overview</CardTitle>
        <CardDescription>A summary of your expenses over the past 6 months</CardDescription>
      </CardHeader>
      <CardContent className="px-4 pb-4">
        <div className="h-[300px] md:h-[400px] flex flex-col items-center justify-center">
          <div className="w-full px-4">
            {/* Simple bar chart visualization using CSS */}
            <div className="space-y-3">
              {mockMonthlyExpenses.map((month) => (
                <div key={month.month} className="w-full">
                  <div className="flex justify-between text-sm mb-1">
                    <span>{month.month}</span>
                    <span>${month.amount}</span>
                  </div>
                  <div className="h-3 w-full bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary rounded-full" 
                      style={{ width: `${(month.amount / 2500) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OverviewTab;
