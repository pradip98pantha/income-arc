
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, Plus, X } from "lucide-react";

interface GroupAdvanceFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  editData?: any;
}

const GroupAdvanceForm: React.FC<GroupAdvanceFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
  editData,
}) => {
  const [groupName, setGroupName] = useState(editData?.title || "");
  const [totalAmount, setTotalAmount] = useState(editData?.totalAmount || "");
  const [advanceAmount, setAdvanceAmount] = useState(editData?.advanceAmount || "");
  const [advancedBy, setAdvancedBy] = useState(editData?.advancedBy || "");
  const [date, setDate] = useState<Date | undefined>(editData?.date ? new Date(editData.date) : new Date());
  const [members, setMembers] = useState<string[]>(editData?.members || []);
  const [newMember, setNewMember] = useState("");

  const addMember = () => {
    if (newMember.trim() && !members.includes(newMember.trim())) {
      setMembers([...members, newMember.trim()]);
      setNewMember("");
    }
  };

  const removeMember = (memberToRemove: string) => {
    setMembers(members.filter(member => member !== memberToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const formData = {
      title: groupName,
      totalAmount: parseFloat(totalAmount as string),
      advanceAmount: parseFloat(advanceAmount as string),
      advancedBy,
      date: date ? format(date, "yyyy-MM-dd") : format(new Date(), "yyyy-MM-dd"),
      members,
      status: "active",
    };
    
    onSubmit(formData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{editData ? "Edit Group Expense" : "Create Group Expense"}</DialogTitle>
          <DialogDescription>
            {editData 
              ? "Update the details of this group expense." 
              : "Enter the details for a new group expense and who made the initial advance."}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="group-name">Group Expense Name</Label>
              <Input
                id="group-name"
                placeholder="E.g., Vacation Trip, Dinner Party"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="total-amount">Total Amount</Label>
                <Input
                  id="total-amount"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  value={totalAmount}
                  onChange={(e) => setTotalAmount(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="advanced-by">Advanced By</Label>
                <Input
                  id="advanced-by"
                  placeholder="Person's name"
                  value={advancedBy}
                  onChange={(e) => setAdvancedBy(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="advance-amount">Advance Amount</Label>
                <Input
                  id="advance-amount"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  value={advanceAmount}
                  onChange={(e) => setAdvanceAmount(e.target.value)}
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Group Members</Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {members.map((member, index) => (
                  <div 
                    key={index}
                    className="bg-secondary text-secondary-foreground px-2 py-1 rounded-md flex items-center gap-1 text-sm"
                  >
                    {member}
                    <button 
                      type="button" 
                      onClick={() => removeMember(member)}
                      className="text-muted-foreground hover:text-primary focus:outline-none"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="Add member"
                  value={newMember}
                  onChange={(e) => setNewMember(e.target.value)}
                />
                <Button type="button" onClick={addMember} variant="outline" size="icon">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {editData ? "Update Group Expense" : "Create Group Expense"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default GroupAdvanceForm;
