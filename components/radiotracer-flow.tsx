"use client";

import Image from "next/image";
import React, { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Image as ImageIcon } from "lucide-react";
import ModuleCard from "@/components/module-card";

interface RadioTracerFlowProps {
  summedFramesSignedUrls: {
    error: string | null;
    path: string | null;
    signedUrl: string;
  }[];
  publicUrl: string | null;
}
export default function RadioTracerFlow(props: RadioTracerFlowProps) {
  const { summedFramesSignedUrls, publicUrl } = props;

  const [showROI, setShowROI] = useState(true);

  return (
    <ModuleCard
      title="Radiotracer Flow"
      icon={<ImageIcon className="text-primary-brand" />}
    >
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Switch
            checked={showROI}
            onCheckedChange={setShowROI}
            className="data-[state=checked]:bg-primary-brand"
          />
          <span className="text-xs">Show ROI Contour</span>
        </div>
        <div className="flex gap-1 flex-wrap">
          {summedFramesSignedUrls?.map((signedUrl, index) => (
            <div key={index} className="relative">
              <Image
                src={signedUrl.signedUrl}
                alt="Excretion timeline"
                width={144}
                height={144}
              />
              {showROI && publicUrl && (
                <Image
                  src={publicUrl}
                  alt="ROI contour"
                  fill
                  className="absolute top-0 left-0 z-50"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </ModuleCard>
  );
}
