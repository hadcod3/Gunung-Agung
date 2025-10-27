// components/SmoothScroll.tsx
"use client";
import useLenis from "@/hooks/useLenis";

 // Mark this as a Client Component


export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useLenis(); // Use the Lenis hook here

  return <>{children}</>;
}