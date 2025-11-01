import { generateReactHelpers } from "@uploadthing/react";
import { createUploadthing } from "uploadthing/next";
import type { FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({
    image: {
      maxFileSize: "64MB",
      maxFileCount: 50,
    },
  })
    .middleware(async () => {
      return { userId: "user123" };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId);
      console.log("file url", file.ufsUrl);
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;

export const { useUploadThing, uploadFiles } = generateReactHelpers<OurFileRouter>();