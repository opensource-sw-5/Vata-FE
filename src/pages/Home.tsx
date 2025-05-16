const username = localStorage.getItem("username");
const token = localStorage.getItem("accessToken");

const handleLogout = () => {
  localStorage.removeItem("username");
  localStorage.removeItem("accessToken");
  navigate("/");
};

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
