import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Result = () => {
  const navigate = useNavigate();
  const imageUrl = localStorage.getItem("generatedImageUrl") ?? "";
  const username = localStorage.getItem("username") || "";
  const usageCount = parseInt(localStorage.getItem(`usageCount_${username}`) || "0", 10);
  const remaining = 8 - usageCount;

  useEffect(() => {
    if (!imageUrl) {
      alert("이미지가 존재하지 않습니다.");
      navigate("/input");
    }
  }, [imageUrl, navigate]);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = "avatar_result.png";
    link.click();
  };

  const handleRetry = () => {
    navigate("/input");
  };

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-gradient-to-br from-yellow-100 to-pink-100 px-4">
      <h2 className="text-5xl font-bold text-pink-600 mb-8">🎉 결과 이미지</h2>

      <img
        src={imageUrl}
        alt="생성된 아바타"
        className="w-[350px] h-[350px] rounded-xl shadow-lg object-cover mb-6"
      />

      <p className="text-xl text-gray-700 mb-6">
        남은 이미지 생성 가능 횟수:{" "}
        <span className="text-pink-500 font-bold text-2xl">{remaining}</span> / 8
      </p>

      <div className="flex gap-6">
        <button
          onClick={handleDownload}
          className="bg-pink-500 hover:bg-pink-600 text-white font-semibold px-6 py-3 rounded-full shadow-md text-lg transition"
        >
          다운로드
        </button>

        <button
          onClick={handleRetry}
          className="bg-white text-pink-600 border border-pink-400 font-semibold px-6 py-3 rounded-full shadow-md text-lg hover:bg-pink-50 transition"
        >
          다시 생성하기
        </button>

        <button
          onClick={handleGoHome}
          className="bg-gray-100 text-gray-700 border border-gray-300 font-semibold px-6 py-3 rounded-full shadow-md text-lg hover:bg-gray-200 transition"
        >
          홈으로
        </button>
      </div>
    </div>
  );
};

export default Result;
