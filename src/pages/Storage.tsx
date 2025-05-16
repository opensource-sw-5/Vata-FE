const handleDownload = (url: string, index: number) => {
  const link = document.createElement("a");
  link.href = url;
  link.download = `avatar_${index + 1}.png`;
  link.click();
};

<button
  onClick={() => handleDownload(img, index)}
  className="mt-4 bg-pink-500 hover:bg-pink-600 text-white font-semibold py-1.5 px-6 rounded-full"
>
  다운로드
</button>
