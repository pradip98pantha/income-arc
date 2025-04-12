
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3Icon, PieChartIcon, LineChartIcon, CalendarIcon } from "lucide-react";
import OverviewTab from "./OverviewTab";
import CategoriesTab from "./CategoriesTab";
import TrendsTab from "./TrendsTab";
import CalendarTab from "./CalendarTab";

const ReportTabs: React.FC = () => {
  return (
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
        <OverviewTab />
      </TabsContent>
      
      <TabsContent value="categories">
        <CategoriesTab />
      </TabsContent>
      
      <TabsContent value="trends">
        <TrendsTab />
      </TabsContent>
      
      <TabsContent value="calendar">
        <CalendarTab />
      </TabsContent>
    </Tabs>
  );
};

export default ReportTabs;
