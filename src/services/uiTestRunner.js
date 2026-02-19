import axios from "axios";

const RUNNER_BASE_URL = process.env.RUNNER_BASE_URL;

export const runUITests = async (baseUrl) => {
  try {
    const response = await axios.post(
      `${RUNNER_BASE_URL}/runner/run-ui`,
      { baseUrl }
    );
    return response.data;
  } catch (error) {
    console.error("UI Runner Error:", error.message);
    throw new Error("UI runner failed");
  }
};
