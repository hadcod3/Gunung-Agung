// api/uploadthing/route.ts
import { createRouteHandler } from "uploadthing/next";
import { ourFileRouter } from "@/lib/uploadthing"; // Import from lib instead

export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
});