import CloseModal from "@/components/close-modal";
import Link from "next/link";

export default function Page() {
  return (
    <div className="fixed inset-0 bg-foreground/20 z-10">
      <div className="container flex items-center h-full max-w-lg mx-auto">
        <div className="relative bg-white w-full h-fit py-20 px-2 rounded-lg">
          <div className="absolute top-4 right-4">
            <CloseModal />
          </div>
          Create
          <Link href="/cv-options">IR</Link>
        </div>
      </div>
    </div>
  );
}
