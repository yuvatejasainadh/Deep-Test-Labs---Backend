import axios from "axios";

export const runPerformanceTests = async (baseUrl) => {
  try {
    const response = await axios.post(
      "http://localhost:5001/runner/run-performance",
      {
        targetUrl: baseUrl,
      }
    );

    return response.data.summary;
  } catch (error) {
    console.error("Performance Runner Error:", error.message);
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "Performance runner failed"
    );
  }
};
