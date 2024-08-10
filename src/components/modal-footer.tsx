"use client";
import { CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function ModalFooter() {
  const router = useRouter();
  return (
    <CardFooter className="flex gap-4">
      <Button
        className="w-full"
        variant="secondary"
        onClick={() => router.back()}
      >
        volver
      </Button>
      <Button className="w-full" variant="destructive">
        Guardar
      </Button>
    </CardFooter>
  );
}
