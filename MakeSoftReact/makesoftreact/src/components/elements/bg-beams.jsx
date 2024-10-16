"use client";
import React from "react";
import { BackgroundBeams } from "../ui/background-beams-with-collision";
import './bg-beams.css'; // Import the CSS file

export function BackgroundBeamsDemo() {
  return (
    
    <div className="bg-beams-container">
      <div className="bg-beams-content">
        <h1 className="bg-beams-title">
          Student Rating program
        </h1>
        <p></p>
          <button className="button-container">
          <span className="button-background" />
          <span className="button-content">
            Border Magic
          </span>
</button>
        
      </div>
      <BackgroundBeams />
    </div>
  );
}
