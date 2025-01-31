// app/teacher-user-id-creation/page.tsx
"use client";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Edit, PlusCircle, Trash2, Save} from "lucide-react";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

type User = {
  id: string;
  name: string;
  role: "Teacher" | "Student";
  grade: "Primary" | "Middle" | "High";
  userId: string;
  password: string;
  language: string;
};

const emptyUser: User = {
  id: "",
  name: "",
  role: "Teacher",
  grade: "Primary",
  userId: "",
  password: "",
  language: "English",
};

export default function UserIdCreation() {
  const [users, setUsers] = useState<User[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [currentTier, setCurrentTier] = useState<"Primary" | "Middle" | "High">("Primary");

  const handleSubmit = (userData: User) => {
    if (editingUser) {
      setUsers(users.map(u => u.id === userData.id ? userData : u));
    } else {
      setUsers([...users, { ...userData, id: Date.now().toString() }]);
    }
    setIsModalOpen(false);
    setEditingUser(null);
  };

  const handleDelete = (userId: string) => {
    setUsers(users.filter(u => u.id !== userId));
  };

  return (
    <div className="p-8 max-w-4xl mx-auto bg-white rounded-lg shadow-sm">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-4 text-green-700">Teacher/User ID Creation</h1>
        
        <div className="flex gap-4 mb-6">
          <Select onValueChange={(v: "Primary" | "Middle" | "High") => setCurrentTier(v)}>
            <SelectTrigger className="w-[200px] border-green-200">
              <SelectValue placeholder="Select Tier" />
            </SelectTrigger>
            <SelectContent className="border-green-50">
              <SelectItem value="Primary">Primary</SelectItem>
              <SelectItem value="Middle">Middle</SelectItem>
              <SelectItem value="High">High</SelectItem>
            </SelectContent>
          </Select>

          <Input 
            placeholder="Team Name" 
            className="w-[300px] border-green-200" 
          />
        </div>
      </div>

      <div className="mb-4 flex justify-between items-center">
        <h3 className="text-lg font-semibold text-green-700">User List</h3>
        <Button 
          onClick={() => setIsModalOpen(true)}
          className="bg-green-600 hover:bg-green-700 text-white gap-2"
        >
          <PlusCircle className="h-4 w-4" />
          Add User
        </Button>
      </div>

      <Table className="border rounded-lg bg-white">
        <TableHeader className="bg-green-50">
          <TableRow>
            <TableHead className="text-green-700">Name</TableHead>
            <TableHead className="text-green-700">Role</TableHead>
            <TableHead className="text-green-700">Grade</TableHead>
            <TableHead className="text-green-700">User ID</TableHead>
            <TableHead className="text-green-700">Password</TableHead>
            <TableHead className="text-green-700 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.slice(0, 4).map((user) => ( // Fixed size of 4 rows
            <TableRow key={user.id} className="hover:bg-green-50">
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>{user.grade}</TableCell>
              <TableCell className="text-green-600">{user.userId}</TableCell>
              <TableCell className="text-green-600">{'•'.repeat(8)}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-green-600 hover:bg-green-100"
                    onClick={() => {
                      setEditingUser(user);
                      setIsModalOpen(true);
                    }}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-500 hover:bg-red-100"
                    onClick={() => handleDelete(user.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <UserModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingUser(null);
        }}
        onSubmit={handleSubmit}
        initialData={editingUser || emptyUser}
        tier={currentTier}
      />
    </div>
  );
}

function UserModal({ isOpen, onClose, onSubmit, initialData, tier }: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: User) => void;
  initialData: User;
  tier: "Primary" | "Middle" | "High";
}) {
  const [formData, setFormData] = useState<User>(initialData);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-white">
        <DialogHeader>
          <DialogTitle className="text-green-700">
            {initialData.id ? "Edit User" : "Create New User"}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-green-700">Name</label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="border-green-200"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-green-700">Role</label>
              <Select
                value={formData.role}
                onValueChange={(v: "Teacher" | "Student") => setFormData({ ...formData, role: v })}
              >
                <SelectTrigger className="border-green-200">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Teacher">Teacher</SelectItem>
                  <SelectItem value="Student">Student</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-green-700">Grade</label>
              <Select
                value={formData.grade}
                onValueChange={(v: "Primary" | "Middle" | "High") => setFormData({ ...formData, grade: v })}
              >
                <SelectTrigger className="border-green-200">
                  <SelectValue placeholder="Select grade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={tier}>{tier}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-green-700">Preferred Language</label>
              <Select
                value={formData.language}
                onValueChange={(v) => setFormData({ ...formData, language: v })}
              >
                <SelectTrigger className="border-green-200">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="English">English</SelectItem>
                  <SelectItem value="Spanish">Spanish</SelectItem>
                  <SelectItem value="French">French</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-green-700">User ID</label>
              <Input
                value={formData.userId}
                onChange={(e) => setFormData({ ...formData, userId: e.target.value })}
                className="border-green-200"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-green-700">Password</label>
              <Input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="border-green-200"
                required
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={onClose} className="border-green-200 text-green-700">
              Cancel
            </Button>
            <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white">
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}