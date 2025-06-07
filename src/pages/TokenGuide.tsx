import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const TokenGuide = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const formData = location.state?.formData;
    const accessToken = location.state?.accessToken;

    const steps = [
        {
            title: (
                <>
                    Step 1.{" "}
                    <a
                        href="https://stability.ai/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline hover:text-blue-800"
                    >
                        https://stability.ai/
                    </a>{" "}
                    에 접속한 후, 좌측 하단의 <strong>"Use API"</strong> 버튼 클릭
                </>
            ),
            image: "/images/step1.png",
            alt: "Use API 버튼 위치",
        },
        {
            title: (
                <>
                    Step 2. 우측 상단의 <strong>"Login"</strong> 버튼 클릭 후 로그인 진행 (
                    <span className="text-gray-600">로그인이 안되어 있다면 회원가입 먼저 진행</span>)
                </>
            ),
            image: "/images/step2.png",
            alt: "Login 버튼 위치",
        },
        {
            title: <>Step 3. 로그인 후 우측 상단의 <strong>프로필 아이콘</strong> 클릭</>,
            image: "/images/step3.png",
            alt: "프로필 아이콘 위치",
        },
        {
            title: (
                <>
                    Step 4. 좌측 상단의 <strong>"API Keys"</strong> 메뉴 클릭 후 <strong>Access Token</strong> 복사
                    <br />
                    <span className="text-gray-600">
                        (발급된 키가 없다면 <strong>"Create API Key"</strong>를 눌러 새로 발급)
                    </span>
                </>
            ),
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
                onClick={() =>
                    navigate("/signup", {
                        state: { formData, accessToken },
                    })
                }
                className="mt-12 px-8 py-3 bg-pink-500 text-white font-semibold rounded-full shadow-lg hover:bg-pink-600 transition"
            >
                다시 회원가입하러 가기
            </button>
        </div>
    );
};

export default TokenGuide;
