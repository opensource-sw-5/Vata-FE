import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Input = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    gender: "",
    mbti: "",
    hobby: "",
    otherHobby: "",
    characterType: "",
    styleType: "",
    etc: "",
  });

  useEffect(() => {
    const username = localStorage.getItem("username");
    const token = localStorage.getItem("accessToken");

    if (!username) {
      alert("로그인이 필요합니다.");
      navigate("/login");
    } else if (!token) {
      alert("Access Token을 먼저 설정해주세요.");
      navigate("/token");
    }
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-yellow-100 to-pink-100">
      <form className="bg-white p-10 rounded-2xl shadow-xl w-[90vw] max-w-[500px] flex flex-col gap-5">
        <h2 className="text-3xl font-bold text-center text-pink-600">프로필 생성 입력</h2>
        {/* 기존 UI에 상태값 연결 및 hobby === '직접입력' 조건 처리 */}
      </form>
    </div>
  );
};

export default Input;
