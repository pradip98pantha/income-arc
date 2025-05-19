
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

// Mock data for visualizations
const mockCategoryData = [
  { category: "Food & Dining", amount: 850, percentage: 28 },
  { category: "Bills & Utilities", amount: 750, percentage: 25 },
  { category: "Transportation", amount: 450, percentage: 15 },
  { category: "Shopping", amount: 400, percentage: 13 },
  { category: "Entertainment", amount: 300, percentage: 10 },
  { category: "Other", amount: 250, percentage: 9 },
];

// Colors for pie chart
const COLORS = ["#4f46e5", "#0ea5e9", "#059669", "#eab308", "#ef4444", "#8b5cf6"];

const CategoriesTab: React.FC = () => {
  // Format data for recharts
  const chartData = mockCategoryData.map(item => ({
    name: item.category,
    value: item.amount
  }));
  
  return (
    <Card>
      <CardHeader className="px-4 pt-4">
        <CardTitle className="text-lg md:text-xl">Expense Categories</CardTitle>
        <CardDescription>Breakdown of your expenses by category</CardDescription>
      </CardHeader>
      <CardContent className="px-4 pb-4">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Left side: Pie chart */}
          <div className="flex items-center justify-center">
            <div className="h-[250px] w-full">
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
                  <Tooltip 
                    formatter={(value) => [`$${value}`, 'Amount']}
                    labelFormatter={(name) => `${name}`}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* Right side: Category breakdown */}
          <div className="space-y-3">
            {mockCategoryData.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
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
