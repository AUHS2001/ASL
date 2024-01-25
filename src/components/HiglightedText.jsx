import { useMemo } from "react";

const HighlightedText = ({ content }) => {
  const highlights = ["YOU", "MORE", "CAN", "YES", "WHAT", "YOUR", "HOW","THIS IS NEW ANSWER"];
  const highlightedContent = useMemo(() => {
    const words = content.split(/\s+/);

    return words.map((word, index) => (
      <>
        {highlights.includes(word.toUpperCase()) ? (
          <span key={index} className={"highlight"}>
            {word}
          </span>
        ) : (
          word + " "
        )}
      </>
    ));
  }, [content, highlights]);

  return <>{highlightedContent}</>;
};

export default HighlightedText;
