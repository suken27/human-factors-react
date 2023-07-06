import axios from "axios";

const API_URL = "http://java.suken.io/";

class AuthService {
  login(email, password) {
    return axios
      .post(API_URL + "login", {
        email,
        password,
      })
      .then((response) => {
        localStorage.setItem("user", response.data.user);
        localStorage.setItem("token", response.data.token);
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  }

  register(email, password) {
    return axios.post("signup", {
      email: email,
      password: password,
    });
  }

  getCurrentUser() {
    return localStorage.getItem("user");
  }

}

export default new AuthService();
