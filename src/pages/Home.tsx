import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/api";
import { verifyAccessToken, registerAccessToken } from "../api/accessToken";

const Home = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState<{ email: string; name: string } | null>(null);
  const isLoggedIn = !!sessionStorage.getItem("email");

  const handleLogout = async () => {
    try {
      await axiosInstance.post("/api/auth/logout");
      sessionStorage.removeItem("email");
      navigate("/");
    } catch (err) {
      alert("로그아웃에 실패했습니다.");
      console.error("로그아웃 실패:", err);
    }
  };

  const handleAccessTokenUpdate = async () => {
    const newToken = prompt("새로운 Access Token을 입력하세요:");
    if (!newToken) return;

    try {
      await verifyAccessToken(newToken); // 검증
      await registerAccessToken(newToken); // 등록
      alert("Access Token이 성공적으로 수정되었습니다.");
    } catch (err) {
      console.error("Access Token 수정 실패:", err);
      alert("유효하지 않은 Access Token입니다.");
    }
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const res = await axiosInstance.get("/api/user/info");
        setUserInfo(res.data);
      } catch (err) {
        console.error("사용자 정보 가져오기 실패:", err);
      }
    };

    if (isLoggedIn) {
      fetchUserInfo();
    }
  }, [isLoggedIn]);

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 to-yellow-100 relative">
      <a
        href="https://github.com/opensource-sw-5"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute top-6 left-6 flex items-center gap-2 text-gray-700 hover:text-gray-900 text-sm font-semibold"
      >
        <img
          src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
          alt="GitHub"
          className="w-5 h-5"
        />
        GitHub
      </a>

      {isLoggedIn && userInfo && (
        <div className="absolute top-6 right-6 flex items-center gap-4 text-xl font-semibold text-gray-800">
          <span>{userInfo.name}님</span>
          <button
            onClick={handleAccessTokenUpdate}
            className="text-sm bg-yellow-300 hover:bg-yellow-400 px-4 py-1 rounded-full text-gray-700"
          >
            Access Token 수정
          </button>
          <button
            onClick={handleLogout}
            className="text-sm bg-gray-300 hover:bg-gray-400 px-4 py-1 rounded-full text-gray-700"
          >
            로그아웃
          </button>
        </div>
      )}

      <div className="flex flex-col items-center text-center">
        <h1 className="text-[6vw] font-extrabold text-pink-600 drop-shadow-lg mb-12 flex items-center gap-2">
          Vata <span className="text-[4vw]">👤</span>
        </h1>

        <p className="text-[2vw] text-gray-700 mb-14 leading-relaxed">
          Vata와 함께 나만의 아바타를 만들어보세요!
        </p>

        <div className="flex gap-8">
          {isLoggedIn ? (
            <>
              <button
                onClick={() => navigate("/storage")}
                className="px-12 py-5 bg-pink-500 text-white text-[1.2vw] font-semibold rounded-full shadow-lg hover:bg-pink-600 transition"
              >
                보관함
              </button>
              <button
                onClick={() => navigate("/input")}
                className="px-12 py-5 bg-white text-pink-600 border border-pink-300 text-[1.2vw] font-semibold rounded-full shadow-lg hover:bg-pink-100 transition"
              >
                프로필 생성
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate("/login")}
                className="px-12 py-5 bg-pink-500 text-white text-[1.2vw] font-semibold rounded-full shadow-lg hover:bg-pink-600 transition"
              >
                로그인
              </button>
              <button
                onClick={() => navigate("/signup")}
                className="px-12 py-5 bg-white text-pink-600 border border-pink-300 text-[1.2vw] font-semibold rounded-full shadow-lg hover:bg-pink-100 transition"
              >
                회원가입
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
