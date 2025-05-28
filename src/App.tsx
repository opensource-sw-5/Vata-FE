import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import AccessToken from "./pages/AccessToken";
import Input from "./pages/Input";
import Result from "./pages/Result";
import Storage from "./pages/Storage"; // 보관함 import 추가

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/token" element={<AccessToken />} />
        <Route path="/input" element={<Input />} />
        <Route path="/result" element={<Result />} />
        <Route path="/storage" element={<Storage />} /> {/* 보관함 라우팅 추가 */}
      </Routes>
    </Router>
  );
}

export default App;
