import { createUploadthing, type FileRouter } from "uploadthing/next";
import { z } from "zod";

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    .input(z.object({ configId: z.string().optional() }))
    .middleware(async ({ input }) => {
      return {
        input,
      };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log({ metadata, file });
      return {
        configId: metadata.input,
      };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
