import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import SEOHead from '../components/SEOHead';
import useAOS from '../hooks/useAOS';

const CourseOverview = () => {
  const { t } = useLanguage();
  useAOS();

  return (
    <>
      <SEOHead title={t('site.course.overview.title')} path="/course/overview" />
      <section className="page-header">
        <div className="container">
          <h1>{t('site.course.overview.title')}</h1>
          <p>{t('site.course.overview.subtitle')}</p>
        </div>
      </section>

      <section className="lesson-content">
        <div className="container">
          <div className="lesson-body" data-aos="fade-up">
            <div className="callout-box">
              <h3>과목 정보</h3>
              <ul>
                <li><strong>과목명:</strong> 디지털비즈니스전략세미나</li>
                <li><strong>학기:</strong> 한 학기 (15주)</li>
                <li><strong>대상:</strong> 대학생 / 대학원생</li>
                <li><strong>형태:</strong> 이론 + 사례분석 + 토론</li>
              </ul>
            </div>

            <h2>1. 과목 소개</h2>
            <p>디지털비즈니스전략세미나는 디지털 기술이 비즈니스 환경을 어떻게 변화시키고 있는지 탐구하며, 성공적인 디지털 전략을 수립할 수 있는 역량을 기르는 과목입니다.</p>
            <p>플랫폼 경제, 데이터 기반 의사결정, AI 혁신, 디지털 마케팅, 핀테크, 구독 경제 등 디지털 시대의 핵심 비즈니스 주제를 체계적으로 다룹니다.</p>

            <h2>2. 학습 목표</h2>
            <ul>
              <li>디지털 비즈니스 생태계의 구조와 작동 원리를 이해합니다.</li>
              <li>디지털 트랜스포메이션(DX)의 전략 수립 및 실행 역량을 기릅니다.</li>
              <li>플랫폼 비즈니스, AI, 핀테크 등 핵심 분야의 전략적 사고력을 배양합니다.</li>
              <li>실제 기업 사례를 분석하고 전략적 의사결정 능력을 향상시킵니다.</li>
              <li>디지털 윤리와 글로벌 비즈니스 관점에서 균형 잡힌 시각을 기릅니다.</li>
            </ul>

            <h2>3. 수업 방식</h2>
            <p>본 과목은 이론 강의, 사례 분석, 그룹 토론, 개인/팀 프로젝트를 결합한 방식으로 진행됩니다.</p>
            <ul>
              <li><strong>이론 강의:</strong> 각 주차별 핵심 개념과 프레임워크를 학습합니다.</li>
              <li><strong>사례 분석:</strong> 국내외 기업의 디지털 전략 사례를 심층 분석합니다.</li>
              <li><strong>토론:</strong> 매 수업마다 주제와 관련된 토론을 진행합니다.</li>
              <li><strong>프로젝트:</strong> 실제 비즈니스 문제에 대한 디지털 전략을 수립합니다.</li>
            </ul>

            <h2>4. 평가 방법</h2>
            <table className="lesson-table">
              <thead>
                <tr><th>항목</th><th>비중</th><th>내용</th></tr>
              </thead>
              <tbody>
                <tr><td>중간고사</td><td>25%</td><td>1~7주차 이론 평가</td></tr>
                <tr><td>기말고사</td><td>25%</td><td>9~14주차 이론 평가</td></tr>
                <tr><td>사례분석 보고서</td><td>20%</td><td>기업 디지털 전략 사례 분석</td></tr>
                <tr><td>팀 프로젝트</td><td>20%</td><td>디지털 비즈니스 전략 수립</td></tr>
                <tr><td>참여도</td><td>10%</td><td>출석, 토론 참여, 과제</td></tr>
              </tbody>
            </table>

            <h2>5. 교재 및 참고문헌</h2>
            <ul>
              <li>주교재는 매 주차별 제공되는 강의 자료를 기반으로 합니다.</li>
              <li>참고 문헌은 각 주차별 강의 페이지에서 확인할 수 있습니다.</li>
              <li>최신 디지털 비즈니스 트렌드 기사 및 보고서를 수시로 공유합니다.</li>
            </ul>

            <div className="exercise-box">
              <h3>빠른 링크</h3>
              <ul>
                <li><Link to="/course/weekly-plan">주차별 계획 보기</Link></li>
                <li><Link to="/course/syllabus">강의계획서 보기</Link></li>
                <li><Link to="/course/case-study">사례분석 가이드 보기</Link></li>
                <li><Link to="/lessons">강의 콘텐츠 바로가기</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CourseOverview;
