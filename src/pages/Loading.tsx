if (isLoading) {
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-yellow-100 to-pink-100">
      <div className="text-3xl font-bold text-pink-600 animate-pulse">
        이미지 생성 중...✨ (조금만 기다려주세요!)
      </div>
    </div>
  );
}