# 디지털비즈니스전략세미나 학습 사이트 — 개발일지

## 프로젝트 개요
- **프로젝트명**: Digital Biz 전략세미나
- **도메인**: digitalbiz.dreamitbiz.com
- **기술 스택**: React 19 + Vite 7 + Supabase
- **GitHub**: https://github.com/aebonlee/digitalbiz

---

## 2026-03-14 — 초기 구축 완료

### 1. 프로젝트 초기화
- `package.json` 생성 (React 19, Vite 7, Supabase, React Router DOM v7)
- `vite.config.js` — port 5175, 404.html 자동 복사 플러그인
- `index.html` — 디지털비즈 전용 메타태그, og:image, theme-color #1E40AF
- `CNAME` — digitalbiz.dreamitbiz.com
- `.gitignore`, `.env.example`, `public/favicon.svg`

### 2. 핵심 인프라 (koreatech 기반)
- **Contexts** (4개): ThemeContext, LanguageContext, AuthContext, ToastContext
- **Hooks** (3개): useAOS, useCodeCopy, useTableScroller
- **Utils**: supabase.js, auth.js, searchStorage.js
- **Components**: Navbar, Footer, SearchModal, SEOHead, AuthGuard, Pagination
- `src/main.jsx`, `src/App.jsx` — React 19 createRoot

### 3. 설정 파일
- `src/config/site.js` — 브랜드: "Digital / Biz / 전략", 기본색 #1E40AF
  - 7개 메뉴: 홈, 과목소개(4), 강의 콘텐츠(13), AI 활용(9), 강의자료, 참고자료, 커뮤니티(4)
- `src/config/admin.js` — 관리자 이메일 목록

### 4. 번역 파일
- `src/utils/translations.js` — 725줄, 한/영 번역
  - nav, site, auth, admin, community, pagination, lesson, aiTips 등 전체 키 세트

### 5. 스타일 (13개 CSS 파일)
- base.css (--primary-blue: #1E40AF), navbar.css, hero.css, footer.css
- auth.css, animations.css, search.css, toast.css, dark-mode.css
- responsive.css, site.css, shop.css
- index.css — 전체 import

### 6. 레이아웃 및 라우팅
- `src/layouts/PublicLayout.jsx` — 50+ 페이지 lazy import, 전체 라우트 정의

### 7. 페이지 구현 (총 53개 파일)

#### 7a. 과목 소개 (4페이지, 새로 작성)
- `CourseOverview.jsx` — 과목 소개, 학습 목표, 수업 방식, 평가
- `WeeklyPlan.jsx` — 15주차 강의 계획표 (링크 포함)
- `Syllabus.jsx` — 강의계획서, 평가 기준, 수업 규칙
- `CaseStudyGuide.jsx` — 사례분석 보고서 작성 가이드

#### 7b. 강의 허브
- `LessonHub.jsx` — 15주차 강의 카드 그리드 (중간/기말 포함)

#### 7c. 주차별 강의 콘텐츠 (13페이지, 새로 작성)
| 주차 | 파일 | 주제 |
|------|------|------|
| 1주 | Week01Intro.jsx | 디지털 비즈니스 개론 |
| 2주 | Week02Transformation.jsx | 디지털 트랜스포메이션 |
| 3주 | Week03Platform.jsx | 플랫폼 비즈니스 모델 |
| 4주 | Week04DataDriven.jsx | 데이터 기반 의사결정 |
| 5주 | Week05Marketing.jsx | 디지털 마케팅 전략 |
| 6주 | Week06Ecommerce.jsx | 이커머스와 온라인 유통 |
| 7주 | Week07SocialMedia.jsx | 소셜 미디어 전략 |
| 9주 | Week09AiBusiness.jsx | AI와 비즈니스 혁신 |
| 10주 | Week10Fintech.jsx | 핀테크와 디지털 금융 |
| 11주 | Week11Subscription.jsx | 구독 경제와 SaaS |
| 12주 | Week12Startup.jsx | 디지털 스타트업 전략 |
| 13주 | Week13Ethics.jsx | 사이버 보안과 디지털 윤리 |
| 14주 | Week14Global.jsx | 글로벌 디지털 비즈니스 |

#### 7d. AI 활용 가이드 (9페이지, koreatech 기반)
- AiTipsHome, AiTipsChatGPT, AiTipsClaude, AiTipsGemini, AiTipsCopilot
- AiTipsPrompt, AiTipsCoding, AiTipsWriting, AiTipsLearning

#### 7e. 커뮤니티 (12페이지, koreatech 기반)
- Board / BoardDetail / BoardWrite
- Gallery / GalleryDetail / GalleryWrite
- Portfolio / PortfolioDetail / PortfolioWrite
- Websites / WebsiteDetail / WebsiteWrite

#### 7f. 참고자료 (4페이지, koreatech 기반)
- Lectures / LectureDetail / LectureWrite / LectureMaterials

#### 7g. 인증/공통 (6페이지, koreatech 기반)
- Home, Login, Register, ForgotPassword, MyPage, NotFound, Admin

### 8. 홈페이지
- Hero: "디지털 시대의 / 비즈니스 전략을 설계하다"
- 13개 커리큘럼 카드 + 8개 AI Tips 카드

### 9. 빌드 결과
- `npm run build` 성공 (149 modules, 2.93s)
- dist: index.html + CSS 96.89kB + JS 287.84kB (main bundle, gzip 90.41kB)
- 총 56개 chunk 생성

---

## 주요 변경사항 (koreatech → digitalbiz)

| 항목 | koreatech | digitalbiz |
|------|-----------|------------|
| 과목명 | 컴퓨팅 사고 | 디지털비즈니스전략세미나 |
| 브랜드 | Korea Tech CT | Digital Biz 전략 |
| 테마색 | #0046C8 | #1E40AF |
| 주차 수 | 11주 | 15주 (13개 콘텐츠) |
| 라우트 | /ct/*, /python/* | /course/*, /lessons/* |
| 도메인 | koreatech.dreamitbiz.com | digitalbiz.dreamitbiz.com |
| 포트 | 5174 | 5175 |
