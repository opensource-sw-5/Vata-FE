import { useNavigate } from "react-router-dom";

const Storage = () => {
  // 가짜 데이터: 현재 저장된 아바타 3개 (임시)
  const savedImages = [
    "https://via.placeholder.com/300x300.png?text=Avatar+1",
    "https://via.placeholder.com/300x300.png?text=Avatar+2",
    "https://via.placeholder.com/300x300.png?text=Avatar+3",
  ];

  const maxSlots = 8;
  const imageSlots = Array.from({ length: maxSlots }, (_, i) => savedImages[i] || null);

  return (
    <div className="w-screen min-h-screen bg-gradient-to-br from-yellow-100 to-pink-100 py-16 flex flex-col items-center">
      <h2 className="text-4xl font-bold text-pink-600 mb-10 flex items-center gap-2">
        📦 보관함
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 px-4">
        {imageSlots.map((img, index) => (
          <div
            key={index}
            className="w-[220px] h-[280px] bg-white rounded-xl shadow-lg flex flex-col items-center justify-center p-4 text-gray-400"
          >
            {img ? (
              <img
                src={img}
                alt={`아바타 ${index + 1}`}
                className="w-full h-[200px] object-cover rounded-lg"
              />
            ) : (
              <>
                <div className="text-5xl">📁</div>
                <p className="mt-4">빈 슬롯</p>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Storage;

