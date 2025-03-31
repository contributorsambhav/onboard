import { LoaderCircle } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <LoaderCircle className="text-neutral-600 m-auto animate-spin w-12 h-12" />
    </div>
  );
}