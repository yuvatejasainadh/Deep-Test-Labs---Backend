import axios from "axios";

export const runUITests = async (baseUrl) => {
  try {
    const response = await axios.post(
      "http://localhost:5001/runner/run-ui",
      { baseUrl }
    );

    return response.data;
  } catch (error) {
    console.error("UI Runner Error:", error.message);
    throw new Error(
      error.response?.data?.message || error.message || "UI runner failed"
    );
  }
};
