# 👤 Vata-FE: 나만의 AI 프로필 이미지 생성기 (Frontend)

Stable Diffusion 기반의 SNS 아바타 생성 웹 서비스의 "프론트엔드 레포지토리"입니다.  
사용자의 성별, MBTI, 취미 등을 입력하면 AI가 개성 있는 프로필 이미지를 생성해줍니다.

## 🛠️ 기술 스택

- React + TypeScript
- Tailwind CSS (사용자 정의 커스터마이징 포함)
- React Router v6
- Create React App (CRA) 기반 실행
- Axios (Interceptor 포함)
- localStorage 기반 세션 및 토큰 관리
- 환경 변수 기반 Mock 모드 지원

## 📂 프로젝트 주요 구조

```
Vata-FE
├── .env                  : 환경 변수  
├── public/               
│   ├── images/           : Token 발급 가이드용 이미지  
│   └── index.html        : 앱 진입점  
├── src/                 
│   ├── api/              : axios 인스턴스 설정 및 accessToken.ts
│   ├── pages/            : 주요 페이지 컴포넌트  
│   └── index.tsx         : React 앱 진입점  
├── tailwind.config.js    : Tailwind 설정  
├── postcss.config.js     : PostCSS 설정  
└── package.json          : 프로젝트 의존성 및 스크립트 설정
```

## 🌐 배포

해당 프론트엔드 프로젝트는 **Vercel**을 통해 배포 및 운영되고 있으며, 직접 서비스 상태를 관리하고 있습니다.  
👉 [배포 주소 바로가기](https://vata-fe-1cng.vercel.app/)

## 🧪 실행 방법 (로컬 테스트용)

```
npm install
npm start
```

## ✅ 구현 기능 요약

- 회원가입 / 로그인 기능
- Access Token 등록 및 수정 기능
- 유저의 입력 기반 프로필 이미지 생성
- 생성된 이미지 보관함 확인 및 다운로드
- Mock 모드 전환 가능
- 사용자 세션 기반 라우팅 처리
