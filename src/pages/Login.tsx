import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null); // 에러 메시지 상태 추가
  const [loading, setLoading] = useState(false); // 로딩 상태 추가

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // 로그인 시작 시 로딩 상태 true로 설정

    try {
      // 로그인 API 요청
      const response = await axios.post("http://localhost:8080/api/auth/login", {
        email: form.email,
        password: form.password,
      });

      // 로그인 성공 시, 백엔드에서 반환된 토큰을 sessionStorage에 저장
      const token = (response.data as { token: string }).token;  // 명시적으로 타입 지정

      sessionStorage.setItem("accessToken", token);
      sessionStorage.setItem("email", form.email);

      alert("로그인에 성공하였습니다!");
      navigate("/"); // 홈 화면으로 리다이렉트
    } catch (err) {
      setError("이메일 또는 비밀번호가 일치하지 않습니다. 다시 시도해주세요.");
    } finally {
      setLoading(false); // 로그인 후 로딩 상태 false로 설정
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-yellow-100 to-pink-100">
      <form onSubmit={handleSubmit} className="bg-white p-10 rounded-2xl shadow-xl w-[400px] flex flex-col gap-5">
        <h2 className="text-3xl font-bold text-center text-pink-600">로그인</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}  {/* 에러 메시지 표시 */}
        <input type="text" name="email" placeholder="이메일" value={form.email} onChange={handleChange} className="border rounded px-4 py-2" required />
        <input type="password" name="password" placeholder="비밀번호" value={form.password} onChange={handleChange} className="border rounded px-4 py-2" required />
        {loading ? (
          <p className="text-center text-pink-500">로그인 중...</p>
        ) : (
          <button type="submit" className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 rounded">
            로그인
          </button>
        )}
      </form>
    </div>
  );
};

export default Login;