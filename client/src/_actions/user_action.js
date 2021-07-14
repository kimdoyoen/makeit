import axios from "axios";
import { LOGIN_USER, REGISTER_USER, AUTH_USER } from "./types";

export function loginUser(dataToSubmit, type) {
  switch (type) {
    case "google":
      var request = axios
       .post("/api/oauth/google/login", dataToSubmit)
       .then((response) => response.data);
      break;
  
    default:
       var request = axios
       .post("/api/user/login", dataToSubmit)
       .then((response) => response.data);
       break;
  }
  return {
    type: LOGIN_USER,
    payload: request,
  };
}

export function registerUser(dataToSubmit) {
  const request = axios
    .post("/api/user/register", dataToSubmit)
    .then((response) => response.data);

  return {
    type: REGISTER_USER,
    payload: request,
  };
}

export function auth() {
  const request = axios.get("/api/user/auth").then((response) => response.data);

  return {
    type: AUTH_USER,
    payload: request,
  };
}
