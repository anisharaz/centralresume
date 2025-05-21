import axios from "axios";

export const resumeBackendAxiosClient = axios.create({
  baseURL: new URL("http://localhost:4000").toString(),
  timeout: 1000,
});
