import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import SEOHead from '../components/SEOHead';
import useAOS from '../hooks/useAOS';

const LessonHub = () => {
  const { t } = useLanguage();
  useAOS();

  const lessons = [
    { path: '/lessons/intro',          week: '1주차',  title: '디지털 비즈니스 개론',       desc: '디지털 비즈니스의 정의, 진화, 생태계',      icon: '\uD83C\uDF10' },
    { path: '/lessons/transformation',  week: '2주차',  title: '디지털 트랜스포메이션',       desc: 'DX 전략, 성공/실패 사례, 프레임워크',       icon: '\uD83D\uDD04' },
    { path: '/lessons/platform',        week: '3주차',  title: '플랫폼 비즈니스 모델',       desc: '양면시장, 네트워크 효과, 플랫폼 전략',      icon: '\uD83C\uDFD7\uFE0F' },
    { path: '/lessons/data-driven',     week: '4주차',  title: '데이터 기반 의사결정',       desc: '빅데이터, 분석 프레임워크, 데이터 전략',     icon: '\uD83D\uDCCA' },
    { path: '/lessons/marketing',       week: '5주차',  title: '디지털 마케팅 전략',         desc: 'SEO/SEM, 콘텐츠 마케팅, 그로스 해킹',      icon: '\uD83D\uDCE2' },
    { path: '/lessons/ecommerce',       week: '6주차',  title: '이커머스와 온라인 유통',     desc: '이커머스 모델, O2O, D2C 전략',             icon: '\uD83D\uDED2' },
    { path: '/lessons/social-media',    week: '7주차',  title: '소셜 미디어 전략',           desc: 'SNS 마케팅, 인플루언서, 커뮤니티',         icon: '\uD83D\uDCF1' },
    { path: null,                       week: '8주차',  title: '중간고사',                   desc: '1~7주차 내용 종합 평가',                   icon: '\uD83D\uDCDD', disabled: true },
    { path: '/lessons/ai-business',     week: '9주차',  title: 'AI와 비즈니스 혁신',         desc: '생성형 AI, 자동화, AI 비즈니스 모델',       icon: '\uD83E\uDD16' },
    { path: '/lessons/fintech',         week: '10주차', title: '핀테크와 디지털 금융',       desc: '디지털 결제, 블록체인, 인슈어테크',         icon: '\uD83D\uDCB3' },
    { path: '/lessons/subscription',    week: '11주차', title: '구독 경제와 SaaS',           desc: '구독 모델, SaaS 전략, CLV',               icon: '\uD83D\uDD01' },
    { path: '/lessons/startup',         week: '12주차', title: '디지털 스타트업 전략',       desc: '린 스타트업, MVP, 스케일업 전략',           icon: '\uD83D\uDE80' },
    { path: '/lessons/ethics',          week: '13주차', title: '사이버 보안과 디지털 윤리',   desc: '개인정보, 사이버 보안, ESG',               icon: '\uD83D\uDD12' },
    { path: '/lessons/global',          week: '14주차', title: '글로벌 디지털 비즈니스',     desc: '글로벌 확장, 현지화, 크로스보더',           icon: '\uD83C\uDF0D' },
    { path: null,                       week: '15주차', title: '기말고사',                   desc: '9~14주차 내용 종합 평가',                  icon: '\uD83D\uDCDD', disabled: true },
  ];

  return (
    <>
      <SEOHead title={t('site.lessons.title')} path="/lessons" />
      <section className="page-header">
        <div className="container">
          <h1>{t('site.lessons.title')}</h1>
          <p>{t('site.lessons.subtitle')}</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="curriculum-grid">
            {lessons.map((lesson, i) => {
              if (lesson.disabled) {
                return (
                  <div
                    key={lesson.week}
                    className="curriculum-card"
                    style={{ opacity: 0.5, pointerEvents: 'none' }}
                    data-aos="fade-up"
                    data-aos-delay={i * 60}
                  >
                    <span className="curriculum-step">{lesson.week}</span>
                    <span className="curriculum-icon">{lesson.icon}</span>
                    <h3 className="curriculum-card-title">{lesson.title}</h3>
                    <p className="curriculum-card-desc">{lesson.desc}</p>
                  </div>
                );
              }
              return (
                <Link
                  to={lesson.path}
                  key={lesson.week}
                  className="curriculum-card"
                  data-aos="fade-up"
                  data-aos-delay={i * 60}
                >
                  <span className="curriculum-step">{lesson.week}</span>
                  <span className="curriculum-icon">{lesson.icon}</span>
                  <h3 className="curriculum-card-title">{lesson.title}</h3>
                  <p className="curriculum-card-desc">{lesson.desc}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default LessonHub;
