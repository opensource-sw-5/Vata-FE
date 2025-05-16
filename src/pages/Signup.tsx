  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    console.log("회원가입 요청:", form);

    // TODO: 추후 /api/v1/auth/signup API로 대체 예정
    localStorage.setItem("signup_username", form.username);
    localStorage.setItem("signup_password", form.password);

    alert("회원가입이 완료되었습니다. 로그인해주세요!");
    navigate("/login"); // 로그인 페이지로 이동
  };
