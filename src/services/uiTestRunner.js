import axios from "axios";

const RUNNER_BASE_URL = process.env.RUNNER_BASE_URL;
const RUNNER_SECRET = process.env.RUNNER_SECRET;

export const runUITests = async (baseUrl) => {
  try {
    const response = await axios.post(
      `${RUNNER_BASE_URL}/runner/run-ui`,
      { baseUrl },
      {
        headers: {
          "x-runner-key": RUNNER_SECRET, // 🔐 required for auth
          "Content-Type": "application/json",
        },
        timeout: 120000, // UI tests may take time
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "UI Runner Error:",
      error.response?.data || error.message
    );
    throw new Error("UI runner failed");
  }
};
