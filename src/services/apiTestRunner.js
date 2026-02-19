import axios from "axios";

const RUNNER_BASE_URL = process.env.RUNNER_BASE_URL;
const RUNNER_SECRET = process.env.RUNNER_SECRET;

export const runAPITests = async (apiBaseUrl, endpoints = []) => {
  try {
    const response = await axios.post(
      `${RUNNER_BASE_URL}/runner/run-api`,
      { apiBaseUrl, endpoints },
      {
        headers: {
          "x-runner-key": RUNNER_SECRET, // 🔐 required for auth
          "Content-Type": "application/json",
        },
        timeout: 60000, // prevent hanging if runner is slow
      }
    );

    return response.data.summary;
  } catch (error) {
    console.error(
      "API Runner Error:",
      error.response?.data || error.message
    );
    throw new Error("API runner failed");
  }
};
