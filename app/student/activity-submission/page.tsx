// app/activity-submission/page.tsx
"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UploadCloud, Edit3, X, FileText } from "lucide-react";
import { useState, useRef } from "react";

export default function ActivitySubmission() {
  const [activeTab, setActiveTab] = useState<"upload" | "write">("upload");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [content, setContent] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      setActiveTab("upload");
    }
  };

  const removeFile = () => {
    setUploadedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="p-8 max-w-3xl mx-auto bg-white rounded-lg shadow-sm">
      <h1 className="text-2xl font-bold mb-6 text-green-700">Student Activity Submission</h1>
      
      <div className="mb-8">
        <Select>
          <SelectTrigger className="w-[300px] border-green-200">
            <SelectValue placeholder="Pick Activity" />
          </SelectTrigger>
          <SelectContent className="border-green-50">
            <SelectItem value="science">Science Fair Project</SelectItem>
            <SelectItem value="art">Art Competition</SelectItem>
            <SelectItem value="sports">Sports Achievement</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        {/* Upload Card */}
        <div
          className={`p-6 border-2 rounded-lg cursor-pointer transition-all ${
            activeTab === "upload" 
              ? "border-green-500 bg-green-50"
              : "border-gray-200 hover:border-green-200"
          }`}
          onClick={() => setActiveTab("upload")}
        >
          <div className="flex flex-col items-center justify-center h-full">
            <UploadCloud className="h-12 w-12 text-green-600 mb-4" />
            <h3 className="text-lg font-semibold text-green-700 mb-2">Upload Document</h3>
            <p className="text-gray-600 text-center text-sm">
              Supported formats: PDF, DOC, JPG, PNG
            </p>
            
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              className="hidden"
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
            />
            
            <Button
              variant="outline"
              className="mt-4 border-green-200 text-green-700 hover:bg-green-100"
              onClick={() => fileInputRef.current?.click()}
            >
              Choose File
            </Button>

            {uploadedFile && (
              <div className="mt-4 flex items-center bg-green-100 p-2 rounded">
                <FileText className="h-5 w-5 text-green-600 mr-2" />
                <span className="text-sm text-green-700 flex-1 truncate">
                  {uploadedFile.name}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile();
                  }}
                  className="text-red-500 hover:text-red-700 ml-2"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Write Content Card */}
        <div
          className={`p-6 border-2 rounded-lg cursor-pointer transition-all ${
            activeTab === "write"
              ? "border-green-500 bg-green-50"
              : "border-gray-200 hover:border-green-200"
          }`}
          onClick={() => setActiveTab("write")}
        >
          <div className="flex flex-col items-center justify-center h-full">
            <Edit3 className="h-12 w-12 text-green-600 mb-4" />
            <h3 className="text-lg font-semibold text-green-700 mb-2">Write Content</h3>
            <p className="text-gray-600 text-center text-sm">
              Describe your activity in detail
            </p>
            
            <div className="w-full mt-4">
              <Textarea
                value={content}
                onChange={(e) => {
                  setContent(e.target.value);
                  setActiveTab("write");
                }}
                placeholder="Write your activity report here..."
                className="border-green-200 h-32 focus-visible:ring-green-500"
              />
              <div className="text-right text-sm text-gray-500 mt-2">
                {content.length}/2000 characters
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <Button variant="outline" className="border-green-200 text-green-700">
          Cancel
        </Button>
        <Button className="bg-green-600 hover:bg-green-700 text-white">
          Save & Submit
        </Button>
      </div>
    </div>
  );
}