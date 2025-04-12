
import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DatePickerWithRange } from "@/components/DateRangePicker";
import { Button } from "@/components/ui/button";
import { DownloadIcon } from "lucide-react";

interface ReportFiltersProps {
  period: string;
  setPeriod: (value: string) => void;
}

const ReportFilters: React.FC<ReportFiltersProps> = ({ period, setPeriod }) => {
  return (
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
  );
};

export default ReportFilters;
