import axios from "axios";

const RUNNER_BASE_URL = process.env.RUNNER_BASE_URL;
const RUNNER_SECRET = process.env.RUNNER_SECRET;

export const runPerformanceTests = async (baseUrl) => {
  try {
    const response = await axios.post(
      `${RUNNER_BASE_URL}/runner/run-performance`,
      { targetUrl: baseUrl },
      {
        headers: {
          "x-runner-key": RUNNER_SECRET, // 🔐 auth header for runner
          "Content-Type": "application/json",
        },
        timeout: 120000, // performance tests may take longer
      }
    );

    return response.data.summary;
  } catch (error) {
    console.error(
      "Performance Runner Error:",
      error.response?.data || error.message
    );
    throw new Error("Performance runner failed");
  }
};
