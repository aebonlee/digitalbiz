import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import SEOHead from '../components/SEOHead';
import useAOS from '../hooks/useAOS';
import site from '../config/site';

const Home = () => {
  const { t } = useLanguage();
  useAOS();

  const aiTips = [
    { path: '/ai-tips/chatgpt',  title: 'ChatGPT',        desc: 'OpenAI의 대화형 AI 활용법',          icon: '\uD83D\uDCAC' },
    { path: '/ai-tips/claude',   title: 'Claude',          desc: 'Anthropic의 AI 어시스턴트 활용법',    icon: '\uD83E\uDD16' },
    { path: '/ai-tips/gemini',   title: 'Gemini',          desc: 'Google의 멀티모달 AI 활용법',         icon: '\u2728' },
    { path: '/ai-tips/copilot',  title: 'Copilot',         desc: 'GitHub AI 코딩 어시스턴트 활용법',     icon: '\uD83D\uDC68\u200D\uD83D\uDCBB' },
    { path: '/ai-tips/prompt',   title: '프롬프트 작성법',   desc: '효과적인 프롬프트 엔지니어링',         icon: '\u270F\uFE0F' },
    { path: '/ai-tips/coding',   title: 'AI 코딩 활용',     desc: '코드 생성, 디버깅, 리팩토링',         icon: '\uD83D\uDCBB' },
    { path: '/ai-tips/writing',  title: 'AI 문서 작성',     desc: '보고서, 요약, 번역, 이메일',          icon: '\uD83D\uDCDD' },
    { path: '/ai-tips/learning', title: 'AI 학습 활용',     desc: '개념 설명, 퀴즈, 학습 계획',          icon: '\uD83D\uDCDA' },
  ];

  const chapters = [
    { path: '/lessons/intro',         title: '디지털 비즈니스 개론',     desc: '디지털 비즈니스의 정의, 진화, 생태계',      icon: '\uD83C\uDF10', step: '1주차' },
    { path: '/lessons/transformation', title: '디지털 트랜스포메이션',   desc: 'DX 전략, 성공/실패 사례, 프레임워크',       icon: '\uD83D\uDD04', step: '2주차' },
    { path: '/lessons/platform',       title: '플랫폼 비즈니스 모델',   desc: '양면시장, 네트워크 효과, 플랫폼 전략',      icon: '\uD83C\uDFD7\uFE0F', step: '3주차' },
    { path: '/lessons/data-driven',    title: '데이터 기반 의사결정',   desc: '빅데이터, 분석 프레임워크, 데이터 전략',     icon: '\uD83D\uDCCA', step: '4주차' },
    { path: '/lessons/marketing',      title: '디지털 마케팅 전략',     desc: 'SEO/SEM, 콘텐츠 마케팅, 그로스 해킹',      icon: '\uD83D\uDCE2', step: '5주차' },
    { path: '/lessons/ecommerce',      title: '이커머스와 온라인 유통', desc: '이커머스 모델, O2O, D2C 전략',             icon: '\uD83D\uDED2', step: '6주차' },
    { path: '/lessons/social-media',   title: '소셜 미디어 전략',       desc: 'SNS 마케팅, 인플루언서, 커뮤니티',         icon: '\uD83D\uDCF1', step: '7주차' },
    { path: '/lessons/ai-business',    title: 'AI와 비즈니스 혁신',     desc: '생성형 AI, 자동화, AI 비즈니스 모델',       icon: '\uD83E\uDD16', step: '9주차' },
    { path: '/lessons/fintech',        title: '핀테크와 디지털 금융',   desc: '디지털 결제, 블록체인, 인슈어테크',         icon: '\uD83D\uDCB3', step: '10주차' },
    { path: '/lessons/subscription',   title: '구독 경제와 SaaS',       desc: '구독 모델, SaaS 전략, CLV',               icon: '\uD83D\uDD01', step: '11주차' },
    { path: '/lessons/startup',        title: '디지털 스타트업 전략',   desc: '린 스타트업, MVP, 스케일업 전략',           icon: '\uD83D\uDE80', step: '12주차' },
    { path: '/lessons/ethics',         title: '사이버 보안과 디지털 윤리', desc: '개인정보, 사이버 보안, ESG',             icon: '\uD83D\uDD12', step: '13주차' },
    { path: '/lessons/global',         title: '글로벌 디지털 비즈니스', desc: '글로벌 확장, 현지화, 크로스보더',           icon: '\uD83C\uDF0D', step: '14주차' },
  ];

  return (
    <>
      <SEOHead
        title={`${site.name} | ${site.nameKo}`}
        description={site.description}
      />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content" data-aos="fade-up">
            <h1 className="hero-title">
              <span className="hero-title-line1">디지털 시대의</span>{' '}
              <span className="hero-title-line2">비즈니스 전략을 설계하다</span>
            </h1>
            <p className="hero-description">{t('site.home.heroDesc')}</p>
            <div className="hero-actions">
              <Link to="/lessons" className="hero-btn primary">{t('site.home.startLearning')}</Link>
              <Link to="/community/board" className="hero-btn secondary">{t('site.home.goToBoard')}</Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Course */}
      <section className="section ct-intro-section">
        <div className="container">
          <div className="ct-intro" data-aos="fade-up">
            <h2 className="section-title">{t('site.home.aboutCourse')}</h2>
            <p className="ct-description">{t('site.home.courseDescription')}</p>
          </div>
          <div className="learning-goals" data-aos="fade-up" data-aos-delay="200">
            <h3>{t('site.home.learningGoals')}</h3>
            <ul className="goals-list">
              <li>{t('site.home.goal1')}</li>
              <li>{t('site.home.goal2')}</li>
              <li>{t('site.home.goal3')}</li>
              <li>{t('site.home.goal4')}</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Curriculum Cards */}
      <section className="section curriculum-section">
        <div className="container">
          <h2 className="section-title" data-aos="fade-up">{t('site.home.curriculum')}</h2>
          <p className="section-subtitle" data-aos="fade-up">{t('site.home.curriculumDesc')}</p>
          <div className="curriculum-grid">
            {chapters.map((ch, i) => (
              <Link
                to={ch.path}
                key={ch.path}
                className="curriculum-card"
                data-aos="fade-up"
                data-aos-delay={i * 80}
              >
                <span className="curriculum-step">{ch.step}</span>
                <span className="curriculum-icon">{ch.icon}</span>
                <h3 className="curriculum-card-title">{ch.title}</h3>
                <p className="curriculum-card-desc">{ch.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* AI Tips Cards */}
      <section className="section curriculum-section">
        <div className="container">
          <h2 className="section-title" data-aos="fade-up">{t('site.aiTips.title')}</h2>
          <p className="section-subtitle" data-aos="fade-up">{t('site.aiTips.subtitle')}</p>
          <div className="curriculum-grid">
            {aiTips.map((item, i) => (
              <Link
                to={item.path}
                key={item.path}
                className="curriculum-card"
                data-aos="fade-up"
                data-aos-delay={i * 80}
              >
                <span className="curriculum-icon">{item.icon}</span>
                <h3 className="curriculum-card-title">{item.title}</h3>
                <p className="curriculum-card-desc">{item.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
