import { Resume } from "@/app/api/pdf/route";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SectionSkeleton } from "../section-skeleton";
import { ScrollArea } from "../ui/scroll-area";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Award, Box, BriefcaseBusiness, Info } from "lucide-react";

export function ProfileResume({
  resume,
  isPending,
  className,
}: {
  resume: Resume;
  isPending?: boolean;
  className?: string;
}) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  return (
    <Tabs defaultValue="about">
      <TabsList className={cn("flex sm:gap-4", className)}>
        <TabsTrigger
          value="about"
          className="data-[state=active]:w-full sm:data-[state=active]:w-auto transition-all duration-300"
        >
          {isDesktop ? "Acerca de mí" : <Info className="w-5 h-5" />}
        </TabsTrigger>
        <TabsTrigger
          value="skills"
          className="data-[state=active]:w-full sm:data-[state=active]:w-auto transition-all duration-300"
        >
          {isDesktop ? "Habilidades" : <Award className="w-5 h-5" />}
        </TabsTrigger>
        <TabsTrigger
          value="exp"
          className="data-[state=active]:w-full sm:data-[state=active]:w-auto transition-all duration-300"
        >
          {isDesktop ? (
            "Experiencia"
          ) : (
            <BriefcaseBusiness className="w-5 h-5" />
          )}
        </TabsTrigger>
        <TabsTrigger
          value="projects"
          className="data-[state=active]:w-full sm:data-[state=active]:w-auto transition-all duration-300"
        >
          {isDesktop ? "Proyectos" : <Box className="w-5 h-5" />}
        </TabsTrigger>
      </TabsList>
      <TabsContent value="about" className="pt-2">
        {isPending ? (
          <SectionSkeleton />
        ) : (
          <p className="font-light text-muted-foreground text-balance">
            {resume?.about}
          </p>
        )}
      </TabsContent>
      <TabsContent value="skills" className="pt-2">
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
      <TabsContent value="exp" className="pt-2">
        {isPending ? (
          <SectionSkeleton />
        ) : (
          <ScrollArea className="h-[300px] w-full rounded-md border">
            {resume?.experience.map((exp, index) => (
              <div key={index} className="p-4 flex flex-col gap-2">
                <h3 className="font-semibold text-lg truncate">{exp.title}</h3>
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
            ))}
          </ScrollArea>
        )}
      </TabsContent>
      <TabsContent value="projects" className="pt-2">
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
  );
}
