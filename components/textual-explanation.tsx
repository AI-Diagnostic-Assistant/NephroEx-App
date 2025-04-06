"use client";

import ReactMarkdown from "react-markdown";
import { Badge } from "@/components/ui/badge";
import { BrainIcon } from "lucide-react";
import { isLeftKidney } from "@/lib/utils";

interface TextualExplanationProps {
  description: string;
  kidneyLabel: "left" | "right" | "default";
}

export default function TextualExplanation(props: TextualExplanationProps) {
  const { description, kidneyLabel } = props;

  // Define your custom hex colors
  const leftKidneyColor = {
    icon: "#0e3893",
  };

  const rightKidneyColor = {
    icon: "#E36E0DFF",
  };

  const kidneyColors = isLeftKidney(kidneyLabel)
    ? leftKidneyColor
    : rightKidneyColor;

  return (
    <div className="px-3 py-2 rounded-lg w-full bg-primary-foreground text-foreground">
      <div className="flex items-start gap-2.5">
        <div className="rounded-full p-3">
          <BrainIcon size={16} style={{ color: kidneyColors.icon }} />
        </div>
        <div>
          <Badge variant={kidneyLabel} className="uppercase">
            TEXTUAL DESCRIPTION
          </Badge>
          <div className="prose prose-sm w-full max-w-none pl-1 mt-2">
            <ReactMarkdown>{description}</ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
}
