const Result = () => {
  const navigate = useNavigate();
  const imageUrl = localStorage.getItem("generatedImageUrl") ?? "";
  const email = localStorage.getItem("email") || "";

  // 현재는 기본 크레딧 25 기준으로, 이미지 생성 최대 8회로 고정 처리
  // TODO: Stability API의 사용자 크레딧 조회 기능 연동 시 잔여 크레딧 기반으로 수정 예정
  const usageKey = usageCount_${email};
  const usageCount = parseInt(localStorage.getItem(usageKey) || "0", 10);
  const remaining = 8 - usageCount;

  useEffect(() => {
    if (!imageUrl) {
      alert("이미지가 존재하지 않습니다.");
      navigate("/input");
    }
  }, [imageUrl, navigate]);