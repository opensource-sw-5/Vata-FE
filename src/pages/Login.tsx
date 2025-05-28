import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios"; // 수정된 부분

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("/api/auth/login", {
        email: form.email,
        password: form.password,
      });

      const token = (response.data as { token: string }).token;
      sessionStorage.setItem("accessToken", token);
      sessionStorage.setItem("email", form.email);

      alert("로그인에 성공하였습니다!");
      navigate("/");
    } catch (err) {
      setError("이메일 또는 비밀번호가 일치하지 않습니다. 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-yellow-100 to-pink-100">
      <form onSubmit={handleSubmit} className="bg-white p-10 rounded-2xl shadow-xl w-[400px] flex flex-col gap-5">
        <h2 className="text-3xl font-bold text-center text-pink-600">로그인</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <input
          type="text"
          name="email"
          placeholder="이메일"
          value={form.email}
          onChange={handleChange}
          className="border rounded px-4 py-2"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="비밀번호"
          value={form.password}
          onChange={handleChange}
          className="border rounded px-4 py-2"
          required
        />
        {loading ? (
          <p className="text-center text-pink-500">로그인 중...</p>
        ) : (
          <button
            type="submit"
            className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 rounded"
          >
            로그인
          </button>
        )}
      </form>
    </div>
  );
};

export default Login;

