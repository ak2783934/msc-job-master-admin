import axios from "axios";

export const api = axios.create({
  baseURL: "https://mscjobs-backend.herokuapp.com/api",
});
