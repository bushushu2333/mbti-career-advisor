import { useState, useEffect } from "react";

interface TypeWriterProps {
  text: string;
  speed?: number;
}

export function TypeWriter({ text, speed = 8 }: TypeWriterProps) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    if (!text) return;
    let i = 0;
    setDisplayed("");
    const timer = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(timer);
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed]);

  return <span>{displayed}</span>;
}
