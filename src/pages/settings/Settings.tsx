
import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";
import { BellIcon, MoonIcon, SunIcon, GlobeIcon, ShieldIcon, KeyIcon, UsersIcon } from "lucide-react";

const Settings: React.FC = () => {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState("english");
  const [timezone, setTimezone] = useState("UTC");
  const [isLoading, setIsLoading] = useState(false);
  const [groupNotifications, setGroupNotifications] = useState(true);
  const [expenseReminders, setExpenseReminders] = useState(true);
  const [defaultCurrency, setDefaultCurrency] = useState("usd");
  
  const handleSaveSettings = () => {
    setIsLoading(true);
    
    // Here we would typically handle the API call to save settings
    // For now, we'll just simulate it with a toast notification
    setTimeout(() => {
      toast({
        title: "Settings saved",
        description: "Your settings have been updated successfully",
      });
      setIsLoading(false);
    }, 1000);
  };
  
  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>
      
      <div className="grid gap-6">
        <Card>
          <CardHeader className="px-4 pt-4">
            <CardTitle className="flex items-center gap-2">
              <BellIcon className="h-5 w-5" />
              Notifications
            </CardTitle>
            <CardDescription>
              Manage how you receive notifications
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 px-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="email-notifications" className="text-base">Email Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive notifications via email
                </p>
              </div>
              <Switch
                id="email-notifications"
                checked={emailNotifications}
                onCheckedChange={setEmailNotifications}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="push-notifications" className="text-base">Push Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive push notifications on your device
                </p>
              </div>
              <Switch
                id="push-notifications"
                checked={pushNotifications}
                onCheckedChange={setPushNotifications}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="group-notifications" className="text-base">Group Expense Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Get notified about group expense updates
                </p>
              </div>
              <Switch
                id="group-notifications"
                checked={groupNotifications}
                onCheckedChange={setGroupNotifications}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="expense-reminders" className="text-base">Expense Reminders</Label>
                <p className="text-sm text-muted-foreground">
                  Get reminders about upcoming expenses
                </p>
              </div>
              <Switch
                id="expense-reminders"
                checked={expenseReminders}
                onCheckedChange={setExpenseReminders}
              />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="px-4 pt-4">
            <CardTitle className="flex items-center gap-2">
              <GlobeIcon className="h-5 w-5" />
              Preferences
            </CardTitle>
            <CardDescription>
              Customize your application experience
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 px-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="dark-mode" className="text-base">Dark Mode</Label>
                <p className="text-sm text-muted-foreground">
                  Toggle between light and dark theme
                </p>
              </div>
              <div className="flex items-center gap-2">
                <SunIcon className="h-4 w-4 text-muted-foreground" />
                <Switch
                  id="dark-mode"
                  checked={darkMode}
                  onCheckedChange={setDarkMode}
                />
                <MoonIcon className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="language" className="text-base">Language</Label>
              <select
                id="language"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="english">English</option>
                <option value="spanish">Spanish</option>
                <option value="french">French</option>
                <option value="german">German</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="timezone" className="text-base">Timezone</Label>
              <select
                id="timezone"
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
                className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="UTC">UTC</option>
                <option value="EST">Eastern Time (EST)</option>
                <option value="CST">Central Time (CST)</option>
                <option value="PST">Pacific Time (PST)</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="currency" className="text-base">Default Currency</Label>
              <select
                id="currency"
                value={defaultCurrency}
                onChange={(e) => setDefaultCurrency(e.target.value)}
                className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="usd">US Dollar (USD)</option>
                <option value="eur">Euro (EUR)</option>
                <option value="gbp">British Pound (GBP)</option>
                <option value="jpy">Japanese Yen (JPY)</option>
                <option value="cad">Canadian Dollar (CAD)</option>
              </select>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="px-4 pt-4">
            <CardTitle className="flex items-center gap-2">
              <UsersIcon className="h-5 w-5" />
              Group Expense Settings
            </CardTitle>
            <CardDescription>
              Configure how group expenses are managed
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 px-4">
            <div className="space-y-2">
              <Label htmlFor="default-split" className="text-base">Default Split Type</Label>
              <select
                id="default-split"
                className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                defaultValue="equal"
              >
                <option value="equal">Equal Split</option>
                <option value="percentage">Percentage Split</option>
                <option value="custom">Custom Amount</option>
              </select>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="auto-reminders" className="text-base">Automatic Reminders</Label>
                <p className="text-sm text-muted-foreground">
                  Send reminders to group members for payment
                </p>
              </div>
              <Switch
                id="auto-reminders"
                defaultChecked={true}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="add-all-contacts" className="text-base">Add All Contacts</Label>
                <p className="text-sm text-muted-foreground">
                  Allow adding all contacts to a group
                </p>
              </div>
              <Switch
                id="add-all-contacts"
                defaultChecked={false}
              />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="px-4 pt-4">
            <CardTitle className="flex items-center gap-2">
              <ShieldIcon className="h-5 w-5" />
              Security
            </CardTitle>
            <CardDescription>
              Manage your account security settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 px-4">
            <div className="space-y-2">
              <Label className="text-base">Two-Factor Authentication</Label>
              <p className="text-sm text-muted-foreground mb-2">
                Add an extra layer of security to your account
              </p>
              <Button variant="outline" className="w-full sm:w-auto">
                <KeyIcon className="mr-2 h-4 w-4" />
                Set up 2FA
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <div className="flex justify-end mt-2">
          <Button onClick={handleSaveSettings} disabled={isLoading}>
            {isLoading ? "Saving..." : "Save All Settings"}
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
