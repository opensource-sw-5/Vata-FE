const handleDownload = async () => {
  try {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const blobUrl = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = "avatar_result.jpeg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(blobUrl);
  } catch (err) {
    alert("이미지 다운로드에 실패했습니다.");
    console.error(err);
  }
};

const handleRetry = () => {
  navigate("/input");
};

const handleGoHome = () => {
  navigate("/");
};

...

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
