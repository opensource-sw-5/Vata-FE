import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../api/api";

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [accessToken, setAccessToken] = useState("");
  const [tokenVerified, setTokenVerified] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.state?.formData) {
      setForm(location.state.formData);
    }
    if (location.state?.accessToken) {
      setAccessToken(location.state.accessToken);
    }
  }, [location.state]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleTokenVerification = async () => {
    if (!accessToken) {
      setError("⚠️ Access Token을 입력해주세요!");
      return;
    }
    setIsVerifying(true);
    setError(null);
    try {
      const response = await axiosInstance.post("/api/auth/token/verify", {
        accessToken: accessToken,
      });

      if (response.status === 200) {
        setTokenVerified(true);
        alert("✅ Access Token 검증 완료!");
      }
    } catch (err: any) {
      if (err.response && err.response.status === 400) {
        setError(`⚠️ ${err.response.data}`);
      } else {
        setError("⚠️ 서버 오류: Access Token 검증 실패");
      }
    } finally {
      setIsVerifying(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (form.password !== form.confirmPassword) {
      setError("⚠️ 비밀번호가 일치하지 않습니다!");
      return;
    }

    if (!tokenVerified) {
      setError("⚠️ Access Token 검증을 먼저 완료해주세요!");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axiosInstance.post("/api/auth/signup", {
        email: form.email,
        password: form.password,
        name: form.name,
        stabilityApiAccessToken: accessToken,
      });

      const message =
        typeof response.data === "string"
          ? response.data
          : (response.data as { message?: string }).message || "회원가입이 완료되었습니다!";

      alert(message);
      navigate("/login");
    } catch (err: any) {
      const errorMessage =
        typeof err.response?.data === "string"
          ? err.response.data
          : err.response?.data?.message || "회원가입에 실패했습니다. 다시 시도해주세요!";
      setError(errorMessage);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-yellow-100 to-pink-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded-2xl shadow-xl w-[400px] flex flex-col gap-5"
      >
        <h2 className="text-3xl font-bold text-center text-pink-600">회원가입</h2>

        {error && <p className="text-red-500 text-center">{error}</p>}

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
          placeholder="비밀번호 (최소 8자 이상)"
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

        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Access Token 입력"
            value={accessToken}
            onChange={(e) => setAccessToken(e.target.value)}
            className="border rounded px-4 py-2 flex-1"
            required
          />
          <button
            type="button"
            onClick={handleTokenVerification}
            className="px-3 py-2 text-sm text-white rounded bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={isVerifying || tokenVerified}
          >
            {isVerifying ? "검증 중..." : tokenVerified ? "검증 완료" : "검증"}
          </button>
        </div>

        <p
          className="text-sm text-blue-600 hover:underline cursor-pointer -mt-3"
          onClick={() => navigate("/token-guide", { state: { formData: form, accessToken } })}
        >
          Access Token을 발급받는 방법
        </p>
        <button
          type="submit"
          className={`text-white font-semibold py-2 rounded ${
            isLoading
              ? "bg-gray-300"
              : tokenVerified
              ? "bg-pink-500 hover:bg-pink-600"
              : "bg-gray-300 cursor-not-allowed"
          }`}
          disabled={isLoading || !tokenVerified}
        >
          {isLoading ? "가입 중..." : "가입하기"}
        </button>
      </form>
    </div>
  );
};

export default Signup;