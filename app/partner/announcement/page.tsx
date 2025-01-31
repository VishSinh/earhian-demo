// app/announcements/page.tsx
"use client";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

type Announcement = {
  id: string;
  year: string;
  content: string;
  date: string;
};

const dummyAnnouncements: Announcement[] = [
  {
    id: "1",
    year: "2024",
    content: "Important update about the Earthian program curriculum and timeline for the current academic year.",
    date: "2024-03-15"
  },
  {
    id: "2",
    year: "2024",
    content: "New sustainability initiatives added to the program. Please review the updated guidelines.",
    date: "2024-06-01"
  },
  {
    id: "3",
    year: "2023",
    content: "Annual partner meet details and schedule announcement.",
    date: "2023-11-20"
  },
];

export default function AnnouncementsPage() {
  const [selectedYear, setSelectedYear] = useState("2024");
  const [showAll, setShowAll] = useState(false);

  const filteredAnnouncements = dummyAnnouncements
    .filter(a => a.year === selectedYear)
    .slice(0, showAll ? undefined : 1);

  return (
    <div className="p-8 max-w-4xl mx-auto bg-white rounded-lg shadow-sm">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-4 text-green-700">Earthian Announcements – Partner Portal</h1>
        
        <div className="flex gap-4 items-center mb-6">
          <div className="w-48">
            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger className="border-green-200">
                <SelectValue placeholder="Select Year" />
              </SelectTrigger>
              <SelectContent className="border-green-50">
                <SelectItem value="2024">2024</SelectItem>
                <SelectItem value="2023">2023</SelectItem>
                <SelectItem value="2022">2022</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {filteredAnnouncements.map(announcement => (
          <div key={announcement.id} className="border-l-4 border-green-200 pl-4">
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-green-700 font-semibold mb-2">Dear Partner</h3>
              <p className="text-gray-600 mb-4">{announcement.content}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-green-600">{announcement.date}</span>
                <span className="text-sm text-gray-500 italic">
                  *This message was sent via portal and email
                </span>
              </div>
            </div>
          </div>
        ))}

        {filteredAnnouncements.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No announcements found for {selectedYear}
          </div>
        )}

        {dummyAnnouncements.filter(a => a.year === selectedYear).length > 1 && (
          <Button
            variant="ghost"
            className="text-green-600 hover:bg-green-100"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? 'Show Less' : 'Show All'}
          </Button>
        )}
      </div>
    </div>
  );
}