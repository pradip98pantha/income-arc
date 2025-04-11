
import React from "react";
import { Link } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { ArrowLeftIcon } from "lucide-react";

const ForgotPassword = () => {
  const [email, setEmail] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Here we would typically handle the API call to send a password reset email
    // For now, we'll just simulate it with a toast notification
    setTimeout(() => {
      toast({
        title: "Password reset",
        description: "Please connect Supabase to enable password reset functionality",
      });
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1500);
  };

  return (
    <MainLayout showAuth={false}>
      <div className="max-w-md mx-auto py-12">
        <Card className="border shadow-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Forgot password</CardTitle>
            <CardDescription>
              {!isSubmitted 
                ? "Enter your email address and we'll send you a link to reset your password"
                : "Check your email for a link to reset your password"}
            </CardDescription>
          </CardHeader>
          
          {!isSubmitted ? (
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </CardContent>
              
              <CardFooter className="flex flex-col">
                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? "Sending email..." : "Send reset link"}
                </Button>
              </CardFooter>
            </form>
          ) : (
            <CardContent className="text-center">
              <p className="mb-4">
                If an account exists with the email <strong>{email}</strong>, you will
                receive a password reset link shortly.
              </p>
              <p className="text-sm text-muted-foreground">
                Didn't receive an email? Check your spam folder or try again with
                a different email address.
              </p>
            </CardContent>
          )}
          
          <CardFooter className="pt-2 pb-4">
            <Link 
              to="/login" 
              className="w-full flex items-center justify-center gap-2 text-sm text-primary hover:underline"
            >
              <ArrowLeftIcon className="h-4 w-4" />
              Back to login
            </Link>
          </CardFooter>
        </Card>
      </div>
    </MainLayout>
  );
};

export default ForgotPassword;
