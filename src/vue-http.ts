import axios from "axios";

axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common.Accept = "application/json";
axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

const token = "0469b6561106d70834ad";
const user = "kapzuba@gmail.com";

const axiosAlegra = axios.create({
  baseURL: "https://api.example.com",
});

const axiosUnplash = axios.create({
  baseURL: "https://api.unsplash.com",
  headers: {
    "Accept-Version": "v1",
    Authorization: "2VbG1n_CjzPOiY5VaPrhw-Og-FGXwfUEv5ugro5yR28",
  },
});

export { axiosAlegra, axiosUnplash };
