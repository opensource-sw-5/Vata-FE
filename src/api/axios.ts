import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true,
});

// 인터셉터 설정
instance.interceptors.request.use((config) => {
  const skipAuthUrls = ["/api/auth/signup", "/api/auth/login", "/api/auth/token"];
  const isSkip = skipAuthUrls.some((url) => config.url?.includes(url));

  if (!isSkip) {
    const token = localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken");
    if (token && config.headers) {
      // 문자열 템플릿 리터럴을 사용하여 Authorization 헤더에 토큰 추가
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

export default instance;
