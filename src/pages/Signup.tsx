  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-yellow-100 to-pink-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded-2xl shadow-xl w-[400px] flex flex-col gap-5"
      >
        <h2 className="text-3xl font-bold text-center text-pink-600">회원가입</h2>

        <input
          type="text"
          name="name"
          placeholder="이름"
          value={form.name}
          onChange={handleChange}
          className="border rounded px-4 py-2"
          required
        />

        <input
          type="text"
          name="username"
          placeholder="아이디"
          value={form.username}
          onChange={handleChange}
          className="border rounded px-4 py-2"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="비밀번호"
          value={form.password}
          onChange={handleChange}
          className="border rounded px-4 py-2"
          required
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="비밀번호 확인"
          value={form.confirmPassword}
          onChange={handleChange}
          className="border rounded px-4 py-2"
          required
        />

        <button
          type="submit"
          className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 rounded"
        >
          가입하기
        </button>
      </form>
    </div>
  );
};

export default Signup;
