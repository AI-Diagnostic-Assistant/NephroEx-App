"use client";

import React from "react";
import { TypeAnimation } from "react-type-animation";

export default function TypewriterComponent() {
  return (
    <div className="containerTypewriter">
      <TypeAnimation
        sequence={[
          "Welcome to AIDA - AI Diagnostic Assistant",
          1000,
          "Make diagnosis of dynamic renal scintigraphy images with ease",
          1000,
          "Get accurate classifications of chronic kidney disease stages",
          1000,
          "Use it as a tool for making more accurate diagnosis",
        ]}
        repeat={Infinity}
      />
    </div>
  );
}
