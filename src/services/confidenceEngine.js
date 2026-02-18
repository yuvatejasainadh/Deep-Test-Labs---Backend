export const calculateReleaseConfidence = (results) => {
  const ui = results.ui || {};
  const api = results.api || {};
  const perf = results.performance || {};

  // UI Score
  const uiScore =
    ui.total > 0 ? Math.round((ui.passed / ui.total) * 100) : 0;

  // API Score
  const apiScore =
    api.total > 0 ? Math.round((api.passed / api.total) * 100) : 0;

  // Performance Score
  let perfScore = 100;

  if (perf.failureRate > 0.05) perfScore -= 40;
  if (perf.avgResponseTime > 1000) perfScore -= 30;
  else if (perf.avgResponseTime > 500) perfScore -= 15;

  perfScore = Math.max(0, perfScore);

  // Weighted score
  const confidence =
    uiScore * 0.4 +
    apiScore * 0.3 +
    perfScore * 0.3;

  // Risk classification
  let risk = "High";
  if (confidence >= 80) risk = "Low";
  else if (confidence >= 60) risk = "Medium";

  return {
    uiScore,
    apiScore,
    perfScore,
    confidence: Math.round(confidence),
    risk,
  };
};
