"use client";

import ReactMarkdown from "react-markdown";
import { Badge } from "@/components/ui/badge";
import { BrainIcon } from "lucide-react";
import { cn, isLeftKidney } from "@/lib/utils";

interface TextualExplanationProps {
  description: string;
  kidneyLabel: "left" | "right" | "default";
}

export default function TextualExplanation(props: TextualExplanationProps) {
  const { description, kidneyLabel } = props;

  return (
    <div className="bg-primary-foreground px-3 py-2 rounded-lg text-foreground w-full">
      {/*<h3 className="text-lg font-semibold mb-2">Reasoning</h3>*/}
      <div className="flex items-start gap-2.5">
        <div
          className={cn(
            isLeftKidney(kidneyLabel)
              ? "bg-background-blue"
              : "bg-background-purple",
            "rounded-full p-3",
          )}
        >
          <BrainIcon
            size={16}
            className={
              isLeftKidney(kidneyLabel)
                ? "text-primary-blue"
                : "text-primary-purple"
            }
          />
        </div>
        <div>
          <Badge variant={kidneyLabel} className="uppercase">
            {kidneyLabel} KIDNEY AI EXPLANATIONS
          </Badge>
          <div className="prose prose-sm w-full max-w-none pl-1">
            <ReactMarkdown>{description}</ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
}
