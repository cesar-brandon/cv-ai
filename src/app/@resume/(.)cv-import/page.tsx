"use client";
import { useState } from "react";
import CloseModal from "@/components/close-modal";
import Link from "next/link";
import { useDropzone } from "react-dropzone";
import Image from "next/image";

export default function Page() {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
  });

  const thumb = acceptedFiles.map((file) => (
    <div
      key={file.name}
      className="w-20 h-20 flex items-center justify-center bg-primary rounded-lg"
    >
      {file.text()}
      {/* <Image */}
      {/*   src={file.name} */}
      {/*   className="w-20 h-20 object-cover rounded-lg" */}
      {/*   alt="cv preview" */}
      {/*   onLoad={() => { */}
      {/*     URL.revokeObjectURL(file.preview); */}
      {/*   }} */}
      {/* /> */}
    </div>
  ));

  return (
    <div className="fixed inset-0 bg-zinc-900/20 z-10">
      <div className="container flex items-center h-full max-w-lg mx-auto">
        <div className="relative bg-white w-full h-fit py-20 px-2 rounded-lg">
          <div className="absolute top-4 right-4">
            <CloseModal />
          </div>

          <section className="w-full h-full flex flex-col items-center justify-center gap-4 rounded-lg">
            <div
              {...getRootProps({ className: "dropzone" })}
              className="w-full h-20 bg-muted rounded-lg flex items-center justify-center"
            >
              <input {...getInputProps()} className="w-full h-full" />
              <p>Carga tu currículum aquí</p>
            </div>
            {thumb && (
              <aside className="w-20 h-20 flex items-center justify-center bg-primary rounded-lg">
                {thumb}
              </aside>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
