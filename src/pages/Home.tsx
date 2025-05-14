import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 to-yellow-100 relative">
      <div className="flex flex-col items-center text-center">
        <h1 className="text-[6vw] font-extrabold text-pink-600 drop-shadow-lg mb-12 flex items-center gap-2">
          Vata <span className="text-[4vw]">👤</span>
        </h1>
        <p className="text-[2vw] text-gray-700 mb-14 leading-relaxed">
          vata와 함께 나만의 아바타를 만들어보세요!
        </p>
      </div>
    </div>
  );
};

export default Home;

