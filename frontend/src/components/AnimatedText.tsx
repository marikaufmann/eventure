import { useEffect, useState } from "react";

const AnimatedText = ({ text }: { text: string }) => {
  const [animatedText, setAnimatedText] = useState<string[]>([]);

  useEffect(() => {
    const textArray = text.split("");
    setAnimatedText(textArray);
  }, [text]);

  return (
    <div className="animated-text-container">
      {animatedText.map((char, index) => (
        <span
          key={index}
          className={`animated-char ${char === " " ? "space" : ""}`}
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          {char 
          }
        </span>
      ))}
    </div>
  );
};

export default AnimatedText;
