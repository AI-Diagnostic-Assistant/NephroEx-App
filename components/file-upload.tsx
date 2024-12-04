"use client";

import { useState, ChangeEvent } from "react";
import { CompositeImage } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function FileUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");

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
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data: CompositeImage = await response.json();

      setImageUrl(data.imageUrl);
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

      {imageUrl && (
        <div>
          <h3>Processed Image:</h3>
          <img src={imageUrl} alt="Composite" />
        </div>
      )}
    </div>
  );
}
