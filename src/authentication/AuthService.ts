import axios, { AxiosError, AxiosHeaders, AxiosResponse } from "axios";

const API_URL = "https://java.suken.io/";

class AuthService {
  login(email: string, password: string): Promise<AxiosResponse | AxiosError> {
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
        .catch((error: AxiosError) => {
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

  register(
    email: string,
    password: string
  ): Promise<AxiosResponse | AxiosError> {
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
            console.debug(error);
            reject(error);
          });
      }, 1500);
    });
  }

  getCurrentUser() {
    return localStorage.getItem("user");
  }

  private manageError(error: AxiosError) {
    if (error.response && error.response.status === 401) {
      console.debug(
        "Unauthorized, probably due to token expiration, logging out."
      );
      this.logout();
      return;
    }
    console.error(error);
  }

  private addToken(headers: AxiosHeaders){
    const token = localStorage.getItem("token");
    if (token) {
      headers["Authorization"] = "Bearer " + token;
    }
  }

  get(url: string, headers: AxiosHeaders): Promise<AxiosResponse | AxiosError> {
    this.addToken(headers);
    return new Promise((resolve, reject) => {
      axios
        .get(API_URL + url, { headers: headers })
        .then((response: AxiosResponse) => {
          resolve(response);
        })
        .catch((error: AxiosError) => {
          this.manageError(error);
          reject(error);
        });
    });
  }

  post(url: string, data: any, headers: AxiosHeaders): Promise<AxiosResponse | AxiosError> {
    this.addToken(headers);
    return new Promise((resolve, reject) => {
      axios
        .post(API_URL + url, data, { headers: headers })
        .then((response: AxiosResponse) => {
          resolve(response);
        })
        .catch((error: AxiosError) => {
          this.manageError(error);
          reject(error);
        });
    });
  }

  put(url: string, data: any, headers: AxiosHeaders): Promise<AxiosResponse | AxiosError> {
    this.addToken(headers);
    return new Promise((resolve, reject) => {
      axios
        .put(API_URL + url, data, { headers: headers })
        .then((response: AxiosResponse) => {
          resolve(response);
        })
        .catch((error: AxiosError) => {
          this.manageError(error);
          reject(error);
        });
    });
  }

}

const service = new AuthService();
export default service;
