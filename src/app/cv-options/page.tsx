"use client";
import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function ResumeOptionsPage() {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState<
    "cv-create" | "cv-import"
  >("cv-import");

  return (
    <div className="container flex items-center justify-center h-dvh max-w-lg mx-auto">
      <Card className="h-fit w-full">
        <CardContent className="flex flex-col gap-4 p-4">
          <Image
            src="https://i.pinimg.com/564x/3c/9f/8f/3c9f8f94ecc1a63c48c3409a2de1a942.jpg"
            alt="profile-header"
            width={1920}
            height={400}
            className="w-full h-48 object-cover rounded-[2rem]"
          />
          <div className="flex flex-col gap-2 text-center">
            <h3 className="font-bold text-2xl">
              Actualiza tu CV en pocos clics!
            </h3>
            <p className="font-light text-muted-foreground text-balance">
              ¡Actualiza tu cv ahora y cree su currículum perfecto en minutos!
            </p>
          </div>
          <RadioGroup
            onValueChange={(value) => setSelectedOption(value as any)}
            defaultValue={selectedOption}
          >
            <div className="flex items-center gap-4 pl-6 rounded-sm border hover:border-primary transition-all duration-300">
              <RadioGroupItem value="cv-import" id="cv-import" />
              <Label
                htmlFor="cv-import"
                className="w-full font-semibold text-md py-4"
              >
                Importa tu CV
                <p className="font-normal text-sm text-muted-foreground">
                  Importa tu currículum actual y edítalo
                </p>
              </Label>
            </div>
          </RadioGroup>
        </CardContent>
        <CardFooter className="flex gap-4">
          <Button
            className="w-full"
            variant="secondary"
            onClick={() => router.back()}
          >
            Quizas mas tarde
          </Button>

          <Button
            className="w-full"
            variant="destructive"
            onClick={() => {
              if (selectedOption === "cv-create") {
                router.push("/cv-create");
              } else {
                router.push("/cv-import");
              }
            }}
          >
            Crear CV
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="ml-1 size-5"
            >
              <path
                fillRule="evenodd"
                d="M9 4.5a.75.75 0 0 1 .721.544l.813 2.846a3.75 3.75 0 0 0 2.576 2.576l2.846.813a.75.75 0 0 1 0 1.442l-2.846.813a3.75 3.75 0 0 0-2.576 2.576l-.813 2.846a.75.75 0 0 1-1.442 0l-.813-2.846a3.75 3.75 0 0 0-2.576-2.576l-2.846-.813a.75.75 0 0 1 0-1.442l2.846-.813A3.75 3.75 0 0 0 7.466 7.89l.813-2.846A.75.75 0 0 1 9 4.5ZM18 1.5a.75.75 0 0 1 .728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 0 1 0 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 0 1-1.456 0l-.258-1.036a2.625 2.625 0 0 0-1.91-1.91l-1.036-.258a.75.75 0 0 1 0-1.456l1.036-.258a2.625 2.625 0 0 0 1.91-1.91l.258-1.036A.75.75 0 0 1 18 1.5ZM16.5 15a.75.75 0 0 1 .712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 0 1 0 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 0 1-1.422 0l-.395-1.183a1.5 1.5 0 0 0-.948-.948l-1.183-.395a.75.75 0 0 1 0-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0 1 16.5 15Z"
                clipRule="evenodd"
              />
            </svg>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
