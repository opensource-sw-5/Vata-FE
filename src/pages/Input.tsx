const [isLoading, setIsLoading] = useState(false);

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const username = localStorage.getItem("username") || "";
  const token = localStorage.getItem("accessToken") || "";
  const usageKey = `usageCount_${username}`;
  const currentCount = parseInt(localStorage.getItem(usageKey) || "0", 10);

  if (currentCount >= 8) {
    alert("⚠️ 더 이상 이미지를 생성할 수 없습니다. (최대 8회)");
    return;
  }

  setIsLoading(true);

  try {
    const hobbyToSend = form.hobby === "직접입력" ? form.otherHobby : form.hobby;

    if (process.env.REACT_APP_MOCK_MODE === "true") {
      await new Promise((res) => setTimeout(res, 1000));
      localStorage.setItem("generatedImageUrl", "https://via.placeholder.com/400x400.png?text=Avatar+Result");
    } else {
      const response = await fetch("/api/profile/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...form, hobby: hobbyToSend }),
      });

      if (!response.ok) throw new Error("이미지 생성 실패");

      const imageUrl = await response.text();
      localStorage.setItem("generatedImageUrl", imageUrl);
    }

    localStorage.setItem(usageKey, (currentCount + 1).toString());
    navigate("/result");
  } catch (err) {
    alert("⚠️ 이미지 생성 중 오류가 발생했습니다.");
  } finally {
    setIsLoading(false);
  }
};
