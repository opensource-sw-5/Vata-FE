const token = localStorage.getItem("accessToken");

{username && (
  <div className="flex gap-8">
    <button onClick={() => navigate("/storage")} ...>보관함</button>
    <button
      onClick={() => {
        if (token) navigate("/input");
        else {
          alert("토큰 설정이 필요합니다.");
          navigate("/token");
        }
      }}
      ...
    >
      프로필 생성
    </button>
    <button onClick={() => navigate("/token")} ...>토큰 설정</button>
  </div>
)}
