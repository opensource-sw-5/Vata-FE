import { useNavigate } from "react-router-dom";

const Storage = () => {
  const navigate = useNavigate();

  // 가짜 데이터: 현재 저장된 아바타 3개
  const savedImages = [
    "https://via.placeholder.com/300x300.png?text=Avatar+1",
    "https://via.placeholder.com/300x300.png?text=Avatar+2",
    "https://via.placeholder.com/300x300.png?text=Avatar+3",
  ];

  const maxSlots = 8;

  // 총 8칸 채우기 (있는 이미지는 보여주고, 나머진 빈 슬롯)
  const imageSlots = Array.from({ length: maxSlots }, (_, i) => savedImages[i] || null);

  const handleDownload = (url: string, index: number) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = `avatar_${index + 1}.png`;
    link.click();
  };

  return (
    <div className="w-screen min-h-screen bg-gradient-to-br from-yellow-100 to-pink-100 py-16 flex flex-col items-center">
      <h2 className="text-4xl font-bold text-pink-600 mb-10 flex items-center gap-2">
        📦 보관함
      </h2>

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


