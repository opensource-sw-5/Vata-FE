import React from "react";
import { useNavigate } from "react-router-dom";

const TokenGuide = () => {
  const navigate = useNavigate();

  const steps = [
    {
      title: "Step 1. Stability.ai 사이트 접속 후 좌측 하단의 \"Use API\" 클릭",
      image: "/images/step1.png",
      alt: "Use API 버튼 위치",
    },
    {
      title:
        "Step 2. 우측 상단의 \"Login\" 버튼 클릭 후 로그인 진행 (로그인이 안되어 있다면 회원가입 먼저 진행)",
      image: "/images/step2.png",
      alt: "Login 버튼 위치",
    },
    {
      title: "Step 3. 로그인 후 우측 상단의 프로필 아이콘 클릭",
      image: "/images/step3.png",
      alt: "프로필 아이콘 위치",
    },
    {
      title: "Step 4. \"Create API Key\"를 클릭한 뒤 발급된 Access Token 복사",
      image: "/images/step4.png",
      alt: "API Key 복사 위치",
    },
  ];

  return (
    <div className="w-screen min-h-screen bg-gradient-to-br from-yellow-100 to-pink-100 p-8 flex flex-col items-center">
      <h2 className="text-4xl font-bold text-pink-600 mb-8 text-center drop-shadow">
        Access Token 발급 가이드
      </h2>

      <ul className="w-full max-w-3xl flex flex-col gap-10">
        {steps.map((step, index) => (
          <li key={index} className="bg-white p-6 rounded-2xl shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 leading-relaxed">
              {step.title}
            </h3>
            <img
              src={step.image}
              alt={step.alt}
              className="w-full max-h-[400px] object-contain rounded-lg shadow"
            />
          </li>
        ))}
      </ul>

      <button
        onClick={() => navigate("/signup")}
        className="mt-12 px-8 py-3 bg-pink-500 text-white font-semibold rounded-full shadow-lg hover:bg-pink-600 transition"
      >
        다시 회원가입하러 가기
      </button>
    </div>
  );
};

export default TokenGuide;
