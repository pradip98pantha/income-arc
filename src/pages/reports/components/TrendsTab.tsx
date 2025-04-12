
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

const TrendsTab: React.FC = () => {
  return (
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
  );
};

export default TrendsTab;
