const TokenGuide = () => {
  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-pink-600">Access Token 발급 방법</h1>
      <ol className="list-decimal list-inside space-y-2 text-gray-700">
        <li>
          <a
            href="https://stability.ai/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline hover:text-blue-800"
          >
            https://stability.ai/
          </a>
           사이트에 접속한 후 화면에 보이는 "Use API" 버튼을 누른다.
        </li>
        <li>오른쪽 위의 로그인(Login) 버튼을 눌러 로그인한다. (회원가입이 되어있지 않다면 회원가입 후 로그인한다)</li>
        <li>로그인 후 오른쪽 위의 사람 아이콘(프로필)을 클릭한다.</li>
        <li>화면에 "API Keys" 메뉴가 보이며, "Date Created" 옆 복사 아이콘을 눌러 Access Token을 복사할 수 있다.</li>
      </ol>
    </div>
  );
};

export default TokenGuide;