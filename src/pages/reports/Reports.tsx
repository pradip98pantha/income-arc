
import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import ReportFilters from "./components/ReportFilters";
import ReportSummaryCards from "./components/ReportSummaryCards";
import ReportTabs from "./components/ReportTabs";
import RecentTransactions from "./components/RecentTransactions";

const Reports: React.FC = () => {
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
      <ReportFilters period={period} setPeriod={setPeriod} />

      {/* Summary Cards */}
      <ReportSummaryCards />

      {/* Report Charts */}
      <div className="mb-6">
        <ReportTabs />
      </div>

      {/* Recent Transactions */}
      <RecentTransactions />
    </DashboardLayout>
  );
};

export default Reports;
