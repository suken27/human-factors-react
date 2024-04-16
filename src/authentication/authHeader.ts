export default function authHeader() : { [key: string]: string } {
  const token = localStorage.getItem("token");

  if (token) {
    return { Authorization: "Bearer " + token };
  } else {
    return {};
  }
}
