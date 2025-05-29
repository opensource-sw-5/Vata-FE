# Vata-FE (아바타 이미지 생성 웹 서비스)

Stable Diffusion 기반의 SNS 아바타 생성 프론트엔드 프로젝트입니다.

# 기술 스택

- React + TypeScript
- Tailwind CSS (커스텀 설정 적용)
- Vite (CRA로 대체 가능)
- React Router v6
- localStorage 기반 상태 관리
- .env 기반 Mock 테스트 분기 (REACT_APP_MOCK_MODE)
- 이미지 placeholder 활용 (via.placeholder.com)
- [예정] Stable Diffusion API 연동

# 주요 기능

-  로그인 / 회원가입 (localStorage 기반 사용자 관리)
-  Access Token 설정 (API 인증을 위한 토큰 설정)
-  프로필 생성 입력 
   - 성별, MBTI, 취미, 캐릭터, 아바타 선택 및 직접 입력
   - 기타 설명 추가 (선택사항)
-  생성된 이미지의 결과
  - 생성된 아바타 이미지 보기
  - 다운로드, 이미지 재생성, 홈 화면 이동
-  보관함
  - 생성된 아바타 최대 8개 저장 슬롯
  - 기본 3개 임시 이미지 표시
  - [예정] API 연동 시 사용자별 보관함 연동


# 실행 방법

npm install
npm start