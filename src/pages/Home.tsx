// 생략된 로그인/회원가입 버튼 대신 아래 버튼 블럭으로 대체
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
    // 로그인/회원가입 버튼은 그대로 유지
  </>
)}
