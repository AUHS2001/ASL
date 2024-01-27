// const dateString = "2024-01-27T11:43:04.005000";

export const formatStringToTime = (dateString) => {
  try {
    // Create a Date object from the string
    const dateObject = new Date(dateString);

    // Format the time with AM/PM using toLocaleTimeString
    const formattedTime = dateObject.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    return formattedTime;
  } catch (err) {
    console.error(err);
    return "N/A";
  }
};
