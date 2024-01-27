import React,{ useMemo } from "react";

const HighlightedText = ({ content }) => {
  const highlights = [
    "HELLO",
    "YOU",
    "MORE",
    "CAN",
    "YES",
    "WHAT",
    "YOUR",
    "HOW",
    "THIS IS NEW ANSWER",
  ];

  const removePunctuation = (word) => {
    // Remove common punctuation marks
    return word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "");
  };

  const removeQuotes = (word) => {
    // Remove quotes at the beginning and end of the word
    return word.replace(/^['"]|['"]$/g, "");
  };

  const highlightedContent = useMemo(() => {
    const words = content.split(/\s+/);

    return words.map((word, index) => {
      // Remove quotes before checking for highlights
      const cleanedWord = removeQuotes(removePunctuation(word));

      return (
        <React.Fragment key={index}>
          {highlights.includes(cleanedWord.toUpperCase()) ? (
            <span className={"highlight"}>{word}</span>
          ) : (
            word + " "
          )}
        </React.Fragment>
      );
    });
  }, [content, highlights]);

  return <>{highlightedContent}</>;
};

export default HighlightedText;