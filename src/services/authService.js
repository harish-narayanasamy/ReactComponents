import http from "./httpService";
//import { apiUrl } from "../config.json";
import JwtDecode from "jwt-decode";

const apiEndPoint = "/auth";
const tokenKey = "token";

http.setJwt(getJwt());
async function login(email, password) {
  const { data: jwt } = await http.post(apiEndPoint, {
    email: email,
    password: password,
  });

  localStorage.setItem(tokenKey, jwt);
}
async function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}
function logout() {
  localStorage.removeItem(tokenKey);
}

function getCurentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return JwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}
function getJwt() {
  try {
    return localStorage.getItem(tokenKey);
  } catch (ex) {
    return null;
  }
}
export default {
  login,
  logout,
  getCurentUser,
  loginWithJwt,
  getJwt,
};
