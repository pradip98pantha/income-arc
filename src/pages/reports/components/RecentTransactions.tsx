
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3Icon, ArrowUpIcon } from "lucide-react";

const RecentTransactions: React.FC = () => {
  return (
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
  );
};

export default RecentTransactions;
