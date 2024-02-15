import React, { useMemo } from "react";
import wordsData from "../../Data/wordCollection.json"; // Adjust the path accordingly

const HighlightedText = ({ content,selectedText, setSelectedText, item,serachWord,setAnchorEl}) => {
  //  const wordsData={'no':""}
  const removePunctuation = (word) => {
    // Remove common punctuation marks
    return word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "");
  };

  const removeQuotes = (word) => {
    // Remove quotes at the beginning and end of the word
    return word.replace(/^['"]|['"]$/g, "");
  };

  // Function to handle text selection
  const handleWordClick = (e,id, word) => {
    const container = document.getElementById("message" + id);
    const selection = word
    
    
    const highlightText = selection.toString().trim();
    console.log(selectedText,'ss',!selectedText)
    if (highlightText && !selectedText) {
      setSelectedText({ id, highlightText });
      serachWord(highlightText);
      // handleClick(e)
      setAnchorEl(e.currentTarget)     
       console.log(highlightText,"hhhh")
    }
    
  };

  const highlightedContent = useMemo(() => {
    const words = content.split(/\s+/);

    return words.map((word, index) => {
      // Remove quotes before checking for highlights
      const cleanedWord = removeQuotes(removePunctuation(word));

      return (
        <React.Fragment key={index}>
          {wordsData[cleanedWord.toLowerCase()] ? (
            <span className={"highlight"} onClick={(e) => { handleWordClick(e,item?._id, word) }}>
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
