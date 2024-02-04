import Chip from "@mui/material/Chip";

const SearchList = ({
  results,
  setInputMessage,
  handleMsgSend,
  setKeyWords,
}) => {
  const handleClick = (e, word) => {
    e.preventDefault();
    setInputMessage(word.toUpperCase());
    setKeyWords([]);
  };
  return (
    <>
      {results.length > 0 ? (
        <div className="results-list">
          {results.map((result, ind) => {
            return (
              <>
                <Chip
                  key={"serach-res" + ind}
                  label={result.toUpperCase()}
                  onClick={(e) => handleClick(e, result)}
                  //   variant="outlined"
                  sx={{ margin: "0px 3px" }}
                />
              </>
            );
          })}
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default SearchList;
