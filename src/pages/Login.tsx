import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const savedUsername = localStorage.getItem("signup_username");
    const savedPassword = localStorage.getItem("signup_password");

    if (form.username === savedUsername && form.password === savedPassword) {
      localStorage.setItem("username", form.username);
      alert("로그인에 성공하였습니다!");
      navigate("/");
    } else {
      alert("아이디 또는 비밀번호가 일치하지 않습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-yellow-100 to-pink-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded-2xl shadow-xl w-[400px] flex flex-col gap-5"
      >
        <h2 className="text-3xl font-bold text-center text-pink-600">로그인</h2>

        <input
          type="text"
          name="username"
          placeholder="아이디"
          value={form.username}
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

        <button
          type="submit"
          className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 rounded"
        >
          로그인
        </button>
      </form>
    </div>
  );
};

export default Login;
