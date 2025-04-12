
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Mock data for visualizations
const mockCategoryData = [
  { category: "Food & Dining", amount: 850, percentage: 28 },
  { category: "Bills & Utilities", amount: 750, percentage: 25 },
  { category: "Transportation", amount: 450, percentage: 15 },
  { category: "Shopping", amount: 400, percentage: 13 },
  { category: "Entertainment", amount: 300, percentage: 10 },
  { category: "Other", amount: 250, percentage: 9 },
];

const CategoriesTab: React.FC = () => {
  return (
    <Card>
      <CardHeader className="px-4 pt-4">
        <CardTitle className="text-lg md:text-xl">Expense Categories</CardTitle>
        <CardDescription>Breakdown of your expenses by category</CardDescription>
      </CardHeader>
      <CardContent className="px-4 pb-4">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Left side: Pie chart placeholder */}
          <div className="flex items-center justify-center">
            <div className="w-48 h-48 md:w-64 md:h-64 rounded-full border-8 border-primary relative flex items-center justify-center bg-muted/20">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold">$3,150</div>
                <div className="text-sm text-muted-foreground">Total Expenses</div>
              </div>
              {/* This would be a real pie chart with recharts in a real implementation */}
            </div>
          </div>
          
          {/* Right side: Category breakdown */}
          <div className="space-y-3">
            {mockCategoryData.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div 
                    className={`w-3 h-3 rounded-full`}
                    style={{ 
                      backgroundColor: [
                        "#4f46e5", "#0ea5e9", "#059669", 
                        "#eab308", "#ef4444", "#8b5cf6"
                      ][index % 6]
                    }}
                  />
                  <span>{item.category}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="secondary">{item.percentage}%</Badge>
                  <span className="font-medium">${item.amount}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CategoriesTab;
