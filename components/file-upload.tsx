"use client";

import { useState, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

export default function FileUpload({ token }: { token: string }) {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://127.0.0.1:5000/classify", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();
      console.log("Upload successful:", data.id);
      router.push(`/analysis/${data.id}`);
    } catch (error) {
      console.error("Upload failed:", error);
      alert("An error occurred during upload.");
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <div>
        <Label htmlFor="picture">DICOM file</Label>
        <Input type="file" accept=".dcm" onChange={handleFileChange} />
      </div>
      <div>
        <Button onClick={handleUpload}>Do analysis</Button>
      </div>
    </div>
  );
}
