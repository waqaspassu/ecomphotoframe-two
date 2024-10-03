import { createUploadthing, type FileRouter } from "uploadthing/next";
import { z } from "zod";
import sharp from "sharp";
import { db } from "@/db";

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    .input(
      z.object({
        configId: z.string().optional(),
      })
    )
    .middleware(async ({ input }) => {
      return {
        configId: input.configId,
      };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const res = await fetch(file.url);
      const buffer = await res.arrayBuffer();
      const imgMetadata = await sharp(buffer).metadata();

      if (!metadata.configId) {
        const confiurationId = await db.configuration.create({
          data: {
            width: imgMetadata.width || 500,
            height: imgMetadata.height || 500,
            imgUrl: file.url,
          },
        });

        return {
          configId: confiurationId.id,
          croppedImageUrl: confiurationId.croppedImageUrl,
        };
      }

      if (metadata.configId) {
        const updatedConfigurationId = await db.configuration.update({
          where: {
            id: metadata.configId,
          },
          data: {
            croppedImageUrl: file.url,
          },
        });

        return {
          configId: updatedConfigurationId.id,
        };
      }

      return {
        configId: metadata.configId,
      };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
