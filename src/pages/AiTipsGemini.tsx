import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import { useLanguage } from '../contexts/LanguageContext';

const AiTipsGemini = () => {
  const { t } = useLanguage();

  return (
    <>
      <SEOHead title={t('site.aiTips.gemini.title')} path="/ai-tips/gemini" />

      <section className="page-header">
        <div className="container">
          <h1>{t('site.aiTips.gemini.title')}</h1>
          <p>{t('site.aiTips.gemini.subtitle')}</p>
        </div>
      </section>

      <section className="section lesson-content">
        <div className="container">
          <div className="lesson-body">

            <div className="callout-box">
              <h3>학습 목표</h3>
              <ul>
                <li>Gemini의 주요 특징과 멀티모달 기능을 이해한다.</li>
                <li>Google 생태계와 연동된 Gemini 활용법을 익힌다.</li>
                <li>Gemini를 학습과 일상에 효과적으로 활용하는 방법을 배운다.</li>
              </ul>
            </div>

            <h2>1. Gemini란?</h2>
            <p>
              <strong>Gemini</strong>는 Google DeepMind에서 개발한 멀티모달 AI 모델입니다.
              텍스트, 이미지, 오디오, 비디오, 코드를 통합적으로 이해하고 생성할 수 있으며,
              Google 서비스(Gmail, Docs, Sheets 등)와 긴밀하게 연동됩니다.
            </p>

            <h3>1.1 주요 버전</h3>
            <table className="lesson-table">
              <thead>
                <tr><th>버전</th><th>특징</th><th>이용 조건</th></tr>
              </thead>
              <tbody>
                <tr><td><strong>Gemini Flash</strong></td><td>가장 빠른 응답, 간단한 작업</td><td>무료</td></tr>
                <tr><td><strong>Gemini Pro</strong></td><td>균형 잡힌 성능, 일반 작업</td><td>무료</td></tr>
                <tr><td><strong>Gemini Ultra</strong></td><td>최고 성능, 복잡한 추론</td><td>Google One AI Premium</td></tr>
              </tbody>
            </table>

            <h2>2. 주요 기능</h2>

            <h3>2.1 멀티모달 이해</h3>
            <p>
              이미지를 업로드하여 설명을 요청하거나, 그래프/차트를 분석하고,
              사진 속 텍스트를 인식할 수 있습니다. 비디오 내용을 요약하는 것도 가능합니다.
            </p>

            <h3>2.2 Google 서비스 연동</h3>
            <p>
              Gmail에서 이메일 초안 작성, Google Docs에서 문서 작성 보조,
              Google Sheets에서 수식 생성 및 데이터 분석 등을 수행합니다.
              Google 검색 결과를 실시간으로 활용하여 최신 정보를 제공합니다.
            </p>

            <h3>2.3 코드 생성</h3>
            <p>
              Google Colab과 연동하여 파이썬 코드를 생성하고 바로 실행할 수 있습니다.
              코드 설명, 디버깅, 최적화 등을 지원합니다.
            </p>

            <h3>2.4 실시간 정보 검색</h3>
            <p>
              Google 검색 엔진과 연동되어 최신 정보를 포함한 답변을 제공합니다.
              다른 AI에 비해 최신 데이터 반영이 빠른 것이 장점입니다.
            </p>

            <h2>3. 활용 예시</h2>

            <h3>3.1 이미지 분석</h3>
            <div className="code-block">
              <div className="code-header">프롬프트 예시 - 이미지 분석</div>
              <pre><code>{`[이미지 업로드 후]
"이 그래프를 분석해주세요.
- 주요 트렌드를 3가지로 요약
- 가장 눈에 띄는 변화 시점 설명
- 데이터에서 도출할 수 있는 결론"`}</code></pre>
            </div>

            <h3>3.2 Google Docs 연동</h3>
            <div className="code-block">
              <div className="code-header">프롬프트 예시 - 문서 작성 보조</div>
              <pre><code>{`"다음 주제로 연구 보고서 개요를 작성해주세요:
'인공지능이 교육에 미치는 영향'
- 서론, 본론(3개 섹션), 결론 구성
- 각 섹션에 핵심 키워드 3개씩 포함"`}</code></pre>
            </div>

            <h3>3.3 학습 도우미</h3>
            <div className="code-block">
              <div className="code-header">프롬프트 예시 - 시험 준비</div>
              <pre><code>{`"컴퓨팅 사고 중간고사를 준비하고 있습니다.
1~7주차 내용을 기반으로:
1. 핵심 개념 정리 (주차별 3개씩)
2. 예상 문제 10개 (객관식 5개 + 서술형 5개)
3. 각 문제의 정답과 해설"`}</code></pre>
            </div>

            <h2>4. 프롬프트 팁</h2>
            <table className="lesson-table">
              <thead>
                <tr><th>팁</th><th>설명</th><th>예시</th></tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>검색 연동 활용</strong></td>
                  <td>최신 정보가 필요한 질문에 효과적</td>
                  <td>"2025년 최신 파이썬 트렌드를 알려주세요"</td>
                </tr>
                <tr>
                  <td><strong>이미지 함께 질문</strong></td>
                  <td>텍스트만으로 설명하기 어려운 내용은 이미지 활용</td>
                  <td>"이 오류 스크린샷을 보고 해결법을 알려주세요"</td>
                </tr>
                <tr>
                  <td><strong>Google 도구 지정</strong></td>
                  <td>Google 서비스와 연동할 작업 명시</td>
                  <td>"Google Sheets에서 사용할 수식으로 작성해주세요"</td>
                </tr>
                <tr>
                  <td><strong>비교 요청</strong></td>
                  <td>여러 옵션의 비교 분석에 강점</td>
                  <td>"A와 B의 장단점을 표로 비교해주세요"</td>
                </tr>
              </tbody>
            </table>

            <h2>5. 주의사항</h2>
            <ul>
              <li><strong>Google 계정 필요</strong>: Gemini 사용을 위해 Google 계정 로그인이 필요합니다.</li>
              <li><strong>지역 제한</strong>: 일부 기능은 특정 지역에서만 사용 가능할 수 있습니다.</li>
              <li><strong>데이터 활용</strong>: Google 서비스와 연동 시 데이터가 AI 학습에 활용될 수 있으므로 개인정보에 주의합니다.</li>
              <li><strong>정확도 확인</strong>: 실시간 검색 결과도 오류가 있을 수 있으므로 중요한 정보는 교차 확인합니다.</li>
            </ul>

            <div className="callout-box">
              <h3>핵심 정리</h3>
              <ul>
                <li><strong>Gemini</strong>는 Google의 멀티모달 AI로, 텍스트, 이미지, 비디오를 통합 처리한다.</li>
                <li><strong>Google 서비스</strong>(Gmail, Docs, Sheets 등)와 긴밀하게 연동되어 실무에 유용하다.</li>
                <li><strong>실시간 검색</strong> 기능으로 최신 정보를 반영한 답변을 제공한다.</li>
                <li>이미지 분석, 문서 작성, 데이터 분석 등 <strong>멀티모달 작업</strong>에 특히 효과적이다.</li>
              </ul>
            </div>

            <div className="lesson-nav">
              <Link to="/ai-tips/claude" className="lesson-nav-btn prev">← Claude 활용법</Link>
              <Link to="/ai-tips/copilot" className="lesson-nav-btn next">Copilot 활용법 →</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AiTipsGemini;
