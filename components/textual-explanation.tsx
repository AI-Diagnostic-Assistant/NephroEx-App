"use client";

import {Explanation} from "@/lib/types";
import ReactMarkdown from "react-markdown";

interface TextualExplanationProps {
    explanation: Explanation;
}

export default function TextualExplanation(props: TextualExplanationProps) {
    const { explanation } = props;

        return (
            <div className="bg-primary-foreground px-3 py-2 rounded-lg text-foreground w-full">
                {explanation.description && (
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Reasoning</h3>
                        <div className="prose prose-sm w-full max-w-none">
                            <ReactMarkdown>{explanation.description}</ReactMarkdown>
                        </div>
                    </div>
                )}
            </div>
        )
}