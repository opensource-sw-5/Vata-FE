import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // axios import

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState<string | null>(null); // 에러 메시지 상태 추가
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 추가

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // 비밀번호 확인
    if (form.password !== form.confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      setIsLoading(false);
      return;
    }

    try {
      // 백엔드 회원가입 API 호출
      const response = await axios.post(
        "http://localhost:8080/api/auth/signup",
        {
          username: form.email, // 백엔드에서 username은 이메일로 처리됨
          password: form.password,
          nickname: form.name,
          email: form.email,
        }
      );

      // response.data의 타입을 명시적으로 설정
      const data = response.data as { message: string }; // response.data에 message 속성이 있다고 가정

      // 백엔드에서 반환된 응답에서 message 사용
      if (data.message) {
        alert(data.message); // 예: "회원가입이 완료되었습니다."
      } else {
        alert("회원가입이 완료되었습니다. 로그인해주세요!");
      }

      navigate("/login"); // 로그인 페이지로 이동
    } catch (err: any) {
      // 서버에서 반환한 에러 메시지가 있을 경우 그 메시지를 사용
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message); // 백엔드에서 제공하는 오류 메시지 표시
      } else {
        setError("회원가입에 실패했습니다. 다시 시도해주세요."); // 기본 오류 메시지
      }
      console.error(err);
    } finally {
      setIsLoading(false); // 로딩 상태 종료
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-yellow-100 to-pink-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded-2xl shadow-xl w-[400px] flex flex-col gap-5"
      >
        <h2 className="text-3xl font-bold text-center text-pink-600">회원가입</h2>

        {error && <p className="text-red-500 text-center">{error}</p>} {/* 에러 메시지 표시 */}

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
          type="email"
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
          disabled={isLoading} // 로딩 중 버튼 비활성화
        >
          {isLoading ? "가입 중..." : "가입하기"} {/* 로딩 상태 표시 */}
        </button>
      </form>
    </div>
  );
};

export default Signup;