"use client";

import { UploadDropzone } from "@/components/upload-dropzone";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { ModalFooter } from "@/components/modal-footer";
import { useMutation } from "@tanstack/react-query";
import { SectionSkeleton } from "@/components/section-skeleton";
import axios from "axios";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getLocalStorage, setLocalStorage } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { Resume } from "@/app/api/pdf/route";

export function ResumeImportCard({ userId }: { userId: string }) {
  const [resume, setResume] = useState<Resume | null>(
    getLocalStorage("Resume", null),
  );

  const {
    data,
    isPending,
    mutate: sectionCv,
  } = useMutation({
    mutationFn: async (file: any) => {
      const { data } = await axios.post("/api/pdf", file, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setLocalStorage("Resume", data);
      return data;
    },
    onSuccess: () => {
      toast({
        title: "Archivo subido",
        description: "Tu archivo se subió correctamente",
      });
    },
    onError: () => {
      toast({
        title: "Ocurrió un error",
        variant: "destructive",
      });
    },
  });

  useEffect(() => {
    if (data) {
      setResume(getLocalStorage("Resume", null));
    }
  }, [data]);
  return (
    <Card className="h-fit w-full">
      <CardContent className="flex flex-col gap-4 p-4">
        <UploadDropzone sectionCv={sectionCv} />

        <Tabs defaultValue="about" className="w-[400px] h-[25rem]">
          <TabsList>
            <TabsTrigger value="about">Acerca de</TabsTrigger>
            <TabsTrigger value="skills">Habilidades</TabsTrigger>
            <TabsTrigger value="exp">Experiencia</TabsTrigger>
            <TabsTrigger value="projects">Proyectos</TabsTrigger>
          </TabsList>
          <TabsContent value="about">
            {isPending ? (
              <SectionSkeleton />
            ) : (
              <p className="font-light text-muted-foreground text-balance">
                {resume?.about}
              </p>
            )}
          </TabsContent>
          <TabsContent value="skills">
            {isPending ? (
              <SectionSkeleton />
            ) : (
              <ul className="flex flex-wrap gap-2">
                {resume?.skills.map((skill, index) => (
                  <li key={index}>
                    <Badge className="text-background">{skill}</Badge>
                  </li>
                ))}
              </ul>
            )}
          </TabsContent>
          <TabsContent value="exp">
            {isPending ? (
              <SectionSkeleton />
            ) : (
              <ScrollArea className="h-[300px] w-full rounded-md border">
                {resume?.experience.map((exp, index) => (
                  <div className="p-4" key={index}>
                    <div className="flex flex-col gap-2">
                      <h3 className="font-semibold text-lg truncate">
                        {exp.title}
                      </h3>
                      <p className="font-light text-muted-foreground">
                        {exp.company}
                      </p>
                      <p className="font-light text-muted-foreground">
                        {exp.description}
                      </p>
                      <p className="font-light text-muted-foreground">
                        {exp.startDate} - {exp.endDate}
                      </p>
                    </div>
                    <Separator className="m-2" />
                  </div>
                ))}
              </ScrollArea>
            )}
          </TabsContent>
          <TabsContent value="projects">
            {isPending ? (
              <SectionSkeleton />
            ) : (
              <ScrollArea className="h-[300px] w-full rounded-md border">
                {resume?.projects.map((project, index) => (
                  <div className="p-4" key={index}>
                    <div className="flex flex-col gap-2">
                      <h3 className="font-semibold text-lg">{project.title}</h3>
                      <a href={project.url} className="text-primary">
                        {project.url}
                      </a>
                      <p className="font-light text-muted-foreground">
                        {project.description}
                      </p>
                      <p className="font-light text-muted-foreground">
                        {project.startDate} - {project.endDate}
                      </p>
                    </div>
                  </div>
                ))}
              </ScrollArea>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
      <ModalFooter id={userId} />
    </Card>
  );
}
