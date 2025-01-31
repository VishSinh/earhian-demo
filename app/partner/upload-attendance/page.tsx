// app/orientation-program/page.tsx
"use client";
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CheckCircle2, XCircle, UploadCloud, Edit, Trash2 } from "lucide-react"
import { useState } from "react"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { DatePickerDemo } from "@/components/date-picker"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogDescription,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

type TeacherAttendance = {
    id: string
    schoolName: string
    teacherName: string
    teacherEmail: string
    attended: boolean
}

// Generate dummy data
const generateDummyData = (): TeacherAttendance[] => {
    const schools = ["City Public School", "Hill Valley High", "Greenwood Academy", "Sunrise Elementary", "Maplewood High"];
    const data: TeacherAttendance[] = [];
    
    for (let i = 0; i < 45; i++) {
        data.push({
            id: `TCH-${1000 + i}`,
            schoolName: schools[i % 5],
            teacherName: `Teacher ${i + 1}`,
            teacherEmail: `teacher${i + 1}@${schools[i % 5].toLowerCase().replace(/ /g, '')}.edu`,
            attended: i % 4 === 0
        });
    }
    return data;
}

export default function OrientationProgram() {
    const [selectedSchool, setSelectedSchool] = useState<string>("")
    // const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 10
    const [attendanceData, setAttendanceData] = useState<TeacherAttendance[]>(generateDummyData())
    const [editingEntry, setEditingEntry] = useState<TeacherAttendance | null>(null)
    const [deletingEntry, setDeletingEntry] = useState<TeacherAttendance | null>(null)

    // Pagination logic
    const totalPages = Math.ceil(attendanceData.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const currentData = attendanceData.slice(startIndex, endIndex)

    const schoolOptions = [
        "City Public School",
        "Hill Valley High",
        "Greenwood Academy",
        "Sunrise Elementary",
        "Maplewood High"
    ]

    const handleEdit = (entry: TeacherAttendance) => {
        setEditingEntry(entry)
    }

    const handleSaveEdit = () => {
        if (editingEntry) {
            setAttendanceData(prev => 
                prev.map(item => item.id === editingEntry.id ? editingEntry : item)
            )
            setEditingEntry(null)
        }
    }

    const handleDelete = () => {
        if (deletingEntry) {
            setAttendanceData(prev => 
                prev.filter(item => item.id !== deletingEntry.id)
            )
            setDeletingEntry(null)
        }
    }

    const PaginationControls = () => (
        <div className="flex justify-between items-center mt-4 px-4 py-2 bg-green-50 rounded-lg">
            <span className="text-sm text-green-700">
                Showing {startIndex + 1}-{Math.min(endIndex, attendanceData.length)} of {attendanceData.length} entries
            </span>
            <div className="flex gap-1">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="border-green-200 text-green-700 hover:bg-green-100"
                >
                    Previous
                </Button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <Button
                        key={page}
                        // variant={currentPage === page ? "solid" : "outline"}
                        size="sm"
                        className={`${currentPage === page ? 'bg-green-600 text-white' : 'border-green-200 text-green-700'} hover:bg-green-100`}
                        onClick={() => setCurrentPage(page)}
                    >
                        {page}
                    </Button>
                ))}
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="border-green-200 text-green-700 hover:bg-green-100"
                >
                    Next
                </Button>
            </div>
        </div>
    )

    return (
        <div className="p-8 max-w-6xl mx-auto bg-white rounded-lg shadow-sm">
            {/* Edit Modal */}
            <Dialog open={!!editingEntry} onOpenChange={() => setEditingEntry(null)}>
                <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                        <DialogTitle className="text-green-700">Edit Attendance Entry</DialogTitle>
                    </DialogHeader>
                    {editingEntry && (
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label className="text-green-700">School Name</Label>
                                    <Select 
                                        value={editingEntry.schoolName}
                                        onValueChange={value => setEditingEntry({...editingEntry, schoolName: value})}
                                    >
                                        <SelectTrigger className="border-green-200">
                                            <SelectValue placeholder="Select school" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {schoolOptions.map(school => (
                                                <SelectItem key={school} value={school}>
                                                    {school}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-green-700">Teacher Name</Label>
                                    <Input
                                        value={editingEntry.teacherName}
                                        onChange={e => setEditingEntry({...editingEntry, teacherName: e.target.value})}
                                        className="border-green-200"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-green-700">Teacher Email</Label>
                                    <Input
                                        value={editingEntry.teacherEmail}
                                        onChange={e => setEditingEntry({...editingEntry, teacherEmail: e.target.value})}
                                        className="border-green-200"
                                    />
                                </div>
                                <div className="space-y-2 flex items-center gap-4">
                                    <Label className="text-green-700">Attendance</Label>
                                    <Switch
                                        checked={editingEntry.attended}
                                        onCheckedChange={checked => setEditingEntry({...editingEntry, attended: checked})}
                                        className="data-[state=checked]:bg-green-600"
                                    />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button 
                                    onClick={handleSaveEdit}
                                    className="bg-green-600 hover:bg-green-700 text-white"
                                >
                                    Save Changes
                                </Button>
                            </DialogFooter>
                        </div>
                    )}
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog open={!!deletingEntry} onOpenChange={() => setDeletingEntry(null)}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle className="text-red-600">Confirm Deletion</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete this entry? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button 
                            variant="outline" 
                            onClick={() => setDeletingEntry(null)}
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

            {/* Main Content */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold mb-4 text-green-700">Orientation Program Attendance</h1>
                <div className="flex gap-4 items-center mb-6">
                    <div className="flex-1">
                        <Select value={selectedSchool} onValueChange={setSelectedSchool}>
                            <SelectTrigger className="w-[300px] border-green-200">
                                <SelectValue placeholder="Select school..." />
                            </SelectTrigger>
                            <SelectContent className="border-green-50">
                                {schoolOptions.map(school => (
                                    <SelectItem key={school} value={school} className="hover:bg-green-50">
                                        {school}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <DatePickerDemo />
                </div>
            </div>

            <Table className="border rounded-lg bg-white">
                <TableHeader className="bg-green-50">
                    <TableRow>
                        <TableHead className="w-[25%] text-green-700">School Name</TableHead>
                        <TableHead className="w-[25%] text-green-700">Teacher Name</TableHead>
                        <TableHead className="w-[25%] text-green-700">Teacher Email</TableHead>
                        <TableHead className="w-[15%] text-green-700 text-center">Attendance</TableHead>
                        <TableHead className="w-[10%] text-green-700 text-center">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {currentData.map((entry) => (
                        <TableRow key={entry.id} className="hover:bg-green-50">
                            <TableCell className="font-medium">{entry.schoolName}</TableCell>
                            <TableCell>{entry.teacherName}</TableCell>
                            <TableCell className="text-green-600">{entry.teacherEmail}</TableCell>
                            <TableCell className="text-center">
                                {entry.attended ? (
                                    <CheckCircle2 className="h-6 w-6 text-green-600 mx-auto" />
                                ) : (
                                    <XCircle className="h-6 w-6 text-red-500 mx-auto" />
                                )}
                            </TableCell>
                            <TableCell>
                                <div className="flex justify-center gap-2">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-green-600 hover:bg-green-100"
                                        onClick={() => handleEdit(entry)}
                                    >
                                        <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-red-500 hover:bg-red-100"
                                        onClick={() => setDeletingEntry(entry)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <PaginationControls />

            <div className="mt-6 flex justify-end">
                <Button className="bg-green-600 hover:bg-green-700 text-white gap-2 shadow-sm">
                    <UploadCloud className="h-4 w-4" />
                    Upload Attendance Sheet
                </Button>
            </div>
        </div>
    )
}