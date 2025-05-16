import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Result = () => {
  const navigate = useNavigate();
  const imageUrl = localStorage.getItem("generatedImageUrl") ?? "";

  useEffect(() => {
    if (!imageUrl) {
      alert("이미지가 존재하지 않습니다.");
      navigate("/input");
    }
  }, [imageUrl, navigate]);

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-gradient-to-br from-yellow-100 to-pink-100 px-4">
      <h2 className="text-5xl font-bold text-pink-600 mb-8">🎉 결과 이미지</h2>
      <img
        src={imageUrl}
        alt="생성된 아바타"
        className="w-[350px] h-[350px] rounded-xl shadow-lg object-cover mb-6"
      />
    </div>
  );
};

export default Result;
