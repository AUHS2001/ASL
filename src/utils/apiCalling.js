import { API_URL } from "@/constant/ApiUrl";
import axios from "axios";
import { toast } from "react-toastify";

// Function to fetch all chat messages
export const getAllChat = async (user, selectedScenario) => {
  try {
    const response = await axios.post(`${API_URL}/chat/get_conversation`, {
      user_id: user?.id,
      scenario_id: selectedScenario?._id,
    });
    if (response?.data?.status_code === 200) {
      return response.data;
    }
  } catch (error) {

    toast.error("Something Went Wrong!");
    console.error("Error getAllChat", error);
  }
};


export const submitFeedback = async (type, messageId, feedBack, additional = "") => {
  try {
    const response = await axios({
      url: `${API_URL}/chat/submit_feedback`,
      method: "POST",
      data: {
        chat_id: messageId,
        feedback_type: type,
        feedback: feedBack,
        additional_feedback: additional
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

export const chatReview = async (ai_msg, user_msg) => {
  try {
    const response = await axios({
      url: `${API_URL}/chat/review_reply`,
      method: "POST",
      data: {
        ai_msg,
        user_msg
      },
    });
    console.log("Chat Review Reply===>", response.data);
    if (response?.data?.status_code === 200) {
      return response
    } else {
      toast.error(response?.data?.message);
    }
  } catch (error) {
    console.error("Chat Review Reply", error);
    toast.error("Something Went Wrong!");
  }
}

export const searchVideoLookup = async (highlightText) => {

  try {
    const res = await axios.post(`${API_URL}/chat/video_lookup`, {
      context: highlightText,
    });
    if (res?.data?.status_code == 200) {
      return res
    } else {
      toast.warn("Select again this word");

    }
  } catch (err) {
    toast.error("Something Went Wrong!");
    console.error(err);
  }
};

// Function to send message to the server
export const sendMessage = async (inputMsg,user,selectedScenario) => {
  try {
    const res = await axios.post(`${API_URL}/chat/conversation`, {
      user_msg: inputMsg,
      user_id: user?.id,
      scenario_id: selectedScenario._id,
      scene_id: selectedScenario.scene_id,
    });
    if (res?.data?.status_code == 200) {
      return res;

    } else {
      toast.error("Something Went Worng!");
      return null;
    }
  } catch (err) {
    console.error(err);
    toast.error("Something Went Worng!");

  }
};

// Function to convert message using ASL conversion
export const messageConversion = async (message,user,selectedScenario) => {
  try {
    const res = await axios.post(`${API_URL}/chat/asl_conversion`, {
      user_msg: message,
      user_id: user?.id,
      scenario_id: selectedScenario._id,
      scene_id: selectedScenario.scene_id,
    });
    if (res?.data?.status_code == 200) {
      return res;

    } else {
      toast.error("Something Went Worng!");
    }
  } catch (err) {
    console.error(err);
  }
};