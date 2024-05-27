import axios, { AxiosError, AxiosResponse } from "axios";

const API_URL = "https://java.suken.io/";

class AuthService {
  login(email : string, password : string) {
    return new Promise((resolve, reject) => {
        axios
          .post(API_URL + "login", {
            email,
            password,
          })
          .then((response: AxiosResponse) => {
            localStorage.setItem("user", response.data.email);
            localStorage.setItem("token", response.data.token);
            resolve(response);
          })
          .catch((error : AxiosError) => {
            console.log(error);
            reject(error);
          });
    });
  }

  logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.href = "/login";
  }

  register(email : string, password : string) {
    return new Promise((resolve, reject) => {
      setTimeout(function () {
        axios
          .post(API_URL + "signup", {
            email: email,
            password: password,
          })
          .then((response: AxiosResponse) => {
            resolve(response);
          })
          .catch((error: AxiosError) => {
            console.log(error);
            reject(error);
          });
      }, 1500);
    });
  }

  getCurrentUser() {
    return localStorage.getItem("user");
  }
}

export default new AuthService();
