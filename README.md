# 👤 Vata-FE: 나만의 AI 프로필 이미지 생성기 (Frontend)

Stable Diffusion 기반의 SNS 아바타 생성 웹 서비스의 **프론트엔드 레포지토리**입니다.  
사용자가 성별, MBTI, 취미 등을 입력하면, AI가 개성 있는 프로필 이미지를 생성해줍니다.

## 🛠️ 기술 스택

- **React + TypeScript**: SPA 기반 UI 개발
- **Tailwind CSS**: 빠르고 직관적인 스타일링
- **React Router v6**: 페이지 라우팅 관리
- **Axios + Interceptor**: API 통신 및 인증 처리
- **localStorage / sessionStorage**: 사용자 세션 및 토큰 관리
- **환경 변수 (.env)**: Mock 모드 등 실행 환경 제어
- **Create React App (CRA)**: 프로젝트 초기 설정

## 📂 프로젝트 주요 구조

```bash
Vata-FE-main/
├── .env                        : 환경 변수 설정
├── .gitignore                 : Git 무시 파일 설정
├── README.md                  : 프로젝트 설명 문서
├── package.json               : 프로젝트 의존성 및 실행 스크립트
├── package-lock.json          : 버전 고정용 lock 파일
├── postcss.config.js          : PostCSS 설정
├── tailwind.config.js         : Tailwind 설정
├── tsconfig.json              : TypeScript 컴파일러 설정
├── .github/                   : GitHub 이슈/PR 템플릿
│   ├── ISSUE_TEMPLATE/
│   │   └── 1-feature-request.yaml
│   └── PULL_REQUEST_TEMPLATE.md
├── public/
│   ├── index.html             : 앱 진입점
│   ├── favicon.ico           : 파비콘 (브라우저 탭 아이콘)
│   ├── manifest.json         : PWA 메타 정보
│   └── images/               : Token 발급 가이드 이미지
│       ├── step1.png
│       ├── step2.png
│       ├── step3.png
│       └── step4.png
└── src/
    ├── App.tsx                : 루트 컴포넌트
    ├── App.css, index.css     : 전역 스타일
    ├── App.test.tsx, setupTests.ts : 테스트 설정
    ├── index.tsx              : React 앱 진입점
    ├── react-app-env.d.ts     : CRA 타입 선언
    ├── reportWebVitals.ts     : 성능 측정
    ├── api/                   : API 요청 관련 코드
    │   ├── api.ts             : Axios 인스턴스 설정
    │   └── accessToken.ts    : Access Token 검증 및 등록 요청
    └── pages/                 : 화면별 컴포넌트
        ├── Home.tsx          : 메인 화면
        ├── Login.tsx         : 로그인
        ├── Signup.tsx        : 회원가입 + 토큰 검증
        ├── Input.tsx         : 사용자 입력 폼
        ├── Result.tsx        : 생성 결과 화면
        ├── Storage.tsx       : 생성 이미지 보관함
        └── TokenGuide.tsx    : Token 발급 가이드
```

## 🌐 배포

해당 프론트엔드 프로젝트는 **Vercel**을 통해 배포 및 운영되고 있으며, 직접 서비스 상태를 관리하고 있습니다.  
👉 [배포 주소 바로가기](https://vata-fe-1cng.vercel.app/)

## 🧪 실행 방법 (로컬 테스트용)

```bash
1. 의존성 설치
npm install

2. 개발 서버 실행
npm start
```

## ✅ 구현 기능 요약

- 회원가입 / 로그인 기능
- Access Token 등록 및 수정 기능
- 사용자 입력 기반의 AI 프로필 이미지 생성
- 생성된 이미지 보관 및 다운로드
- 보관함에서 생성 이미지 목록 확인
- Mock 모드 전환 기능 (.env 기반)
- 로그인 여부에 따른 접근 제어 (sessionStorage 기반)
