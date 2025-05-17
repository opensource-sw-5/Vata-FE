 useEffect(() => {
    const email = localStorage.getItem("email");
    const token = localStorage.getItem("accessToken");

    if (!email) {
      alert("로그인이 필요합니다.");
      navigate("/login");
    } else if (!token) {
      alert("Access Token을 먼저 설정해주세요.");
      navigate("/token");
    }
  }, [navigate]);  const email = localStorage.getItem("email") || "";
    const token = localStorage.getItem("accessToken") || "";

    // 현재는 기본 크레딧 25 기준으로, 이미지 생성 최대 8회로 고정 처리
    // TODO: Stability API의 사용자 크레딧 조회 기능 연동 시 잔여 크레딧 기반으로 수정 예정
    const usageKey = usageCount_${email};
    const currentCount = parseInt(localStorage.getItem(usageKey) || "0", 10);