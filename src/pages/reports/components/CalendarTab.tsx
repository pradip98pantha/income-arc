
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

const CalendarTab: React.FC = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  // Mock data for expense events
  const expenseEvents = [
    { date: new Date(2025, 4, 4), amount: 120, category: "Groceries" },
    { date: new Date(2025, 4, 8), amount: 45.50, category: "Dining" },
    { date: new Date(2025, 4, 12), amount: 99, category: "Shopping" },
    { date: new Date(2025, 4, 15), amount: 60, category: "Transportation" },
    { date: new Date(2025, 4, 20), amount: 200, category: "Utilities" },
  ];
  
  // Helper function to check if a date has expenses
  const hasExpenseOnDate = (day: Date) => {
    return expenseEvents.some(event => 
      event.date.getDate() === day.getDate() &&
      event.date.getMonth() === day.getMonth() &&
      event.date.getFullYear() === day.getFullYear()
    );
  };
  
  // Handler for date changes
  const handleDateChange = (day: Date | undefined) => {
    setDate(day);
    setIsLoading(true);
    
    // Simulate loading expense details for the selected date
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  };
  
  // Get expenses for the selected date
  const getExpensesForDate = (selectedDate: Date | undefined) => {
    if (!selectedDate) return [];
    
    return expenseEvents.filter(event => 
      event.date.getDate() === selectedDate.getDate() &&
      event.date.getMonth() === selectedDate.getMonth() &&
      event.date.getFullYear() === selectedDate.getFullYear()
    );
  };
  
  const selectedDayExpenses = getExpensesForDate(date);

  return (
    <Card>
      <CardHeader className="px-4 pt-4">
        <CardTitle className="text-lg md:text-xl">Expense Calendar</CardTitle>
        <CardDescription>
          View your expenses by date
        </CardDescription>
      </CardHeader>
      <CardContent className="px-4 pb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Calendar
              mode="single"
              selected={date}
              onSelect={handleDateChange}
              className={cn("border rounded-md pointer-events-auto")}
              modifiers={{
                hasExpense: (date) => hasExpenseOnDate(date),
              }}
              modifiersStyles={{
                hasExpense: { 
                  fontWeight: "bold",
                  backgroundColor: "rgba(16, 185, 129, 0.1)",
                  color: "rgb(16, 185, 129)", 
                }
              }}
            />
          </div>
          
          <div className="bg-secondary/20 rounded-md p-4">
            {date ? (
              <div>
                <h3 className="font-medium text-lg mb-3">
                  {format(date, "MMMM d, yyyy")}
                </h3>
                
                {isLoading ? (
                  <div className="space-y-3">
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                  </div>
                ) : selectedDayExpenses.length > 0 ? (
                  <div className="space-y-3">
                    {selectedDayExpenses.map((expense, idx) => (
                      <div key={idx} className="flex justify-between items-center p-3 bg-background rounded-md border">
                        <span>{expense.category}</span>
                        <span className="font-medium text-destructive">-${expense.amount.toFixed(2)}</span>
                      </div>
                    ))}
                    <div className="mt-4 pt-3 border-t flex justify-between font-medium">
                      <span>Total</span>
                      <span className="text-destructive">
                        -${selectedDayExpenses.reduce((sum, exp) => sum + exp.amount, 0).toFixed(2)}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <p>No expenses recorded for this date</p>
                    <p className="text-sm mt-2">Expenses you add will appear here</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <p>Select a date to view expenses</p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CalendarTab;
