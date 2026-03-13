import { useLanguage } from '../contexts/LanguageContext';
import SEOHead from '../components/SEOHead';
import useAOS from '../hooks/useAOS';

const CaseStudyGuide = () => {
  const { t } = useLanguage();
  useAOS();

  return (
    <>
      <SEOHead title={t('site.course.caseStudy.title')} path="/course/case-study" />
      <section className="page-header">
        <div className="container">
          <h1>{t('site.course.caseStudy.title')}</h1>
          <p>{t('site.course.caseStudy.subtitle')}</p>
        </div>
      </section>

      <section className="lesson-content">
        <div className="container">
          <div className="lesson-body" data-aos="fade-up">
            <div className="callout-box">
              <h3>사례분석 보고서 개요</h3>
              <ul>
                <li>학기 중 총 2회 제출 (중간 전 1회, 기말 전 1회)</li>
                <li>분량: A4 5~8페이지 (본문 기준)</li>
                <li>평가 비중: 전체 성적의 20%</li>
              </ul>
            </div>

            <h2>1. 사례분석이란?</h2>
            <p>사례분석(Case Study)은 실제 기업이나 조직의 디지털 비즈니스 전략을 체계적으로 분석하는 학습 방법입니다. 이론적 프레임워크를 실제 상황에 적용함으로써 전략적 사고력과 분석 능력을 기를 수 있습니다.</p>
            <p>본 과목에서는 국내외 기업의 디지털 전략 사례를 선정하여 심층 분석 보고서를 작성합니다.</p>

            <h2>2. 보고서 구성</h2>
            <h3>2.1 기업 소개 (1페이지)</h3>
            <ul>
              <li>기업명, 설립 연도, 주요 사업 영역</li>
              <li>기업 규모 (매출, 직원 수, 시장 점유율)</li>
              <li>해당 기업을 선정한 이유</li>
            </ul>

            <h3>2.2 환경 분석 (1~2페이지)</h3>
            <ul>
              <li>산업 환경 분석 (PEST 또는 5 Forces)</li>
              <li>경쟁 환경 및 주요 경쟁사</li>
              <li>디지털 기술 트렌드가 해당 산업에 미치는 영향</li>
            </ul>

            <h3>2.3 디지털 전략 분석 (2~3페이지)</h3>
            <ul>
              <li>해당 기업의 디지털 전략 내용 상세 기술</li>
              <li>비즈니스 모델 캔버스 또는 가치사슬 분석</li>
              <li>핵심 디지털 기술 활용 방식</li>
              <li>전략 실행 과정과 성과</li>
            </ul>

            <h3>2.4 SWOT 분석 (1페이지)</h3>
            <ul>
              <li>강점(Strengths), 약점(Weaknesses)</li>
              <li>기회(Opportunities), 위협(Threats)</li>
              <li>SWOT 기반 전략 제언</li>
            </ul>

            <h3>2.5 결론 및 시사점 (1페이지)</h3>
            <ul>
              <li>사례에서 얻은 핵심 교훈</li>
              <li>다른 기업에 적용 가능한 전략적 시사점</li>
              <li>향후 전망 및 제언</li>
            </ul>

            <h2>3. 평가 기준</h2>
            <table className="lesson-table">
              <thead>
                <tr><th>평가 항목</th><th>배점</th><th>세부 기준</th></tr>
              </thead>
              <tbody>
                <tr><td>주제 적절성</td><td>15%</td><td>디지털 비즈니스 전략과의 관련성</td></tr>
                <tr><td>분석의 깊이</td><td>30%</td><td>프레임워크 적용, 논리적 분석</td></tr>
                <tr><td>근거 자료</td><td>20%</td><td>데이터, 통계, 출처의 신뢰성</td></tr>
                <tr><td>창의적 통찰</td><td>20%</td><td>독창적 관점과 전략적 제언</td></tr>
                <tr><td>형식 및 구성</td><td>15%</td><td>보고서 구성, 가독성, 참고문헌</td></tr>
              </tbody>
            </table>

            <h2>4. 추천 분석 대상 기업</h2>
            <h3>국내 기업</h3>
            <ul>
              <li>카카오, 네이버, 쿠팡, 배달의민족, 토스, 당근마켓</li>
              <li>삼성전자(디지털 전환), 현대자동차(MaaS), CJ올리브영(옴니채널)</li>
            </ul>

            <h3>글로벌 기업</h3>
            <ul>
              <li>Amazon, Netflix, Uber, Airbnb, Shopify, Stripe</li>
              <li>Tesla(DTC), Nike(디지털 전환), Disney+(스트리밍)</li>
            </ul>

            <h2>5. 제출 안내</h2>
            <ul>
              <li><strong>형식:</strong> PDF 또는 Word 파일</li>
              <li><strong>파일명:</strong> [학번]_[이름]_사례분석[1/2].pdf</li>
              <li><strong>제출처:</strong> 게시판 또는 지정된 제출 경로</li>
              <li><strong>제출 기한:</strong> 수업 시간에 안내</li>
            </ul>

            <div className="exercise-box">
              <h3>작성 팁</h3>
              <ol>
                <li>수업에서 배운 이론과 프레임워크를 반드시 적용하세요.</li>
                <li>단순 기업 소개가 아닌, <strong>전략적 분석</strong>에 초점을 맞추세요.</li>
                <li>최신 자료(기사, 보고서, IR 자료)를 활용하세요.</li>
                <li>본인의 독창적 관점과 비판적 사고를 담으세요.</li>
                <li>AI 도구를 활용할 경우, 활용 내역을 명시하세요.</li>
              </ol>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CaseStudyGuide;
