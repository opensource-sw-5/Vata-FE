import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axiosInstance from "../api/api";
import {HomeIcon} from "@heroicons/react/24/solid";

const containsKorean = (text: string) => /[가-힣]/.test(text);


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
    const [credits, setCredits] = useState<number | null>(null);
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

        const fetchCredits = async () => {
            try {
                const res = await axiosInstance.get("/api/profile/credits");
                setCredits(res.data?.credits ?? 0);
            } catch (err) {
                console.error("크레딧 조회 실패", err);
                setCredits(null);
            }
        };

        fetchCredits();
    }, [navigate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({...form, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const creditRes = await axiosInstance.get("/api/profile/credits");
            const credits = creditRes.data?.credits ?? 0;

            if (credits <= 0) {
                alert("더 이상 이미지를 생성할 수 없습니다! (크레딧 부족)");
                setLoading(false);
                return;
            }

            if (form.hobby === "직접입력" && containsKorean(form.otherHobby)) {
                alert("직접 입력한 취미는 영어로 작성해주세요.");
                setLoading(false);
                return;
            }

            if (form.etc && containsKorean(form.otherHobby)) {
                alert("추가 설명 (Etc)은 영어로 작성해주세요.");
                setLoading(false);
                return;
            }

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
            <button
                onClick={() => navigate("/")}
                className="absolute top-6 left-6 flex items-center gap-1 text-pink-600 hover:text-pink-800 font-semibold"
            >
                <HomeIcon className="w-5 h-5"/>
                <span>홈으로</span>
            </button>

            <form onSubmit={handleSubmit}
                  className="bg-white p-10 rounded-2xl shadow-xl w-[90vw] max-w-[500px] flex flex-col gap-5">
                <h2 className="text-3xl font-bold text-center text-pink-600">프로필 생성 입력</h2>

                {credits !== null && (
                    <p className="text-center text-gray-600 text-sm font-medium -mb-2">
                        남은 생성 가능 횟수:{" "}
                        <span className="text-pink-500 font-bold">
              {Math.floor(credits / 3)}
            </span>
                    </p>
                )}

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
                        placeholder="Enter your hobby in English"
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
                    placeholder="(Optional) e.g., with dreamy lighting – *English only*"
                    className="border px-4 py-2 rounded"
                />


                <button
                    type="submit"
                    disabled={loading}
                    className={`text-white font-semibold py-2 rounded ${
                        loading ? "bg-gray-400" : "bg-pink-500 hover:bg-pink-600"
                    }`}
                >
                    {loading ? "로딩 중..." : "이미지 생성하기"}
                </button>
            </form>
        </div>
    );
};

export default Input;
