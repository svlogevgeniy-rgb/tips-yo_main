"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2, User, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const staffSchema = z.object({
  displayName: z.string().min(1, "Display name is required"),
  fullName: z.string().optional(),
  role: z.enum(["WAITER", "BARTENDER", "BARISTA", "HOSTESS", "CHEF", "ADMINISTRATOR", "OTHER"]),
  avatarUrl: z.string().optional(),
  participatesInPool: z.boolean(),
});

type StaffForm = z.infer<typeof staffSchema>;

type Staff = {
  id: string;
  displayName: string;
  fullName?: string;
  role: string;
  status: string;
  participatesInPool: boolean;
  avatarUrl?: string | null;
  balance?: number;
  qrCode?: { id: string; shortCode: string; status: string };
  user?: { email?: string; phone?: string };
  _count?: { tips: number };
};

// Avatar component with fallback
function StaffAvatar({ staff }: { staff: Staff }) {
  if (staff.avatarUrl) {
    return (
      <img 
        src={staff.avatarUrl} 
        alt={staff.displayName}
        className="w-12 h-12 rounded-full object-cover"
      />
    );
  }
  
  // Fallback avatar with initials
  const initials = staff.displayName
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
    
  return (
    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
      <span className="text-primary font-semibold">{initials || <User className="h-5 w-5" />}</span>
    </div>
  );
}

const roleLabels: Record<string, string> = {
  WAITER: "Официант",
  BARTENDER: "Бармен",
  BARISTA: "Бариста",
  HOSTESS: "Хостес",
  CHEF: "Повар",
  ADMINISTRATOR: "Администратор",
  OTHER: "Другое",
};


export default function StaffManagementPage() {
  const [staff, setStaff] = useState<Staff[]>([]);
  const [venueId, setVenueId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<StaffForm>({
    resolver: zodResolver(staffSchema),
    defaultValues: {
      displayName: "",
      fullName: "",
      role: "WAITER",
      avatarUrl: "",
      participatesInPool: true,
    },
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const dashRes = await fetch("/api/venues/dashboard?period=week");
        if (!dashRes.ok) throw new Error("Failed to load venue");
        const dashData = await dashRes.json();

        if (dashData.venue?.id) {
          setVenueId(dashData.venue.id);
          const staffRes = await fetch(
            `/api/staff?venueId=${dashData.venue.id}`
          );
          if (staffRes.ok) {
            const staffData = await staffRes.json();
            setStaff(staffData.staff || []);
          }
        }
      } catch (err) {
        console.error("Failed to load data:", err);
        setError("Failed to load venue data");
      } finally {
        setIsPageLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleAddStaff = async (data: StaffForm) => {
    if (!venueId) {
      setError("Venue not loaded");
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/staff", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, venueId }),
      });
      const result = await response.json();
      if (!response.ok) {
        setError(result.message || "Failed to add staff");
        return;
      }
      setStaff([result.staff, ...staff]);
      setIsDialogOpen(false);
      form.reset();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleStatus = async (staffMember: Staff) => {
    const newStatus = staffMember.status === "ACTIVE" ? "INACTIVE" : "ACTIVE";
    try {
      const response = await fetch(`/api/staff/${staffMember.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (response.ok) {
        setStaff(
          staff.map((s) =>
            s.id === staffMember.id ? { ...s, status: newStatus } : s
          )
        );
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  const handleDeleteStaff = async (staffMember: Staff) => {
    if (!confirm(`Удалить сотрудника ${staffMember.displayName}?`)) return;
    
    try {
      const response = await fetch(`/api/staff/${staffMember.id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setStaff(staff.filter((s) => s.id !== staffMember.id));
      }
    } catch (err) {
      console.error("Failed to delete staff:", err);
    }
  };

  if (isPageLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }


  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-heading font-bold">Staff Management</h1>
          <p className="text-muted-foreground">
            Add and manage your team members
          </p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-cyan-500 to-blue-600">
              + Add Staff
            </Button>
          </DialogTrigger>
          <DialogContent className="glass-heavy">
            <DialogHeader>
              <DialogTitle className="font-heading">
                Add Staff Member
              </DialogTitle>
              <DialogDescription>
                Add a new team member. A personal QR code will be generated
                automatically.
              </DialogDescription>
            </DialogHeader>

            <form
              onSubmit={form.handleSubmit(handleAddStaff)}
              className="space-y-4"
            >
              {error && (
                <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="displayName">Display Name *</Label>
                <Input
                  id="displayName"
                  placeholder="Name shown to guests"
                  {...form.register("displayName")}
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  placeholder="For internal records"
                  {...form.register("fullName")}
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">Роль *</Label>
                <Select
                  onValueChange={(value) =>
                    form.setValue("role", value as StaffForm["role"])
                  }
                  defaultValue="WAITER"
                >
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Выберите роль" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="WAITER">Официант</SelectItem>
                    <SelectItem value="BARISTA">Бариста</SelectItem>
                    <SelectItem value="BARTENDER">Бармен</SelectItem>
                    <SelectItem value="HOSTESS">Хостес</SelectItem>
                    <SelectItem value="CHEF">Повар</SelectItem>
                    <SelectItem value="ADMINISTRATOR">Администратор</SelectItem>
                    <SelectItem value="OTHER">Другое</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="avatarUrl">Фото (опционально)</Label>
                <Input
                  id="avatarUrl"
                  placeholder="URL фото или оставьте пустым"
                  {...form.register("avatarUrl")}
                  className="h-12"
                />
                <p className="text-xs text-muted-foreground">
                  Если не указано, будет показана заглушка-аватар
                </p>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="participatesInPool"
                  {...form.register("participatesInPool")}
                  className="h-4 w-4"
                />
                <Label htmlFor="participatesInPool" className="text-sm">
                  Participates in tip pool
                </Label>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-14 text-lg font-heading font-bold bg-gradient-to-r from-cyan-500 to-blue-600"
              >
                {isLoading ? "Adding..." : "Add Staff Member"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>


      {staff.length === 0 ? (
        <Card className="glass">
          <CardContent className="pt-6 text-center">
            <div className="text-6xl mb-4">👥</div>
            <h3 className="text-xl font-heading font-bold mb-2">
              No staff members yet
            </h3>
            <p className="text-muted-foreground mb-4">
              Add your first team member to start generating QR codes and
              receiving tips.
            </p>
            <Button
              onClick={() => setIsDialogOpen(true)}
              className="bg-gradient-to-r from-cyan-500 to-blue-600"
            >
              + Add First Staff Member
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {staff.map((member) => (
            <Card key={member.id} className="glass">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <StaffAvatar staff={member} />
                    <div>
                      <CardTitle className="font-heading">
                        {member.displayName}
                      </CardTitle>
                      <CardDescription>
                        {roleLabels[member.role] || member.role} •{" "}
                        {member.qrCode?.shortCode || "No QR"}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        member.status === "ACTIVE"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-gray-500/20 text-gray-400"
                      }`}
                    >
                      {member.status === "ACTIVE" ? "Активен" : "Неактивен"}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleToggleStatus(member)}
                    >
                      {member.status === "ACTIVE" ? "Деактивировать" : "Активировать"}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteStaff(member)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4 text-sm text-muted-foreground">
                  {member.participatesInPool && <span>🎱 В пуле</span>}
                  {member._count?.tips !== undefined && (
                    <span>💰 {member._count.tips} чаевых</span>
                  )}
                  {member.balance !== undefined && member.balance > 0 && (
                    <span className="text-primary">💵 Баланс: Rp {member.balance.toLocaleString()}</span>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
