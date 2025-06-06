import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axiosInstance from "../api/api";

const hobbyOptions = [
    "독서", "운동", "게임", "그림 그리기", "음악 감상",
    "영화 감상", "사진 촬영", "직접입력"
];

const mbtiOptions = [
    "INFP", "INFJ", "INTP", "INTJ", "ISFP", "ISFJ", "ISTP", "ISTJ",
    "ENFP", "ENFJ", "ENTP", "ENTJ", "ESFP", "ESFJ", "ESTP", "ESTJ"
];

const characterTypeOptions = ["CHARACTER", "AVATAR", "ANIMAL"];

const styleTypeOptions: string[] = [
    "MODEL_3D", "ANALOG_FILM", "ANIME", "CINEMATIC", "COMIC_BOOK",
    "DIGITAL_ART", "ENHANCE", "FANTASY_ART", "ISOMETRIC", "LINE_ART",
    "LOW_POLY", "MODELING_COMPOUND", "NEON_PUNK", "ORIGAMI",
    "PHOTOGRAPHIC", "PIXEL_ART", "TILE_TEXTURE"
];

const Input = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false); // 로딩 상태 추가
    const [form, setForm] = useState({
        gender: "",
        mbti: "",
        hobby: "",
        otherHobby: "",
        characterType: "",
        styleType: "",
        etc: "",
    });

    useEffect(() => {
        const email = sessionStorage.getItem("email");
        if (!email || typeof email !== "string" || email.trim() === "") {
            alert("로그인이 필요합니다!");
            navigate("/login");
        }
    }, [navigate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({...form, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            // 1. 크레딧 확인
            const creditRes = await axiosInstance.get("/api/profile/credits");
            const credits = creditRes.data?.credits ?? 0;

            if (credits <= 0) {
                alert("더 이상 이미지를 생성할 수 없습니다! (크레딧 부족)");
                setLoading(false);
                return;
            }

            // 2. 프롬프트 전송
            const hobbyToSend = form.hobby === "직접입력" ? form.otherHobby : form.hobby;

            const promptResponse = await axiosInstance.post("/api/profile/generate", {
                gender: form.gender,
                mbti: form.mbti,
                hobby: hobbyToSend,
                characterType: form.characterType,
                styleType: form.styleType,
                etc: form.etc,
            });

            const imageUrl = (promptResponse.data as { imageUrl: string }).imageUrl;
            navigate("/result", {state: {imageUrl}});

        } catch (err: any) {
            console.error("Input Error:", err);

            let errorMessage = "이미지 생성 중 오류가 발생했습니다!";
            if (err.response?.data?.message) errorMessage = err.response.data.message;
            else if (err.message) errorMessage = err.message;

            alert(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-yellow-100 to-pink-100">
            <form onSubmit={handleSubmit}
                  className="bg-white p-10 rounded-2xl shadow-xl w-[90vw] max-w-[500px] flex flex-col gap-5">
                <h2 className="text-3xl font-bold text-center text-pink-600">프로필 생성 입력</h2>

                <select name="gender" value={form.gender} onChange={handleChange} required
                        className="border px-4 py-2 rounded">
                    <option value="">성별 선택</option>
                    <option value="MALE">남성</option>
                    <option value="FEMALE">여성</option>
                </select>

                <select name="mbti" value={form.mbti} onChange={handleChange} required
                        className="border px-4 py-2 rounded">
                    <option value="">MBTI 선택</option>
                    {mbtiOptions.map((m) => (
                        <option key={m} value={m}>{m}</option>
                    ))}
                </select>

                <select name="hobby" value={form.hobby} onChange={handleChange} required
                        className="border px-4 py-2 rounded">
                    <option value="">취미 선택</option>
                    {hobbyOptions.map((h) => (
                        <option key={h} value={h}>{h}</option>
                    ))}
                </select>

                {form.hobby === "직접입력" && (
                    <input
                        type="text"
                        name="otherHobby"
                        value={form.otherHobby}
                        onChange={handleChange}
                        placeholder="취미를 직접 입력하세요"
                        className="border px-4 py-2 rounded"
                        required
                    />
                )}

                <select name="characterType" value={form.characterType} onChange={handleChange} required
                        className="border px-4 py-2 rounded">
                    <option value="">캐릭터 타입 선택</option>
                    {characterTypeOptions.map((c) => (
                        <option key={c} value={c}>{c}</option>
                    ))}
                </select>

                <select name="styleType" value={form.styleType} onChange={handleChange} required
                        className="border px-4 py-2 rounded">
                    <option value="">스타일 선택</option>
                    {styleTypeOptions.map((s: string) => (
                        <option key={s} value={s}>{s}</option>
                    ))}
                </select>

                <input
                    name="etc"
                    value={form.etc}
                    onChange={handleChange}
                    placeholder="(선택사항) 예: 따뜻한 분위기의 배경으로 설정해주세요."
                    className="border px-4 py-2 rounded"
                />

                <button
                    type="submit"
                    disabled={loading}
                    className={`text-white font-semibold py-2 rounded ${
                        loading ? "bg-gray-400" : "bg-pink-500 hover:bg-pink-600"
                    }`}
                >
                    {loading ? "로딩 중..." : "프롬프트 생성하기"}
                </button>
            </form>
        </div>
    );
};

export default Input;
