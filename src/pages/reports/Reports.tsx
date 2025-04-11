
import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DatePickerWithRange } from "@/components/DateRangePicker";
import { 
  BarChart3Icon, 
  PieChartIcon, 
  LineChartIcon, 
  CalendarIcon, 
  ArrowUpIcon, 
  ArrowDownIcon,
  DownloadIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Mock data for visualizations
const mockMonthlyExpenses = [
  { month: "Jan", amount: 1200 },
  { month: "Feb", amount: 1800 },
  { month: "Mar", amount: 1400 },
  { month: "Apr", amount: 2200 },
  { month: "May", amount: 1900 },
  { month: "Jun", amount: 1600 },
];

const mockCategoryData = [
  { category: "Food & Dining", amount: 850, percentage: 28 },
  { category: "Bills & Utilities", amount: 750, percentage: 25 },
  { category: "Transportation", amount: 450, percentage: 15 },
  { category: "Shopping", amount: 400, percentage: 13 },
  { category: "Entertainment", amount: 300, percentage: 10 },
  { category: "Other", amount: 250, percentage: 9 },
];

const Reports = () => {
  const [period, setPeriod] = useState("month");
  
  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Reports</h1>
        <p className="text-muted-foreground">
          Analyze your spending patterns and track your financial goals
        </p>
      </div>

      {/* Report Filters */}
      <div className="grid gap-4 md:flex md:flex-wrap md:items-center md:justify-between mb-6">
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
          <Select defaultValue={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>
          
          {period === "custom" && (
            <DatePickerWithRange className="w-full sm:w-auto" />
          )}
        </div>
        
        <Button size="sm" className="flex items-center gap-2">
          <DownloadIcon className="h-4 w-4" />
          Export Report
        </Button>
      </div>

      {/* Summary Cards */}
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

      {/* Report Charts */}
      <div className="mb-6">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3Icon className="h-4 w-4" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="categories" className="flex items-center gap-2">
              <PieChartIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Categories</span>
            </TabsTrigger>
            <TabsTrigger value="trends" className="flex items-center gap-2">
              <LineChartIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Trends</span>
            </TabsTrigger>
            <TabsTrigger value="calendar" className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Calendar</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
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
          </TabsContent>

          <TabsContent value="categories">
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
          </TabsContent>

          <TabsContent value="trends">
            <Card>
              <CardHeader className="px-4 pt-4">
                <CardTitle className="text-lg md:text-xl">Spending Trends</CardTitle>
                <CardDescription>
                  Track how your spending changes over time
                </CardDescription>
              </CardHeader>
              <CardContent className="px-4 pb-4">
                <div className="h-[300px] md:h-[400px] flex items-center justify-center">
                  <p className="text-muted-foreground text-center">
                    Connect to Supabase to view your spending trends chart
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="calendar">
            <Card>
              <CardHeader className="px-4 pt-4">
                <CardTitle className="text-lg md:text-xl">Expense Calendar</CardTitle>
                <CardDescription>
                  View your expenses by date
                </CardDescription>
              </CardHeader>
              <CardContent className="px-4 pb-4">
                <div className="h-[300px] md:h-[400px] flex items-center justify-center">
                  <p className="text-muted-foreground text-center">
                    Connect to Supabase to view your expense calendar
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Recent Transactions */}
      <Card>
        <CardHeader className="px-4 pt-4">
          <CardTitle className="text-lg md:text-xl">Recent Transactions</CardTitle>
          <CardDescription>Your latest expenses and income</CardDescription>
        </CardHeader>
        <CardContent className="px-4 pb-4">
          <div className="space-y-4">
            {/* Transaction item */}
            <div className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <BarChart3Icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-medium">Grocery Shopping</div>
                  <div className="text-xs text-muted-foreground">Apr 10, 2025</div>
                </div>
              </div>
              <div className="text-red-500 font-medium">-$45.99</div>
            </div>
            
            <div className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <BarChart3Icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-medium">Electric Bill</div>
                  <div className="text-xs text-muted-foreground">Apr 8, 2025</div>
                </div>
              </div>
              <div className="text-red-500 font-medium">-$89.50</div>
            </div>
            
            <div className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center text-green-500">
                  <ArrowUpIcon className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-medium">Salary Deposit</div>
                  <div className="text-xs text-muted-foreground">Apr 1, 2025</div>
                </div>
              </div>
              <div className="text-green-500 font-medium">+$2,750.00</div>
            </div>
            
            <Button variant="outline" size="sm" className="w-full">
              View All Transactions
            </Button>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default Reports;
