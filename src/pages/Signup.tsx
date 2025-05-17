const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  }); // TODO: 추후 /api/v1/auth/signup API로 대체 예정
    localStorage.setItem("signup_email", form.email);  
    localStorage.setItem("signup_password", form.password);   <input
          type="email"
          name="email"
          placeholder="이메일"
          value={form.email}
          onChange={handleChange}
          className="border rounded px-4 py-2"
          required
        />