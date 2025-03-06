// src/app/page.tsx
"use client";

import { ModeToggle } from "@/components/ModeToggle";
import Navbar from "@/components/layout/Navbar";

export default function Page() {
  return (
    <div className="p-4 bg-background text-foreground min-h-screen">
      <Navbar />
      <h1 className="text-2xl">Meu CMS</h1>
      <ModeToggle />
    </div>
  );
}