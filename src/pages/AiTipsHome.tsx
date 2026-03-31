import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import SEOHead from '../components/SEOHead';
import useAOS from '../hooks/useAOS';

const byType = [
  { path: '/ai-tips/chatgpt', icon: '💬', title: 'ChatGPT', desc: 'OpenAI의 대화형 AI 활용법' },
  { path: '/ai-tips/claude', icon: '🤖', title: 'Claude', desc: 'Anthropic의 AI 어시스턴트 활용법' },
  { path: '/ai-tips/gemini', icon: '✨', title: 'Gemini', desc: 'Google의 멀티모달 AI 활용법' },
  { path: '/ai-tips/copilot', icon: '👨‍💻', title: 'Copilot', desc: 'GitHub AI 코딩 어시스턴트 활용법' },
];

const byFunction = [
  { path: '/ai-tips/prompt', icon: '✏️', title: '프롬프트 작성법', desc: '효과적인 프롬프트 엔지니어링' },
  { path: '/ai-tips/coding', icon: '💻', title: 'AI 코딩 활용', desc: '코드 생성, 디버깅, 리팩토링' },
  { path: '/ai-tips/writing', icon: '📝', title: 'AI 문서 작성', desc: '보고서, 요약, 번역, 이메일' },
  { path: '/ai-tips/learning', icon: '📚', title: 'AI 학습 활용', desc: '개념 설명, 퀴즈, 학습 계획' },
];

const AiTipsHome = () => {
  const { t } = useLanguage();
  useAOS();

  return (
    <>
      <SEOHead title={t('site.aiTips.title')} path="/ai-tips" />

      <section className="page-header">
        <div className="container">
          <h1>{t('site.aiTips.title')}</h1>
          <p>{t('site.aiTips.subtitle')}</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 style={{ marginBottom: '1.5rem' }}>AI 종류별</h2>
          <div className="curriculum-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
            {byType.map((item, i) => (
              <Link
                to={item.path}
                key={item.path}
                className="curriculum-card"
                data-aos="fade-up"
                data-aos-delay={i * 50}
              >
                <span className="curriculum-icon">{item.icon}</span>
                <h3 className="curriculum-card-title">{item.title}</h3>
                <p className="curriculum-card-desc">{item.desc}</p>
              </Link>
            ))}
          </div>

          <h2 style={{ marginTop: '3rem', marginBottom: '1.5rem' }}>기능별</h2>
          <div className="curriculum-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
            {byFunction.map((item, i) => (
              <Link
                to={item.path}
                key={item.path}
                className="curriculum-card"
                data-aos="fade-up"
                data-aos-delay={i * 50}
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

export default AiTipsHome;
