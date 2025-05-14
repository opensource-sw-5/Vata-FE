import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Input = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

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
      navigate("/");
    }
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const username = localStorage.getItem("username") || "";
    const token = localStorage.getItem("accessToken") || "";
    const usageKey = `usageCount_${username}`;
    const currentCount = parseInt(localStorage.getItem(usageKey) || "0", 10);

    if (currentCount >= 8) {
      alert("⚠️ 더 이상 이미지를 생성할 수 없습니다. (최대 8회)");
      return;
    }

    setIsLoading(true);

    try {
      const hobbyToSend = form.hobby === "직접입력" ? form.otherHobby : form.hobby;

      if (process.env.REACT_APP_MOCK_MODE === "true") {
        console.log("[MOCK] 생성할 데이터:", {
          ...form,
          hobby: hobbyToSend,
        });
        await new Promise((res) => setTimeout(res, 1000));
      } else {
        const response = await fetch("/api/profile/generate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            gender: form.gender,
            mbti: form.mbti,
            hobby: hobbyToSend,
            characterType: form.characterType,
            styleType: form.styleType,
            etc: form.etc,
          }),
        });

        if (!response.ok) throw new Error("프롬프트 생성 실패");

        const prompt = await response.text();
        console.log("백엔드 프롬프트:", prompt);
      }

      localStorage.setItem("generatedImageUrl", "https://via.placeholder.com/400x400.png?text=Avatar+Result");
      localStorage.setItem(usageKey, (currentCount + 1).toString());

      navigate("/result");
    } catch (err) {
      alert("⚠️ 프롬프트 생성 중 오류가 발생했습니다.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-yellow-100 to-pink-100">
        <div className="text-3xl font-bold text-pink-600 animate-pulse">
          이미지 생성 중...✨ (조금만 기다려주세요!)
        </div>
      </div>
    );
  }

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-yellow-100 to-pink-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded-2xl shadow-xl w-[90vw] max-w-[500px] flex flex-col gap-5"
      >
        <h2 className="text-3xl font-bold text-center text-pink-600">프로필 생성 입력</h2>

        <select name="gender" value={form.gender} onChange={handleChange} required className="border px-4 py-2 rounded">
          <option value="">성별 선택</option>
          <option value="MALE">남성</option>
          <option value="FEMALE">여성</option>
        </select>

        <select name="mbti" value={form.mbti} onChange={handleChange} required className="border px-4 py-2 rounded">
          <option value="">MBTI 선택</option>
          {["INFP", "INFJ", "INTP", "INTJ","ISFP","ISFJ","ISTP","ISTJ","ENFP","ENFJ","ENTP","ENTJ","ESFP","ESFJ","ESTP","ESTJ"].map(m => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>

        <select name="hobby" value={form.hobby} onChange={handleChange} required className="border px-4 py-2 rounded">
          <option value="">취미 선택</option>
          <option value="독서">독서</option>
          <option value="운동">운동</option>
          <option value="게임">게임</option>
          <option value="그림 그리기">그림 그리기</option>
          <option value="음악 감상">음악 감상</option>
          <option value="영화 감상">영화 감상</option>
          <option value="사진 촬영">사진 촬영</option>
          <option value="직접입력">직접 입력</option>
        </select>

        {form.hobby === "직접입력" && (
          <input
            type="text"
            name="otherHobby"
            value={form.otherHobby}
            onChange={handleChange}
            placeholder="취미를 직접 입력하세요"
            className="border px-4 py-2 rounded"
            required
          />
        )}

        <select name="characterType" value={form.characterType} onChange={handleChange} required className="border px-4 py-2 rounded">
          <option value="">캐릭터 타입 선택</option>
          <option value="CHARACTER">캐릭터 중심</option>
          <option value="REALISTIC">실제 인물 중심</option>
        </select>

        <select name="styleType" value={form.styleType} onChange={handleChange} required className="border px-4 py-2 rounded">
          <option value="">스타일 선택</option>
          <option value="3d-model">3D 모델</option>
          <option value="analog-film">아날로그 필름</option>
          <option value="anime">일본 애니메이션</option>
          <option value="cinematic">영화</option>
          <option value="comic-book">만화</option>
          <option value="digital-art">디지털 아트</option>
          <option value="enhance">고화질 강화</option>
          <option value="fantasy-art">판타지 아트</option>
          <option value="isometric">입체 각도</option>
          <option value="line-art">선화</option>
          <option value="low-poly">간단한 다각형</option>
          <option value="modeling-compound">찰흙 모델링</option>
          <option value="neon-punk">형광 SF</option>
          <option value="origami">종이접기</option>
          <option value="photographic">사진</option>
          <option value="pixel-art">픽셀 아트</option>
          <option value="tile-texture">타일 텍스처</option>
        </select>


        <input
          name="etc"
          value={form.etc}
          onChange={handleChange}
          placeholder="(선택사항) 예: 따뜻한 분위기의 배경으로 설정해주세요."
          className="border px-4 py-2 rounded"
        />

        <button
          type="submit"
          className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 rounded"
        >
          프롬프트 생성하기
        </button>
      </form>
    </div>
  );
};

export default Input;

