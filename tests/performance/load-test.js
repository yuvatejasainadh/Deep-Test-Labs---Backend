import http from "k6/http";
import { sleep } from "k6";

export const options = {
  vus: 20,       // virtual users
  duration: "10s",
};

export default function () {
  const baseUrl = __ENV.TARGET_URL;

  if (!baseUrl) {
    throw new Error("TARGET_URL not provided");
  }

  http.get(baseUrl);
  sleep(1);
}
