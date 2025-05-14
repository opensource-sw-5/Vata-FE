import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  const token = localStorage.getItem("accessToken");

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("accessToken");
    navigate("/");
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 to-yellow-100 relative">
      {/* 오른쪽 상단에 유저 이름 + 로그아웃 버튼 */}
      {username && (
        <div className="absolute top-6 right-6 flex items-center gap-4 text-xl font-semibold text-gray-800">
          <span>👤 {username}님</span>
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
          vata와 함께 나만의 아바타를 만들어보세요!
        </p>

        <div className="flex gap-8">
          {username ? (
            <>
              <button
                onClick={() => navigate("/storage")}
                className="px-12 py-5 bg-pink-500 text-white text-[1.2vw] font-semibold rounded-full shadow-lg hover:bg-pink-600 transition"
              >
                보관함
              </button>
              <button
                onClick={() => {
                  if (token) navigate("/input");
                  else {
                    alert("토큰 설정이 필요합니다.");
                    navigate("/token");
                  }
                }}
                className="px-12 py-5 bg-white text-pink-600 border border-pink-300 text-[1.2vw] font-semibold rounded-full shadow-lg hover:bg-pink-100 transition"
              >
                프로필 생성
              </button>
              <button
                onClick={() => navigate("/token")}
                className="px-12 py-5 bg-yellow-400 text-white text-[1.2vw] font-semibold rounded-full shadow-lg hover:bg-yellow-500 transition"
              >
                토큰 설정
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
