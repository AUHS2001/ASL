"use server";
import WordList from "../../Data/wordCollection.json";

export async function searchWord(keyword) {
  // ...
  console.log("server----");
  const results = Object.keys(WordList).filter((user) => {
    return  (keyword && user.toLowerCase().includes(keyword) || keyword == user ? keyword : null );
  });

  return results.splice(0, 20);
}
