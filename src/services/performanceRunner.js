import axios from "axios";

const RUNNER_BASE_URL = process.env.RUNNER_BASE_URL;

export const runPerformanceTests = async (baseUrl) => {
  try {
    const response = await axios.post(
      `${RUNNER_BASE_URL}/runner/run-performance`,
      { targetUrl: baseUrl }
    );
    return response.data.summary;
  } catch (error) {
    console.error("Performance Runner Error:", error.message);
    throw new Error("Performance runner failed");
  }
};
