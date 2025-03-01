"use client";
import { useState } from "react";

import { Button } from "./ui/button";
import AuthNote from "./auh-note";

const NoteSection = () => {
  const [showAuthNote, setShowAuthNote] = useState(false);

  return (
    <>
      {/* AuthNote Always Visible on MD+ Screens */}
      <div className="hidden md:block absolute right-4 bottom-4">
        <AuthNote />
      </div>

      {/* Mobile View: Toggle Button & Closeable AuthNote */}
      <div className="absolute right-4 bottom-4 md:hidden">
        {showAuthNote ? (
          <div className="relative">
            <AuthNote />
            {/* Close Button */}
            <Button
              variant="ghost"
              className="absolute -top-1 -right-1 w-6 h-6 p-2 text-sm bg-black text-white hover:bg-gray-700 hover:text-white"
              onClick={() => setShowAuthNote(false)}
            >
              ✖
            </Button>
          </div>
        ) : (
          <Button variant="default" onClick={() => setShowAuthNote(true)} className="animate-bounce">
            Postscript
          </Button>
        )}
      </div>
    </>
  );
};

export default NoteSection;
