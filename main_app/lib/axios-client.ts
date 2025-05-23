import axios from "axios";

export const resumeBackendAxiosClient = axios.create({
  baseURL: new URL(process.env.PROTOCOL_BE_URL as string).toString(),
  timeout: 1000,
});
