 useEffect(() => { 
    const email = localStorage.getItem("email");
    if (!email) {
      alert("로그인이 필요합니다.");
      navigate("/login");
    }
  }, [navigate]); 