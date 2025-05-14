import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    console.log("회원가입 요청:", form);

    // 회원가입 정보 저장
    localStorage.setItem("signup_username", form.username);
    localStorage.setItem("signup_password", form.password);

    alert("회원가입이 완료되었습니다. 로그인해주세요!");
    navigate("/login"); // 로그인 페이지로 이동
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-yellow-100 to-pink-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded-2xl shadow-xl w-[400px] flex flex-col gap-5"
      >
        <h2 className="text-3xl font-bold text-center text-pink-600">회원가입</h2>

        <input
          type="text"
          name="name"
          placeholder="이름"
          value={form.name}
          onChange={handleChange}
          className="border rounded px-4 py-2"
          required
        />

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

        <input
          type="password"
          name="confirmPassword"
          placeholder="비밀번호 확인"
          value={form.confirmPassword}
          onChange={handleChange}
          className="border rounded px-4 py-2"
          required
        />

        <button
          type="submit"
          className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 rounded"
        >
          가입하기
        </button>
      </form>
    </div>
  );
};

export default Signup;

