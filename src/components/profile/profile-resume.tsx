import { Resume } from "@/app/api/pdf/route";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SectionSkeleton } from "../section-skeleton";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";

export function ProfileResume({
  resume,
  isPending,
  className,
}: {
  resume: Resume;
  isPending?: boolean;
  className?: string;
}) {
  return (
    <Tabs defaultValue="about" className={cn("w-[400px] h-[25rem]", className)}>
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
  );
}
