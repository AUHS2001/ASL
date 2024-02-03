import React, { useMemo } from "react";
import wordsData from "../../Data/wordCollection.json"; // Adjust the path accordingly

const HighlightedText = ({ content, setSelectedText }) => {
  //  const wordsData={'no':""}
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
          {wordsData[cleanedWord.toLowerCase()] ? (
            <span className={"highlight"}>
              {word}
            </span>
          ) : (
            word + " "
          )}
        </React.Fragment>
      );
    });
  }, [content]);

  return <>{highlightedContent}</>;
};

export default HighlightedText;
