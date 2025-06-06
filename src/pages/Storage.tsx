import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/api";

interface ImageItem {
  profileId: number;
  profileImageUrl: string;
  createdAt: string;
}

interface ImageResponse {
  content: ImageItem[];
  page: number;
  size: number;
  totalPages: number;
  totalElements: number;
  hasNext: boolean;
}

const Storage = () => {
  const navigate = useNavigate();
  const email = sessionStorage.getItem("email") || "";
  const [savedImages, setSavedImages] = useState<ImageItem[]>([]);

  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const maxSlots = 8;
  const imageSlots = Array.from({ length: maxSlots }, (_, i) => savedImages[i] || null);

  const handleDownload = (url: string, index: number) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = `avatar_${index + 1}.jpg`;
    link.click();
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 0 && newPage < totalPages) {
      setCurrentPage(newPage);
    }
  };

  useEffect(() => {
    if (!email.trim()) {
      alert("로그인이 필요합니다!");
      navigate("/login");
      return;
    }

    let isMounted = true;

    const fetchImages = async () => {
      try {
        const response = await axiosInstance.get<ImageResponse>("/api/profile/list", {
          params: { page: currentPage, size: maxSlots },
        });

        if (isMounted && Array.isArray(response.data.content)) {
          setSavedImages(response.data.content);
          setTotalPages(response.data.totalPages);
        }
      } catch (err: any) {
        if (!isMounted) return;

        if (err?.response?.status === 401 || err?.response?.status === 403) {
          alert("⚠️ 인증 정보가 유효하지 않습니다. 다시 로그인해주세요.");
          sessionStorage.removeItem("email");
          navigate("/login");
        } else {
          alert("⚠️ 이미지를 불러오는 데 실패하였습니다!");
          console.error("이미지 불러오기 오류:", err);
        }
      }
    };

    fetchImages();
    return () => {
      isMounted = false;
    };
  }, [email, navigate, currentPage]);

  return (
      <div className="w-screen min-h-screen bg-gradient-to-br from-yellow-100 to-pink-100 py-16 flex flex-col items-center relative">
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
                          src={img.profileImageUrl}
                          alt={`아바타 ${index + 1}`}
                          className="w-full h-[200px] object-cover rounded-lg"
                      />
                      <p className="text-xs text-gray-500 mt-2">
                        {new Date(img.createdAt).toLocaleString()}
                      </p>
                      <button
                          onClick={() => handleDownload(img.profileImageUrl, index)}
                          className="mt-2 bg-pink-500 hover:bg-pink-600 text-white font-semibold py-1.5 px-6 rounded-full"
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

        {/* 페이지 번호 텍스트 */}
        <div className="mt-4 text-gray-700 font-semibold">
          {currentPage + 1} / {totalPages}
        </div>

        {/* 화면 좌우 고정된 페이지네이션 버튼 */}
        {totalPages > 1 && (
            <>
              {/* 왼쪽 (이전) 버튼 */}
              <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 0}
                  className={`fixed top-1/2 left-4 transform -translate-y-1/2 px-4 py-2 rounded-full text-2xl font-bold shadow-lg transition
              ${currentPage === 0
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-white text-pink-600 hover:bg-pink-100"}
            `}
              >
                ◀
              </button>

              {/* 오른쪽 (다음) 버튼 */}
              <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage + 1 >= totalPages}
                  className={`fixed top-1/2 right-4 transform -translate-y-1/2 px-4 py-2 rounded-full text-2xl font-bold shadow-lg transition
              ${currentPage + 1 >= totalPages
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-white text-pink-600 hover:bg-pink-100"}
            `}
              >
                ▶
              </button>
            </>
        )}

        <button
            onClick={() => navigate("/")}
            className="mt-4 bg-gray-700 hover:bg-gray-800 text-white px-8 py-3 rounded-full shadow-md text-lg transition"
        >
          홈으로
        </button>
      </div>
  );
};

export default Storage;
