"use client";
import { useUploadThing } from "@/lib/uploadthings";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

const Page = () => {
  const router = useRouter();
  const { startUpload, isUploading } = useUploadThing("imageUploader", {
    onClientUploadComplete: ([data]) => {
      const configId = data.serverData.configId;
      router.push(`/configure/design?id=${configId}`);
    },
  });

  const onDrop = useCallback((acceptedFiles: File[]) => {
    startUpload(acceptedFiles, { configId: undefined });
  }, [startUpload]);

  const { getRootProps, getInputProps, isDragActive } =
    useDropzone({
      onDrop,
      accept: {
        "image/png": [".png"],
        "image/jpeg": [".jpeg"],
        "image/jpg": [".jpg"],
      },
      onDropRejected() {
        console.log("reject");
      },
    });
  const isPending = false;
  
  return (
    <div>
      <div
        className="relative w-full h-[30vh] bg-slate-100"
        {...getRootProps()}
        aria-disabled={isUploading}
      >
        <input className="w-full h-full" {...getInputProps()} />

        {isDragActive ? (
          <h2>Drop here</h2>
        ) : isPending || isUploading ? (
          <div className="absolute flex top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <h2 className="mr-2">Please wait we are redirecting you</h2>
            <Loader2
              className="text-primary animate-spin font-bold text-xl"
              size={30}
            />
          </div>
        ) : (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            Please Upload your file here
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
