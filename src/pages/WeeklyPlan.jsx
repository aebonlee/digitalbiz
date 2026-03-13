import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import SEOHead from '../components/SEOHead';
import useAOS from '../hooks/useAOS';

const WeeklyPlan = () => {
  const { t } = useLanguage();
  useAOS();

  const weeks = [
    { week: 1,  topic: '디지털 비즈니스 개론',       desc: '디지털 비즈니스의 정의, 진화, 생태계 이해',           path: '/lessons/intro' },
    { week: 2,  topic: '디지털 트랜스포메이션',       desc: 'DX 전략, 성공/실패 사례, 프레임워크',                path: '/lessons/transformation' },
    { week: 3,  topic: '플랫폼 비즈니스 모델',       desc: '양면시장, 네트워크 효과, 플랫폼 전략',               path: '/lessons/platform' },
    { week: 4,  topic: '데이터 기반 의사결정',       desc: '빅데이터, 분석 프레임워크, 데이터 전략',              path: '/lessons/data-driven' },
    { week: 5,  topic: '디지털 마케팅 전략',         desc: 'SEO/SEM, 콘텐츠 마케팅, 그로스 해킹',               path: '/lessons/marketing' },
    { week: 6,  topic: '이커머스와 온라인 유통',     desc: '이커머스 모델, O2O, D2C 전략',                      path: '/lessons/ecommerce' },
    { week: 7,  topic: '소셜 미디어 전략',           desc: 'SNS 마케팅, 인플루언서, 커뮤니티 빌딩',             path: '/lessons/social-media' },
    { week: 8,  topic: '중간고사 / 중간 정리',       desc: '1~7주차 내용 종합 평가',                            path: null },
    { week: 9,  topic: 'AI와 비즈니스 혁신',         desc: '생성형 AI, 자동화, AI 비즈니스 모델',                path: '/lessons/ai-business' },
    { week: 10, topic: '핀테크와 디지털 금융',       desc: '디지털 결제, 블록체인, 인슈어테크',                  path: '/lessons/fintech' },
    { week: 11, topic: '구독 경제와 SaaS',           desc: '구독 모델, SaaS 전략, CLV',                        path: '/lessons/subscription' },
    { week: 12, topic: '디지털 스타트업 전략',       desc: '린 스타트업, MVP, 스케일업 전략',                    path: '/lessons/startup' },
    { week: 13, topic: '사이버 보안과 디지털 윤리',   desc: '개인정보, 사이버 보안, ESG',                        path: '/lessons/ethics' },
    { week: 14, topic: '글로벌 디지털 비즈니스',     desc: '글로벌 확장, 현지화, 크로스보더',                    path: '/lessons/global' },
    { week: 15, topic: '기말고사 / 최종 정리',       desc: '9~14주차 내용 종합 평가',                           path: null },
  ];

  return (
    <>
      <SEOHead title={t('site.course.weeklyPlan.title')} path="/course/weekly-plan" />
      <section className="page-header">
        <div className="container">
          <h1>{t('site.course.weeklyPlan.title')}</h1>
          <p>{t('site.course.weeklyPlan.subtitle')}</p>
        </div>
      </section>

      <section className="lesson-content">
        <div className="container">
          <div className="lesson-body" data-aos="fade-up">
            <table className="lesson-table">
              <thead>
                <tr>
                  <th style={{ width: '80px' }}>{t('site.course.weeklyPlan.week')}</th>
                  <th style={{ width: '200px' }}>{t('site.course.weeklyPlan.topic')}</th>
                  <th>{t('site.course.weeklyPlan.description')}</th>
                </tr>
              </thead>
              <tbody>
                {weeks.map((w) => (
                  <tr key={w.week} style={w.week === 8 || w.week === 15 ? { backgroundColor: 'var(--bg-secondary, #f3f4f6)' } : {}}>
                    <td style={{ textAlign: 'center', fontWeight: 600 }}>{w.week}{t('site.course.weeklyPlan.weekUnit')}</td>
                    <td>
                      {w.path ? (
                        <Link to={w.path} style={{ color: 'var(--primary-blue)', fontWeight: 500 }}>{w.topic}</Link>
                      ) : (
                        <span style={{ fontWeight: 500, color: 'var(--text-secondary)' }}>{w.topic}</span>
                      )}
                    </td>
                    <td>{w.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
};

export default WeeklyPlan;
