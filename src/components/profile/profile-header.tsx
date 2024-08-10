import Image from "next/image";
import { Badge } from "../ui/badge";

export function ProfileHeader({ name }: { name: string | null }) {
  return (
    <div className="w-full h-[13rem] rounded-[3rem] bg-muted p-6 flex gap-4 overflow-hidden">
      <Image
        src="https://cdn.dribbble.com/uploads/47178/original/mercedes-bazan.png?1689174566&format=webp&resize=273x340&vertical=center"
        alt="profile-header"
        width={1920}
        height={400}
        className="w-1/3 h-full object-cover rounded-[2rem]"
      />
      <div className="w-full flex flex-col justify-between gap-1">
        <div>
          <p className="text-foreground font-bold">{name}</p>
          <span className="text-muted-foreground">Illustrator</span>
        </div>
        <div className="w-full flex flex-col sm:flex-row justify-end gap-2 p-4">
          <Badge color="primary">Graphic Design</Badge>
          <Badge variant="outline" className="border-primary">
            Illustration
          </Badge>
        </div>
      </div>
    </div>
  );
}
