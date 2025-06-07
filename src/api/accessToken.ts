import axiosInstance from "./api";

export const verifyAccessToken = async (token: string) => {
  return await axiosInstance.post("/api/auth/token/verify", { accessToken: token });
};

export const registerAccessToken = async (token: string) => {
  return await axiosInstance.post("/api/user/access-key", { accessToken: token });
};
