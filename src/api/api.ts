import axios from "axios";

const instance = axios.create({
  baseURL: "http://vata.kro.kr:8080", // 실제 서버 URL
  withCredentials: true,
});

export default instance;