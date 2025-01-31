// app/page.tsx (Dashboard)
"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Users, ClipboardList, LogIn, School, Activity } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/navbar";

const routes = [
  {
    name: "Upload Attendance",
    path: "/partner/upload-attendance",
    icon: <ClipboardList className="h-8 w-8" />,
    color: "bg-white hover:bg-green-200"
  },
  {
    name: "Create User IDs",
    path: "/teacher/create-user",
    icon: <Users className="h-8 w-8" />,
    color: "bg-white hover:bg-green-200"
  },
  {
    name: "Announcements",
    path: "/partner/announcement",
    icon: <Users className="h-8 w-8" />,
    color: "bg-white hover:bg-green-200"
  },
  {
    name: "Login Portal",
    path: "/auth/login",
    icon: <LogIn className="h-8 w-8" />,
    color: "bg-white hover:bg-green-200"
  },
  {
    name: "Add Schools",
    path: "partner/add-school",
    icon: <School className="h-8 w-8" />,
    color: "bg-white hover:bg-green-200"

  },
  {
    name: "Submit Activity",
    path: "student/activity-submission",  
    icon: <Activity className="h-8 w-8" />,
    color: "bg-white hover:bg-green-200"
  }
];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-green-50 p-8">
      <div className="max-w-6xl mx-auto">
        <Navbar/>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl font-bold text-green-700 mb-4">
            <LayoutDashboard className="inline-block h-10 w-10 mr-3" />
            All Routes
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {routes.map((route, index) => (
            <motion.div
              key={route.path}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={route.path}>
                <Button className={`h-40 w-full flex flex-col gap-4 rounded-xl ${route.color}`}>
                  <div className="text-green-700">{route.icon}</div>
                  <h2 className="text-xl font-semibold text-green-700">{route.name}</h2>
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}