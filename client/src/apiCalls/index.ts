import axios from "axios";

export const axiosInstance = axios.create({
  headers: {
    Authorization: `Bearere ${localStorage.getItem("token")}`,
  },
});
