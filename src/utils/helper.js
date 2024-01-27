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
  const isUpperCase = /^[A-Z]+$/.test(str);
  const isLowerCase = /^[a-z]+$/.test(str);

  if (isUpperCase) {
    console.log("Message is", "Uppercase");
    return "Uppercase";
  } else if (isLowerCase) {
    console.log("Message is", "Lowercase");

    return "Lowercase";
  } else {
    return "Mixed case";
  }
};
