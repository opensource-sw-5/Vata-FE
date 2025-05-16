const username = localStorage.getItem("username") || "";
const usageKey = `usageCount_${username}`;
const usageCount = parseInt(localStorage.getItem(usageKey) || "0", 10);
const remaining = 8 - usageCount;

...

<p className="text-xl text-gray-700 mb-6">
  남은 이미지 생성 가능 횟수:{" "}
  <span className="text-pink-500 font-bold text-2xl">{remaining}</span> / 8
</p>
