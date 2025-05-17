const Home = () => {
  const navigate = useNavigate();
  const email = localStorage.getItem("email");
  const token = localStorage.getItem("accessToken");


  const handleLogout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("accessToken");
    navigate("/");
  };  
  
  
   return (
    <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 to-yellow-100 relative">
      {/* 오른쪽 상단에 유저 이메일 + 로그아웃 버튼 */}
      {email && (
        <div className="absolute top-6 right-6 flex items-center gap-4 text-xl font-semibold text-gray-800">
          <span>👤 {email}님</span>
          <button
            onClick={handleLogout}
            className="text-sm bg-gray-300 hover:bg-gray-400 px-4 py-1 rounded-full text-gray-700"
          >
            로그아웃
          </button>
        </div>
      )}    

    <div className="flex gap-8">
      {email ? (
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
        )