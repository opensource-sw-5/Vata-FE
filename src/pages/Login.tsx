const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });   if (form.email === savedEmail && form.password === savedPassword) {
      // TODO: 추후 /api/v1/auth/login API 호출로 대체 예정
      localStorage.setItem("email", form.email);
      alert("로그인에 성공하였습니다!");
      navigate("/");
    } else {
      alert("이메일 또는 비밀번호가 일치하지 않습니다. 다시 시도해주세요.");
    }  <input
          type="text"
          name="email"
          placeholder="이메일"
          value={form.email}
          onChange={handleChange}
          className="border rounded px-4 py-2"
          required
        />