import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AuthGuard from '../components/AuthGuard';
import AdminGuard from '../components/AdminGuard';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { LicenseProvider } from '../components/LicenseGuard';
import LockOverlay from '../components/LockOverlay';
import useCodeCopy from '../hooks/useCodeCopy';
import useTableScroller from '../hooks/useTableScroller';

// 페이지 lazy import
const Home = lazy(() => import('../pages/Home'));
const CourseOverview = lazy(() => import('../pages/CourseOverview'));
const WeeklyPlan = lazy(() => import('../pages/WeeklyPlan'));
const Syllabus = lazy(() => import('../pages/Syllabus'));
const CaseStudyGuide = lazy(() => import('../pages/CaseStudyGuide'));
const Login = lazy(() => import('../pages/Login'));
const Register = lazy(() => import('../pages/Register'));
const ForgotPassword = lazy(() => import('../pages/ForgotPassword'));
const MyPage = lazy(() => import('../pages/MyPage'));
const LessonHub = lazy(() => import('../pages/LessonHub'));
const Week01Intro = lazy(() => import('../pages/Week01Intro'));
const Week02Transformation = lazy(() => import('../pages/Week02Transformation'));
const Week03Platform = lazy(() => import('../pages/Week03Platform'));
const Week04DataDriven = lazy(() => import('../pages/Week04DataDriven'));
const Week05Marketing = lazy(() => import('../pages/Week05Marketing'));
const Week06Ecommerce = lazy(() => import('../pages/Week06Ecommerce'));
const Week07SocialMedia = lazy(() => import('../pages/Week07SocialMedia'));
const Week09AiBusiness = lazy(() => import('../pages/Week09AiBusiness'));
const Week10Fintech = lazy(() => import('../pages/Week10Fintech'));
const Week11Subscription = lazy(() => import('../pages/Week11Subscription'));
const Week12Startup = lazy(() => import('../pages/Week12Startup'));
const Week13Ethics = lazy(() => import('../pages/Week13Ethics'));
const Week14Global = lazy(() => import('../pages/Week14Global'));
const AiTipsHome = lazy(() => import('../pages/AiTipsHome'));
const AiTipsChatGPT = lazy(() => import('../pages/AiTipsChatGPT'));
const AiTipsClaude = lazy(() => import('../pages/AiTipsClaude'));
const AiTipsGemini = lazy(() => import('../pages/AiTipsGemini'));
const AiTipsCopilot = lazy(() => import('../pages/AiTipsCopilot'));
const AiTipsPrompt = lazy(() => import('../pages/AiTipsPrompt'));
const AiTipsCoding = lazy(() => import('../pages/AiTipsCoding'));
const AiTipsWriting = lazy(() => import('../pages/AiTipsWriting'));
const AiTipsLearning = lazy(() => import('../pages/AiTipsLearning'));
const Board = lazy(() => import('../pages/Board'));
const BoardDetail = lazy(() => import('../pages/BoardDetail'));
const BoardWrite = lazy(() => import('../pages/BoardWrite'));
const Gallery = lazy(() => import('../pages/Gallery'));
const GalleryDetail = lazy(() => import('../pages/GalleryDetail'));
const GalleryWrite = lazy(() => import('../pages/GalleryWrite'));
const Portfolio = lazy(() => import('../pages/Portfolio'));
const PortfolioDetail = lazy(() => import('../pages/PortfolioDetail'));
const PortfolioWrite = lazy(() => import('../pages/PortfolioWrite'));
const Websites = lazy(() => import('../pages/Websites'));
const WebsiteDetail = lazy(() => import('../pages/WebsiteDetail'));
const WebsiteWrite = lazy(() => import('../pages/WebsiteWrite'));
const LectureMaterials = lazy(() => import('../pages/LectureMaterials'));
const Lectures = lazy(() => import('../pages/Lectures'));
const LectureDetail = lazy(() => import('../pages/LectureDetail'));
const LectureWrite = lazy(() => import('../pages/LectureWrite'));
const Admin = lazy(() => import('../pages/Admin'));
const AdminDashboard = lazy(() => import('../pages/admin/AdminDashboard'));
const NotFound = lazy(() => import('../pages/NotFound'));

const Loading = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
    <div className="loading-spinner"></div>
  </div>
);

const PublicLayout = () => {
  useCodeCopy();
  useTableScroller();

  return (
    <LicenseProvider>
    <div className="site-wrapper">
      <Navbar />
      <main className="site-main">
        <Suspense fallback={<Loading />}>
          <Routes>
            {/* Home */}
            <Route path="/" element={<Home />} />

            {/* Auth */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/mypage" element={<AuthGuard><MyPage /></AuthGuard>} />

            {/* Course Info */}
            <Route path="/course/overview" element={<CourseOverview />} />
            <Route path="/course/weekly-plan" element={<WeeklyPlan />} />
            <Route path="/course/syllabus" element={<Syllabus />} />
            <Route path="/course/case-study" element={<CaseStudyGuide />} />

            {/* Lessons */}
            <Route path="/lessons" element={<LessonHub />} />
            <Route path="/lessons/intro" element={<Week01Intro />} />
            <Route path="/lessons/transformation" element={<Week02Transformation />} />
            <Route path="/lessons/platform" element={<Week03Platform />} />
            <Route path="/lessons/data-driven" element={<Week04DataDriven />} />
            <Route path="/lessons/marketing" element={<Week05Marketing />} />
            <Route path="/lessons/ecommerce" element={<Week06Ecommerce />} />
            <Route path="/lessons/social-media" element={<Week07SocialMedia />} />
            <Route path="/lessons/ai-business" element={<Week09AiBusiness />} />
            <Route path="/lessons/fintech" element={<Week10Fintech />} />
            <Route path="/lessons/subscription" element={<Week11Subscription />} />
            <Route path="/lessons/startup" element={<Week12Startup />} />
            <Route path="/lessons/ethics" element={<Week13Ethics />} />
            <Route path="/lessons/global" element={<Week14Global />} />

            {/* AI Tips */}
            <Route path="/ai-tips" element={<AiTipsHome />} />
            <Route path="/ai-tips/chatgpt" element={<AiTipsChatGPT />} />
            <Route path="/ai-tips/claude" element={<AiTipsClaude />} />
            <Route path="/ai-tips/gemini" element={<AiTipsGemini />} />
            <Route path="/ai-tips/copilot" element={<AiTipsCopilot />} />
            <Route path="/ai-tips/prompt" element={<AiTipsPrompt />} />
            <Route path="/ai-tips/coding" element={<AiTipsCoding />} />
            <Route path="/ai-tips/writing" element={<AiTipsWriting />} />
            <Route path="/ai-tips/learning" element={<AiTipsLearning />} />

            {/* Lectures (강의자료) */}
            <Route path="/lectures/materials" element={<LectureMaterials />} />
            <Route path="/lectures" element={<LectureMaterials />} />

            {/* References (참고자료) */}
            <Route path="/references" element={<Lectures />} />
            <Route path="/references/write" element={<AuthGuard><LectureWrite /></AuthGuard>} />
            <Route path="/references/edit/:id" element={<AuthGuard><LectureWrite /></AuthGuard>} />
            <Route path="/references/:id" element={<LectureDetail />} />

            {/* Community — Board */}
            <Route path="/community/board" element={<Board />} />
            <Route path="/community/board/write" element={<AuthGuard><BoardWrite /></AuthGuard>} />
            <Route path="/community/board/:id" element={<BoardDetail />} />

            {/* Community — Gallery */}
            <Route path="/community/gallery" element={<Gallery />} />
            <Route path="/community/gallery/write" element={<AuthGuard><GalleryWrite /></AuthGuard>} />
            <Route path="/community/gallery/edit/:id" element={<AuthGuard><GalleryWrite /></AuthGuard>} />
            <Route path="/community/gallery/:id" element={<GalleryDetail />} />

            {/* Community — Portfolio */}
            <Route path="/community/portfolio" element={<Portfolio />} />
            <Route path="/community/portfolio/write" element={<AuthGuard><PortfolioWrite /></AuthGuard>} />
            <Route path="/community/portfolio/edit/:id" element={<AuthGuard><PortfolioWrite /></AuthGuard>} />
            <Route path="/community/portfolio/:id" element={<PortfolioDetail />} />

            {/* Community — Websites */}
            <Route path="/community/websites" element={<Websites />} />
            <Route path="/community/websites/write" element={<AuthGuard><WebsiteWrite /></AuthGuard>} />
            <Route path="/community/websites/edit/:id" element={<AuthGuard><WebsiteWrite /></AuthGuard>} />
            <Route path="/community/websites/:id" element={<WebsiteDetail />} />

            {/* Admin */}
            <Route path="/admin" element={<AuthGuard><Admin /></AuthGuard>} />
            <Route path="/admin/dashboard/*" element={<AdminGuard><AdminDashboard /></AdminGuard>} />

            {/* Legacy redirects */}
            <Route path="/board" element={<Navigate to="/community/board" replace />} />
            <Route path="/board/:id" element={<Navigate to="/community/board" replace />} />

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <LockOverlay />
    </div>
    </LicenseProvider>
  );
};

export default PublicLayout;
