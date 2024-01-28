import { API_URL } from "@/constant/ApiUrl";
import axios from "axios";
import { toast } from "react-toastify";

export const submitMsgFeedback = async (messageId, feedBack) => {
  try {
    const response = await axios({
      url: `${API_URL}/chat/submit_message_feedback`,
      method: "POST",
      data: {
        chat_id: messageId,
        message_feedback: feedBack,
      },
    });
    console.log("submitMsgFeedback", response.data);
    if (response?.data?.status_code === 200) {
      // toast.success("Feedback is Submited!");
    }
    else{
        toast.error(response?.data?.message);
    }
  } catch (error) {
    console.error("Error submitMsgFeedback", error);
    toast.error("Something Went Wrong!");
  }
};
export const submitFeedback = async (type,messageId,feedBack) => {
  try {
    const response = await axios({
      url: `${API_URL}/chat/submit_feedback`,
      method: "POST",
      data: {
        chat_id: messageId,
        feedback_type:type,
        feedback: feedBack,
      },
    });
    console.log("submitMsgFeedback", response.data);
    if (response?.data?.status_code === 200) {
      // toast.success("Feedback is Submited!");
    }
    else{
        toast.error(response?.data?.message);
    }
  } catch (error) {
    console.error("Error submitMsgFeedback", error);
    toast.error("Something Went Wrong!");
  }
};

export const unSubmitFeedback = async (type,messageId,feedBack) => {
  try {
    const response = await axios({
      url: `${API_URL}/chat/unsubmit_feedback`,
      method: "POST",
      data: {
        chat_id: messageId,
        feedback_type:type,
      },
    });
    console.log("submitMsgFeedback", response.data);
    if (response?.data?.status_code === 200) {
      // toast.success("Feedback is Submited!");
    }
    else{
        toast.error(response?.data?.message);
    }
  } catch (error) {
    console.error("Error submitMsgFeedback", error);
    toast.error("Something Went Wrong!");
  }
};


export const submitTranslationFeedback = async (messageId, feedBack) => {
  try {
    const response = await axios({
      url: `${API_URL}/chat/submit_translation_feedback`,
      method: "POST",
      data: {
        chat_id: messageId,
        translation_feedback: feedBack,
      },
    });
    console.log("submitMsgFeedback", response.data);
    if (response?.data?.status_code === 200) {
      // toast.success("Feedback is Submited!");
    }
    else{
        toast.error(response?.data?.message);
    }
  } catch (error) {
    toast.error("Something Went Wrong!");
    console.error("Error submitMsgFeedback", error);
  }
};
