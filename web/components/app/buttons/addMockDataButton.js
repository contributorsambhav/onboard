"use client";
import { Button } from "@/components/ui/button";
import { Sheet } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";

export default function AddMockDataButton({ userId }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleClick = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/recipients/addMock", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });
      const data = await res.json();
      // console.log(data);
      router.refresh();
      router.refresh();
      router.push("/recipients");
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="outline"
      className="text-sm h-8 px-3 font-normal flex justify-center items-center"
      disabled={isLoading}
      onClick={handleClick}
    >
      {isLoading ? (
        <Loader className="animate-spin h-4 w-4" />
      ) : (
        <span className="flex items-center">
          <Sheet className="h-4 w-4 mr-2" />
          Add Mock Data
        </span>
      )}
    </Button>
  );
}
