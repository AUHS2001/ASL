import { API_URL } from "@/constant/ApiUrl";
import axios from "axios";
import { toast } from "react-toastify";

export const submitFeedback = async (type, messageId, feedBack,additional="") => {
  try {
    const response = await axios({
      url: `${API_URL}/chat/submit_feedback`,
      method: "POST",
      data: {
        chat_id: messageId,
        feedback_type: type,
        feedback: feedBack,
        additional_feedback:additional
      },
    });
    console.log("submitMsgFeedback", response.data);
    if (response?.data?.status_code === 200) {
      // toast.success("Feedback is Submited!");
    } else {
      toast.error(response?.data?.message);
    }
  } catch (error) {
    console.error("Error submitMsgFeedback", error);
    toast.error("Something Went Wrong!");
  }
};

export const unSubmitFeedback = async (type, messageId, feedBack) => {
  try {
    const response = await axios({
      url: `${API_URL}/chat/unsubmit_feedback`,
      method: "POST",
      data: {
        chat_id: messageId,
        feedback_type: type,
      },
    });
    console.log("submitMsgFeedback", response.data);
    if (response?.data?.status_code === 200) {
      // toast.success("Feedback is Submited!");
    } else {
      toast.error(response?.data?.message);
    }
  } catch (error) {
    console.error("Error submitMsgFeedback", error);
    toast.error("Something Went Wrong!");
  }
};

export const getScenarioList = async () => {
  try {
    const response = await axios({
      url: `${API_URL}/scenario/get_scenarios`,
      method: "GET",
    });
    console.log("getScenarioList", response.data);
    if (response?.data?.status_code === 200) {
      return response.data;
    } else {
      toast.error(response?.data?.message);
      return null;
    }
  } catch (error) {
    console.error("Error submitMsgFeedback", error);
    toast.error("Something Went Wrong!");
  }
};
