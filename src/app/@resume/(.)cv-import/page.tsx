"use client";

import { UploadDropzone } from "@/components/upload-dropzone";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { ModalFooter } from "@/components/modal-footer";
import { useMutation } from "@tanstack/react-query";
import { SectionSkeleton } from "@/components/section-skeleton";
import axios from "axios";
import { Button } from "@/components/ui/button";

export default function Page() {
  const {
    data,
    isPending,
    mutate: sectionCv,
  } = useMutation({
    mutationFn: async (file: any) => {
      console.log(file);
      const res = await axios.post("/api/pdf", file);
      return res.data;
    },
    onSuccess: () => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return (
    <div className="fixed inset-0 bg-foreground/20 z-10">
      <div className="container flex items-center h-full max-w-lg mx-auto">
        <Card className="h-fit w-full">
          <CardContent className="flex flex-col gap-4 p-4">
            <UploadDropzone sectionCv={sectionCv} />
            <Button
              onClick={() => {
                sectionCv("hello");
              }}
            >
              Test file
            </Button>

            <Tabs defaultValue="about" className="w-[400px] h-[25rem]">
              <TabsList>
                <TabsTrigger value="about">Acerca de</TabsTrigger>
                <TabsTrigger value="skills">Habilidades</TabsTrigger>
                <TabsTrigger value="exp">Experiencia</TabsTrigger>
                <TabsTrigger value="projects">Proyectos</TabsTrigger>
              </TabsList>
              <TabsContent value="about">
                {isPending && <SectionSkeleton />}
              </TabsContent>
              <TabsContent value="skills">
                {isPending && <SectionSkeleton />}
              </TabsContent>
              <TabsContent value="exp">
                {isPending && <SectionSkeleton />}
              </TabsContent>
              <TabsContent value="projects">
                {isPending && <SectionSkeleton />}
              </TabsContent>
            </Tabs>
          </CardContent>
          <ModalFooter />
        </Card>
      </div>
    </div>
  );
}
