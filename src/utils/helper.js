import { toast } from "react-toastify";

export const copyContent = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    toast.success("Message is Coiped!");
  } catch (err) {
    console.error("Failed to copy: ", err);
  }
};

export const checkCase = (str) => {
  if (str === str.toUpperCase()) {
    return "Uppercase";
  } else if (str === str.toLowerCase()) {
    return "Lowercase";
  } else {
    return "Mixed case";
  }
};

