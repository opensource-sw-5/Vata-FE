const username = localStorage.getItem("username");

{!username && (
  <div className="flex gap-8">
    <button onClick={() => navigate("/login")} ...>로그인</button>
    <button onClick={() => navigate("/signup")} ...>회원가입</button>
  </div>
)}
