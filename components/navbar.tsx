"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";

export default function Navbar() {
    return (
        <div className="w-full">
            <div className="h-24" />

            <motion.nav
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="fixed top-4 left-[10%] right-[10%] bg-white shadow-lg rounded-xl px-6 py-3 flex items-center justify-between z-50">
                <div
                    className="text-green-700 text-3xl font-extrabold"
                    style={{ fontFamily: "'Comic Neue', cursive" }}>
                    Earthian
                </div>

                <Link href="/auth/login">
                    <Button variant="outline" className="border-green-300 text-green-700 hover:bg-green-100 flex gap-2">
                        <LogIn className="h-5 w-5" />
                        Login
                    </Button>
                </Link>
            </motion.nav>
        </div>
    );
}
