"use client";
import { CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "./ui/use-toast";
import { getLocalStorage } from "@/lib/utils";

export function ModalFooter({ id }: { id: string }) {
  const router = useRouter();

  const { isPending, mutate: postResumeContent } = useMutation({
    mutationFn: async () => {
      const content = getLocalStorage("Resume", null);
      await axios.post("/api/resume", { id, content });
    },
    onSuccess: () => {
      router.push("/");
      toast({
        title: "Currículum actualizado",
      });
    },
    onError: () => {
      toast({
        title: "Ocurrió un error",
        variant: "destructive",
      });
    },
  });

  return (
    <CardFooter className="flex gap-4">
      <Button
        className="w-full"
        variant="secondary"
        onClick={() => router.back()}
      >
        volver
      </Button>
      <Button
        className="w-full"
        isLoading={isPending}
        variant="destructive"
        onClick={() => postResumeContent()}
      >
        Guardar
      </Button>
    </CardFooter>
  );
}
