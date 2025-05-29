import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api"; // 공통 axios 인스턴스 사용

interface ImageResponse {
  images: string[];
}

const Storage = () => {
  const navigate = useNavigate();
  const email = localStorage.getItem("email") || "";
  const [savedImages, setSavedImages] = useState<string[]>([]);

  const maxSlots = 8;
  const imageSlots = Array.from({ length: maxSlots }, (_, i) => savedImages[i] || null);

  const handleDownload = (url: string, index: number) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = `avatar_${index + 1}.png`;
    link.click();
  };

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get<ImageResponse>("/api/profile/images");
        setSavedImages(response.data.images); // API에서 image list 받기
      } catch (err) {
        console.error("이미지 불러오기 실패", err);
      }
    };
    fetchImages();
  }, []);

  return (
    <div className="w-screen min-h-screen bg-gradient-to-br from-yellow-100 to-pink-100 py-16 flex flex-col items-center">
      <h2 className="text-4xl font-bold text-pink-600 mb-10 flex items-center gap-2">📦 보관함</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 px-4">
        {imageSlots.map((img, index) => (
          <div
            key={index}
            className="w-[220px] h-[280px] bg-white rounded-xl shadow-lg flex flex-col items-center justify-between p-4"
          >
            {img ? (
              <>
                <img
                  src={img}
                  alt={`아바타 ${index + 1}`}
                  className="w-full h-[200px] object-cover rounded-lg"
                />
                <button
                  onClick={() => handleDownload(img, index)}
                  className="mt-4 bg-pink-500 hover:bg-pink-600 text-white font-semibold py-1.5 px-6 rounded-full"
                >
                  다운로드
                </button>
              </>
            ) : (
              <div className="w-full h-full flex flex-col justify-center items-center text-gray-400">
                <div className="text-5xl">📁</div>
                <p className="mt-4">빈 슬롯</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <button
        onClick={() => navigate("/")}
        className="mt-12 bg-gray-700 hover:bg-gray-800 text-white px-8 py-3 rounded-full shadow-md text-lg transition"
      >
        홈으로
      </button>
    </div>
  );
};

export default Storage;
