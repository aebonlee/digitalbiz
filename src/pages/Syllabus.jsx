import { useLanguage } from '../contexts/LanguageContext';
import SEOHead from '../components/SEOHead';
import useAOS from '../hooks/useAOS';

const Syllabus = () => {
  const { t } = useLanguage();
  useAOS();

  return (
    <>
      <SEOHead title={t('site.course.syllabus.title')} path="/course/syllabus" />
      <section className="page-header">
        <div className="container">
          <h1>{t('site.course.syllabus.title')}</h1>
          <p>{t('site.course.syllabus.subtitle')}</p>
        </div>
      </section>

      <section className="lesson-content">
        <div className="container">
          <div className="lesson-body" data-aos="fade-up">
            <h2>1. 교과목 개요</h2>
            <table className="lesson-table">
              <tbody>
                <tr><td style={{fontWeight:600,width:'150px'}}>교과목명</td><td>디지털비즈니스전략세미나</td></tr>
                <tr><td style={{fontWeight:600}}>학점</td><td>3학점</td></tr>
                <tr><td style={{fontWeight:600}}>수업 형태</td><td>이론 강의 + 사례 분석 + 토론</td></tr>
                <tr><td style={{fontWeight:600}}>수업 기간</td><td>15주 (중간/기말 포함)</td></tr>
                <tr><td style={{fontWeight:600}}>대상</td><td>대학생 / 대학원생</td></tr>
              </tbody>
            </table>

            <h2>2. 교과목 목표</h2>
            <p>본 과목은 디지털 기술이 비즈니스에 미치는 영향을 종합적으로 이해하고, 디지털 환경에서의 전략적 사고력과 실행 능력을 기르는 것을 목표로 합니다.</p>
            <ul>
              <li>디지털 비즈니스의 핵심 개념과 트렌드를 이해한다.</li>
              <li>플랫폼, AI, 핀테크 등 주요 분야의 비즈니스 모델을 분석한다.</li>
              <li>디지털 트랜스포메이션 전략을 수립하고 평가할 수 있다.</li>
              <li>실제 사례 분석을 통해 전략적 의사결정 역량을 강화한다.</li>
              <li>디지털 윤리와 글로벌 관점을 갖춘 비즈니스 리더십을 배양한다.</li>
            </ul>

            <h2>3. 수업 운영 방식</h2>
            <h3>3.1 이론 강의</h3>
            <p>매 주차별 핵심 이론과 프레임워크를 강의합니다. 최신 자료와 사례를 활용하여 생동감 있는 수업을 진행합니다.</p>

            <h3>3.2 사례 분석</h3>
            <p>국내외 주요 기업의 디지털 전략 사례를 분석하고 토론합니다. 학생들은 개별 또는 팀으로 사례분석 보고서를 작성합니다.</p>

            <h3>3.3 팀 프로젝트</h3>
            <p>4~5명으로 팀을 구성하여 실제 기업 또는 가상의 비즈니스에 대한 디지털 전략을 수립합니다. 학기 말에 최종 발표를 진행합니다.</p>

            <h2>4. 평가 기준</h2>
            <table className="lesson-table">
              <thead>
                <tr><th>평가 항목</th><th>비율</th><th>세부 내용</th></tr>
              </thead>
              <tbody>
                <tr><td>중간고사</td><td>25%</td><td>객관식 + 서술형 (1~7주차 범위)</td></tr>
                <tr><td>기말고사</td><td>25%</td><td>객관식 + 서술형 (9~14주차 범위)</td></tr>
                <tr><td>사례분석 보고서</td><td>20%</td><td>개인 사례분석 2회 제출</td></tr>
                <tr><td>팀 프로젝트</td><td>20%</td><td>디지털 전략 수립 + 발표</td></tr>
                <tr><td>출석 및 참여</td><td>10%</td><td>출석, 토론 참여, 수업 기여도</td></tr>
              </tbody>
            </table>

            <h2>5. 수업 규칙</h2>
            <ul>
              <li>출석은 매 수업 시작 시 확인하며, 결석 4회 이상 시 F 처리됩니다.</li>
              <li>과제 제출 기한을 준수하며, 지각 제출 시 감점이 적용됩니다.</li>
              <li>표절이 확인될 경우 해당 과제는 0점 처리됩니다.</li>
              <li>수업 중 적극적인 토론 참여를 권장합니다.</li>
              <li>AI 도구 사용은 허용하되, 활용 내역을 명시해야 합니다.</li>
            </ul>

            <h2>6. 주차별 강의 일정</h2>
            <table className="lesson-table">
              <thead><tr><th>주차</th><th>주제</th></tr></thead>
              <tbody>
                <tr><td>1주</td><td>디지털 비즈니스 개론</td></tr>
                <tr><td>2주</td><td>디지털 트랜스포메이션</td></tr>
                <tr><td>3주</td><td>플랫폼 비즈니스 모델</td></tr>
                <tr><td>4주</td><td>데이터 기반 의사결정</td></tr>
                <tr><td>5주</td><td>디지털 마케팅 전략</td></tr>
                <tr><td>6주</td><td>이커머스와 온라인 유통</td></tr>
                <tr><td>7주</td><td>소셜 미디어 전략</td></tr>
                <tr><td>8주</td><td>중간고사</td></tr>
                <tr><td>9주</td><td>AI와 비즈니스 혁신</td></tr>
                <tr><td>10주</td><td>핀테크와 디지털 금융</td></tr>
                <tr><td>11주</td><td>구독 경제와 SaaS</td></tr>
                <tr><td>12주</td><td>디지털 스타트업 전략</td></tr>
                <tr><td>13주</td><td>사이버 보안과 디지털 윤리</td></tr>
                <tr><td>14주</td><td>글로벌 디지털 비즈니스</td></tr>
                <tr><td>15주</td><td>기말고사</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
};

export default Syllabus;
