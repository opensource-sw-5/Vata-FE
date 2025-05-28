import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";

const AccessToken = () => {
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const email = localStorage.getItem("email");
    if (!email) {
      alert("로그인이 필요합니다.");
      navigate("/login");
    }
  }, [navigate]);

  const handleSave = async () => {
    try {
      const response = await axios.post(
        "/api/auth/token",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const savedToken = (response.data as { token: string }).token;
      localStorage.setItem("accessToken", savedToken);

      alert("Access Token이 저장되었습니다!");
      navigate("/");
    } catch (err: any) {
      const status = err.response?.status;
      const message =
        typeof err.response?.data === "string"
          ? err.response.data
          : err.response?.data?.message;

      if (status === 401) {
        alert("⚠️ 유효하지 않은 토큰입니다. 다시 확인해주세요.");
      } else if (message) {
        alert(`⚠️ ${message}`);
      } else {
        alert("⚠️ 토큰 저장에 실패했습니다.");
      }

      console.error("Access token error:", err);
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-yellow-100 to-pink-100">
      <div className="flex flex-col items-center text-center">
        <h1 className="text-[3vw] font-extrabold text-pink-600 drop-shadow-lg mb-10">
          Access Token 설정
        </h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSave();
          }}
          className="flex flex-col gap-6 bg-white p-10 rounded-2xl shadow-xl w-[90vw] max-w-[400px]"
        >
          <input
            type="text"
            placeholder="Access Token 입력"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            className="border border-gray-300 rounded px-4 py-3 text-[1vw] focus:outline-none focus:ring-2 focus:ring-pink-300"
            required
          />
          <button
            type="submit"
            className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 rounded-full shadow-lg transition text-[1.2vw]"
          >
            저장하기
          </button>
        </form>
      </div>
    </div>
  );
};

export default AccessToken;
