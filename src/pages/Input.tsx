import { useState } from "react";

const Input = () => {
  const [form, setForm] = useState({
    gender: "",
    mbti: "",
    hobby: "",
    otherHobby: "",
    characterType: "",
    styleType: "",
    etc: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-yellow-100 to-pink-100">
      <form className="bg-white p-10 rounded-2xl shadow-xl w-[90vw] max-w-[500px] flex flex-col gap-5">
        <h2 className="text-3xl font-bold text-center text-pink-600">프로필 생성 입력</h2>

        {/* select, input UI 생략. 전체 옵션 연결만 우선 */}

        <button
          type="submit"
          className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 rounded"
        >
          프롬프트 생성하기
        </button>
      </form>
    </div>
  );
};

export default Input;
