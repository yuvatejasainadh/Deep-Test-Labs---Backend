import axios from "axios";


export const runAPITests = async (apiBaseUrl, endpoints = []) => {
  let passed = 0;
  let failed = 0;
  let totalTime = 0;

  const details = [];

  for (const endpoint of endpoints) {
    const url = endpoint.startsWith("http")
      ? endpoint
      : `${apiBaseUrl}${endpoint.startsWith("/") ? endpoint : "/" + endpoint}`;

    try {
      const start = Date.now();
      const response = await axios.get(url);
      const duration = Date.now() - start;

      totalTime += duration;

      if (response.status >= 200 && response.status < 300) {
        passed++;
        details.push({ endpoint: url, status: "passed", duration });
      } else {
        failed++;
        details.push({ endpoint: url, status: "failed", duration });
      }
    } catch (error) {
      failed++;
      details.push({
        endpoint: url,
        status: "failed",
        error: error.message,
      });
    }
  }

  const total = endpoints.length;
  const avgResponseTime = total ? Math.round(totalTime / total) : 0;

  return {
    total,
    passed,
    failed,
    avgResponseTime,
    details,
  };
};
