


const SearchList = ({ results, setInputMessage,handleMsgSend }) => {
  const handleClick = (e, word) => {
    e.preventDefault();
    setInputMessage(word);
    handleMsgSend(word)
  };
  return (
    <div className="results-list">
      {results.map((result,ind) => {
        return (
          <div
          key={"serach-res"+ind}
            className="search-result"
            onClick={(e) => handleClick(e, result)}
          >
            {result}
          </div>
        );
      })}
    </div>
  );
};

export default SearchList;
