"use client";

import React from "react";
import { TypeAnimation } from "react-type-animation";

export default function TypewriterComponent() {
  return (
    <div className="containerTypewriter">
      <TypeAnimation
        sequence={[
          "Welcome to NephroEx - an AI driven Computer Aided Diagnosis tool for detection of obstructive uropathy",
          1000,
          "Make diagnosis of renal obstruction only by uploading a diuretic renography scan",
          1000,
          "Get accurate classifications of obstructive uropathy",
          1000,
          "See how the AI model came to a classification decision",
          1000,
          "Use it as a tool for making more accurate diagnosis",
        ]}
        repeat={Infinity}
      />
    </div>
  );
}
