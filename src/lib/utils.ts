import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"
import { NextResponse } from "next/server"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// export const animatePageIn = () => {
//   const banners = Array.from(document.querySelectorAll('.banner')); // Select all banners by class

//   if (banners.length > 0) {
//     const tl = gsap.timeline();
//     tl.set(banners, {
//       yPercent: 0,
//     }).to(banners, {
//       yPercent: 100,
//       stagger: 0.05,
//     });
//   }
// };

// export const animatePageOut = (href: string, router: AppRouterInstance) => {
//   const banners = Array.from(document.querySelectorAll('.banner')); // Select all banners by class

//   if (banners.length > 0) {
//     const tl = gsap.timeline();
//     tl.set(banners, {
//       yPercent: -100,
//     }).to(banners, {
//       yPercent: 0,
//       stagger: 0.05,
//       onComplete: () => {
//         router.refresh();
//         router.push(href);
//       },
//     });
//   }
// };

export function handleError(error: unknown) {
  if (error instanceof Error) {
    console.log(error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(
    { error: 'Internal server error' },
    { status: 500 }
  );
}

import {
  generateUploadButton,
  generateUploadDropzone,
} from "@uploadthing/react";
import { OurFileRouter } from "./uploadthing"


export const UploadButton = generateUploadButton<OurFileRouter>();
export const UploadDropzone = generateUploadDropzone<OurFileRouter>();


