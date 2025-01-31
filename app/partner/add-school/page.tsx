// app/teacher-user-id-creation/page.tsx
"use client";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Edit, PlusCircle, Trash2, Save, X } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";

type School = {
    id: string;
    name: string;
    state: string;
    region: string;
};

const emptySchool: School = {
    id: "",
    name: "",
    state: "",
    region: "",
};

export default function SchoolAddition() {
    const [schools, setSchools] = useState<School[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingSchool, setEditingSchool] = useState<School | null>(null);
    const [deletingSchool, setDeletingSchool] = useState<School | null>(null);

    const handleSubmit = (schoolData: School) => {
        if (editingSchool) {
            setSchools(schools.map(s => s.id === schoolData.id ? schoolData : s));
        } else {
            setSchools([...schools, { ...schoolData, id: Date.now().toString() }]);
        }
        setIsModalOpen(false);
        setEditingSchool(null);
    };

    const handleDelete = () => {
        if (deletingSchool) {
            setSchools(schools.filter(s => s.id !== deletingSchool.id));
            setDeletingSchool(null);
        }
    };

    return (
        <div className="p-8 max-w-4xl mx-auto bg-white rounded-lg shadow-sm">
            {/* Delete Confirmation Dialog */}
            <Dialog open={!!deletingSchool} onOpenChange={() => setDeletingSchool(null)}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle className="text-red-600">Confirm Deletion</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete this school? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setDeletingSchool(null)}
                            className="border-green-200 text-green-700"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleDelete}
                            className="bg-red-600 hover:bg-red-700 text-white"
                        >
                            Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* School Modal */}
            <Dialog open={isModalOpen || !!editingSchool} onOpenChange={() => {
  setIsModalOpen(false);
  setEditingSchool(null);
}}>
  <DialogContent className="sm:max-w-[500px] bg-white">
    <DialogHeader>
      <DialogTitle className="text-green-700">
        {editingSchool ? "Edit School" : "Add New School"}
      </DialogTitle>
      <DialogDescription>
        {editingSchool 
          ? "Update the school details below"
          : "Fill in the details for the new school"}
      </DialogDescription>
    </DialogHeader>

                    <form onSubmit={(e) => {
                        e.preventDefault();
                        handleSubmit(editingSchool || emptySchool);
                    }} className="grid gap-4 py-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-green-700">School Name</label>
                            <Input
                                value={editingSchool?.name || ""}
                                onChange={(e) => setEditingSchool(prev => ({
                                    ...(prev || emptySchool),
                                    name: e.target.value
                                }))}
                                className="border-green-200"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-green-700">State</label>
                                <Input
                                    value={editingSchool?.state || ""}
                                    onChange={(e) => setEditingSchool(prev => ({
                                        ...(prev || emptySchool),
                                        state: e.target.value
                                    }))}
                                    className="border-green-200"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-green-700">Region</label>
                                <Input
                                    value={editingSchool?.region || ""}
                                    onChange={(e) => setEditingSchool(prev => ({
                                        ...(prev || emptySchool),
                                        region: e.target.value
                                    }))}
                                    className="border-green-200"
                                    required
                                />
                            </div>
                        </div>

                        <div className="flex justify-end gap-2 mt-4">
                            <Button
                                variant="outline"
                                type="button"
                                onClick={() => {
                                    setIsModalOpen(false);
                                    setEditingSchool(null);
                                }}
                                className="border-green-200 text-green-700"
                            >
                                Cancel
                            </Button>
                            <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white">
                                <Save className="mr-2 h-4 w-4" />
                                {editingSchool ? "Save Changes" : "Create School"}
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>

            <div className="mb-8">
                <h1 className="text-2xl font-bold mb-4 text-green-700">School Addition</h1>

                <div className="mb-6 grid grid-cols-3 gap-4">
                    <Input placeholder="School Name" className="border-green-200" />
                    <Input placeholder="State" className="border-green-200" />
                    <Input placeholder="Region" className="border-green-200" />
                </div>
            </div>

            <div className="mb-4 flex justify-between items-center">
                <h3 className="text-lg font-semibold text-green-700">Schools List</h3>
                <Button
                    onClick={() => {
                        setEditingSchool(null);
                        setIsModalOpen(true);
                    }}
                    className="bg-green-600 hover:bg-green-700 text-white gap-2"
                >
                    <PlusCircle className="h-4 w-4" />
                    Add School
                </Button>
            </div>

            <Table className="border rounded-lg bg-white">
                <TableHeader className="bg-green-50">
                    <TableRow>
                        <TableHead className="text-green-700">School Name</TableHead>
                        <TableHead className="text-green-700">State</TableHead>
                        <TableHead className="text-green-700">Region</TableHead>
                        <TableHead className="text-green-700 text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {schools.slice(0, 4).map((school) => (
                        <TableRow key={school.id} className="hover:bg-green-50">
                            <TableCell className="font-medium">{school.name}</TableCell>
                            <TableCell>{school.state}</TableCell>
                            <TableCell>{school.region}</TableCell>
                            <TableCell className="text-right">
                                <div className="flex justify-end gap-2">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-green-600 hover:bg-green-100"
                                        onClick={() => setEditingSchool(school)}
                                    >
                                        <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-red-500 hover:bg-red-100"
                                        onClick={() => setDeletingSchool(school)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}