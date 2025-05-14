const handleLogout = () => {
  localStorage.removeItem("username");
  localStorage.removeItem("accessToken");
  navigate("/");
};

{username && (
  <div className="absolute top-6 right-6 flex items-center gap-4 text-xl font-semibold text-gray-800">
    <span>👤 {username}님</span>
    <button onClick={handleLogout} ...>로그아웃</button>
  </div>
)}

