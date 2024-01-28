// Importing the NextResponse object from the "next/server" module
import { NextResponse } from "next/server";

// Importing the word collection data from a JSON file
import wordsData from "../../../../Data/wordCollection.json"; // Adjust the path accordingly

// Handling POST requests to the API endpoint
export async function POST(req, res) {
  try {
    // Extracting the "word" parameter from the request body
    const { word } = await req.json();

    // Checking if the "word" parameter is missing
    if (!word) {
      return NextResponse.json({
        data: {
          error: "Word parameter is required",
          status_code: 400,
        },
      });
    }

    // Converting the input word to lowercase for case-insensitive comparison
    const lowercaseWord = word.toLowerCase();

    // Checking if the lowercase word exists in the word collection data
    const isWordInCollection = wordsData[lowercaseWord];

    // Logging the result for debugging purposes
    console.log(isWordInCollection);

    // Responding with JSON based on whether the word is in the collection or not
    if (isWordInCollection) {
      return NextResponse.json({
        data: {
          isWord: true,
          videolookupUrl: isWordInCollection,
          status_code: 200,
        },
      });
    } else {
      return NextResponse.json({
        data: { isWord: false, status_code: 404 },
      });
    }
  } catch (err) {
    // Handling errors and responding with a generic 500 status code
    console.log(err);
    return NextResponse.json({
      data: { error: "", status_code: 500 },
    });
  }
}
