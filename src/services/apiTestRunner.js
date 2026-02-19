import axios from "axios";

const RUNNER_BASE_URL = process.env.RUNNER_BASE_URL;

export const runAPITests = async (apiBaseUrl, endpoints = []) => {
  try {
    const response = await axios.post(
      `${RUNNER_BASE_URL}/runner/run-api`,
      { apiBaseUrl, endpoints }
    );
    return response.data.summary;
  } catch (error) {
    console.error("API Runner Error:", error.message);
    throw new Error("API runner failed");
  }
};
