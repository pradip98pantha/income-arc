
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

const CalendarTab: React.FC = () => {
  return (
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
  );
};

export default CalendarTab;
