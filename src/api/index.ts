import instance from "./api";

const skipAuthUrls = [
  "/api/auth/signup",
  "/api/auth/login",
  "/api/user/access-key",
  "/api/auth/logout",
];

instance.interceptors.request.use((config) => {
  const isSkip = skipAuthUrls.some((url) => config.url?.includes(url));

  if (!isSkip) {
    const token =
      localStorage.getItem("accessKey") || sessionStorage.getItem("accessKey");

    if (token && config.headers) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
  }

  return config;
});

export default instance;
