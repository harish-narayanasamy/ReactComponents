import http from "./httpService";
//import { apiUrl } from "../config.json";

const apiEndPoint = "/genres";

export function getGenres() {
  return http.get(apiEndPoint);
}
