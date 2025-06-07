import axiosInstance from "./api";

// Access Token 검증 (POST 방식)
export const verifyAccessToken = async (accessToken: string) => {
  return await axiosInstance.post("/api/auth/token/verify", {
    accessToken,
  });
};

// Access Token 등록
export const registerAccessToken = async (accessToken: string) => {
  return await axiosInstance.post("/api/user/access-key", {
    accessToken,
  });
};
