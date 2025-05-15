This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

# FSD 기반 Folder structure

/app
├─ layout.tsx # Root layout (글로벌 SCSS import 가능)
├─ page.tsx # 홈 페이지
├─ about/page.tsx # 라우트별 페이지
├─ (auth)/login/page.tsx # 중첩 라우트

/src
├─ entities/ # 도메인 단위 (유저, 포스트 등 핵심 모델)
│ └─ user/
│ ├─ model/ # types, 상태관리, API 등
│ ├─ ui/ # 순수 UI 컴포넌트
│ └─ lib/ # 유틸 함수, mapper 등
├─ features/ # 유저 인터랙션 단위 (예: 로그인 폼)
│ └─ auth/
│ ├─ ui/ # <LoginForm /> 같은 UI
│ └─ model/ # 상태, api 호출
├─ shared/
│ ├─ ui/ # 공통 버튼, 모달 등
│ ├─ hooks/ # 커스텀 훅
│ ├─ lib/ # 공통 유틸 함수
│ ├─ constants/ # 상수
│ ├─ types/ # 전역 타입 정의
│ └─ styles/ # 글로벌 SCSS, mixins, variables
├─ widgets/ # 블록 UI 조합 (예: Header, Sidebar)

FSD에서는 의존 방향이 항상 아래에서 위로만 흐르도록 권장한다.

shared → entities → features → widgets → app
