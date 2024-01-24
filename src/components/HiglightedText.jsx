import { useMemo } from "react";

const HighlightedText = ({content}) => {
  const highlights = ["YOU", "MORE", "CAN", "YES","WHAT","YOUR","HOW"];
  const highlightedContent = useMemo(() => {
    const words = content.split(/\s+/);

    return words.map((word, index) => (
      <span
        key={index}
        className={highlights.includes(word) ? "highlight" : ""}
      >
        {word}{" "}
      </span>
    ));
  }, [content, highlights]);

  return (
    <div>
    
      {highlightedContent}
    </div>
  );
};

export default HighlightedText;
