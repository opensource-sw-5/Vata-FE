import axios from "axios";

const instance = axios.create({
  baseURL: "https://www.jhzlo.world", // 실제 서버 URL
  withCredentials: true,
});

export default instance;
