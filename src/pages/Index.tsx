
import React from "react";
import { Link } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartPieIcon, BarChart3Icon, PiggyBankIcon, CircleDollarSignIcon, WalletIcon } from "lucide-react";

const Index = () => {
  const features = [
    {
      title: "Track Expenses",
      description: "Easily record and categorize your daily expenses.",
      icon: <WalletIcon className="h-12 w-12 text-primary" />,
    },
    {
      title: "Manage Income",
      description: "Record your income sources and track your earnings.",
      icon: <PiggyBankIcon className="h-12 w-12 text-primary" />,
    },
    {
      title: "Visualize Data",
      description: "View charts and reports to understand your spending habits.",
      icon: <ChartPieIcon className="h-12 w-12 text-primary" />,
    },
    {
      title: "Set Budgets",
      description: "Create budgets and get alerts when you exceed them.",
      icon: <CircleDollarSignIcon className="h-12 w-12 text-primary" />,
    },
  ];

  return (
    <MainLayout>
      <section className="py-12 md:py-20">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Take Control of Your Finances
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Track expenses, manage income, and achieve your financial goals with
            our easy-to-use expense tracking app.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/register">
              <Button size="lg" className="gap-2">
                Get Started
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline" className="gap-2">
                Log in
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-12 bg-muted/30 rounded-lg">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Features</h2>
          <p className="text-muted-foreground mt-2">
            Everything you need to manage your personal finances
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="border border-muted">
              <CardHeader className="text-center pb-2">
                <div className="mx-auto mb-4">{feature.icon}</div>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </MainLayout>
  );
};

export default Index;
