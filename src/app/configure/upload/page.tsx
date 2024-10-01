"use client";
import { useUploadThing } from "@/lib/uploadthings";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

const page = () => {
  const router = useRouter();
  const { startUpload } = useUploadThing("imageUploader", {
    onClientUploadComplete: ([data]) => {
      console.log({data})
      const configId = data.serverData.configId;
      // router.push(`/configure/design?id = ${configId}`);
    },
  });
  const onDrop = useCallback((acceptedFiles: any) => {
    console.log({ acceptedFiles });
    startUpload(acceptedFiles, { configId: undefined });
  }, []);

  const { acceptedFiles, getRootProps, getInputProps, isDragActive } =
    useDropzone({
      onDrop,
      accept: {
        "image/png": [".png"],
        "image/jpeg": [".jpeg"],
        "image/jpg": [".jpg"],
      },
      onDropRejected(fileRejections, event) {
        console.log("reject");
      },
    });
  const isPending = false;
  const isUploading = false;

  const files = acceptedFiles.map((file: any) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));
  return (
    <div>
      <div
        className="relative w-full h-[30vh] bg-slate-100"
        {...getRootProps()}
      >
        <input className="w-full h-full" {...getInputProps()} />

        {isDragActive ? (
          <h2>Drop here</h2>
        ) : isPending || isUploading ? (
          <Loader2 />
        ) : (
          <div>Please Upload your file here</div>
        )}
      </div>
      <aside>
        <h4>Files</h4>
        <ul>{files}</ul>
      </aside>
    </div>
  );
};

export default page;
