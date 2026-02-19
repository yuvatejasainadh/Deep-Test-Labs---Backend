import axios from "axios";

export const runAPITests = async (apiBaseUrl, endpoints = []) => {
  try {
    const response = await axios.post(
      "http://localhost:5001/runner/run-api",
      {
        apiBaseUrl,
        endpoints,
      }
    );

    return response.data.summary;
  } catch (error) {
    console.error("API Runner Error:", error.message);
    throw new Error(
      error.response?.data?.message || error.message || "API runner failed"
    );
  }
};
