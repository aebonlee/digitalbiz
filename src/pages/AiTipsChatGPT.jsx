import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import { useLanguage } from '../contexts/LanguageContext';

const AiTipsChatGPT = () => {
  const { t } = useLanguage();

  return (
    <>
      <SEOHead title={t('site.aiTips.chatgpt.title')} path="/ai-tips/chatgpt" />

      <section className="page-header">
        <div className="container">
          <h1>{t('site.aiTips.chatgpt.title')}</h1>
          <p>{t('site.aiTips.chatgpt.subtitle')}</p>
        </div>
      </section>

      <section className="section lesson-content">
        <div className="container">
          <div className="lesson-body">

            <div className="callout-box">
              <h3>학습 목표</h3>
              <ul>
                <li>ChatGPT의 주요 특징과 버전별 차이를 이해한다.</li>
                <li>ChatGPT를 학습과 업무에 효과적으로 활용하는 방법을 익힌다.</li>
                <li>ChatGPT의 한계와 주의사항을 파악한다.</li>
              </ul>
            </div>

            <h2>1. ChatGPT란?</h2>
            <p>
              <strong>ChatGPT</strong>는 OpenAI에서 개발한 대화형 AI 서비스입니다.
              GPT(Generative Pre-trained Transformer) 모델을 기반으로, 자연스러운 대화를 통해
              질문에 답하고, 글을 작성하며, 코드를 생성하는 등 다양한 작업을 수행합니다.
            </p>

            <h3>1.1 주요 버전</h3>
            <table className="lesson-table">
              <thead>
                <tr><th>버전</th><th>특징</th><th>이용 조건</th></tr>
              </thead>
              <tbody>
                <tr><td><strong>GPT-3.5</strong></td><td>빠른 응답, 일반적인 대화 및 작업</td><td>무료</td></tr>
                <tr><td><strong>GPT-4</strong></td><td>더 정확한 추론, 긴 문맥 처리</td><td>Plus 구독 ($20/월)</td></tr>
                <tr><td><strong>GPT-4o</strong></td><td>멀티모달 (텍스트+이미지+음성)</td><td>무료 제한 / Plus</td></tr>
              </tbody>
            </table>

            <h2>2. 주요 기능</h2>

            <h3>2.1 텍스트 생성 및 요약</h3>
            <p>
              긴 문서를 간결하게 요약하거나, 주어진 주제에 대한 글을 작성할 수 있습니다.
              보고서, 에세이, 이메일 등 다양한 형식의 글쓰기를 지원합니다.
            </p>

            <h3>2.2 코드 작성 및 디버깅</h3>
            <p>
              파이썬, JavaScript 등 다양한 언어의 코드를 생성하고, 기존 코드의 오류를 찾아 수정할 수 있습니다.
              코드 설명과 리팩토링도 가능합니다.
            </p>

            <h3>2.3 번역 및 언어 학습</h3>
            <p>
              다양한 언어 간 번역을 수행하며, 문맥에 맞는 자연스러운 번역을 제공합니다.
              외국어 학습 도우미로도 활용할 수 있습니다.
            </p>

            <h3>2.4 데이터 분석</h3>
            <p>
              CSV, Excel 파일을 업로드하여 데이터를 분석하고 시각화할 수 있습니다(GPT-4 이상).
              통계 요약, 차트 생성, 트렌드 분석 등을 수행합니다.
            </p>

            <h2>3. 활용 예시</h2>

            <h3>3.1 학습 도우미</h3>
            <div className="code-block">
              <div className="code-header">프롬프트 예시 - 개념 설명 요청</div>
              <pre><code>{`"파이썬의 리스트 컴프리헨션을 초등학생도 이해할 수 있게
설명해주세요. 예제 코드 3개를 포함해주세요."`}</code></pre>
            </div>

            <h3>3.2 코딩 도우미</h3>
            <div className="code-block">
              <div className="code-header">프롬프트 예시 - 코드 생성 요청</div>
              <pre><code>{`"파이썬으로 학생 성적 관리 프로그램을 만들어주세요.
- 학생 이름과 점수를 입력받아 리스트에 저장
- 평균, 최고점, 최저점 계산
- 성적순 정렬 기능 포함"`}</code></pre>
            </div>

            <h3>3.3 글쓰기 도우미</h3>
            <div className="code-block">
              <div className="code-header">프롬프트 예시 - 보고서 작성</div>
              <pre><code>{`"컴퓨팅 사고의 중요성에 대한 1000자 분량의 보고서를
작성해주세요. 서론-본론-결론 구조로,
구체적인 사례를 2개 이상 포함해주세요."`}</code></pre>
            </div>

            <h2>4. 프롬프트 팁</h2>
            <table className="lesson-table">
              <thead>
                <tr><th>팁</th><th>설명</th><th>예시</th></tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>역할 부여</strong></td>
                  <td>AI에게 특정 역할을 부여하면 더 전문적인 답변을 얻을 수 있음</td>
                  <td>"당신은 파이썬 전문 강사입니다."</td>
                </tr>
                <tr>
                  <td><strong>구체적 지시</strong></td>
                  <td>원하는 결과물의 형식, 분량, 수준을 명시</td>
                  <td>"표 형식으로, 5가지 항목을"</td>
                </tr>
                <tr>
                  <td><strong>단계적 요청</strong></td>
                  <td>복잡한 작업은 여러 단계로 나누어 요청</td>
                  <td>"먼저 개요를 작성하고, 그 다음 각 항목을 상세히"</td>
                </tr>
                <tr>
                  <td><strong>예시 제공</strong></td>
                  <td>원하는 결과물의 예시를 함께 제공</td>
                  <td>"다음과 같은 형식으로 작성해주세요: ..."</td>
                </tr>
              </tbody>
            </table>

            <h2>5. 주의사항</h2>
            <ul>
              <li><strong>할루시네이션(Hallucination)</strong>: AI가 사실이 아닌 정보를 그럴듯하게 생성할 수 있으므로 반드시 사실 확인이 필요합니다.</li>
              <li><strong>개인정보 보호</strong>: 민감한 개인정보나 기밀 데이터를 입력하지 않도록 주의합니다.</li>
              <li><strong>저작권</strong>: AI가 생성한 콘텐츠의 저작권과 학술적 윤리를 고려해야 합니다.</li>
              <li><strong>최신 정보 제한</strong>: 학습 데이터의 시점에 따라 최신 정보가 반영되지 않을 수 있습니다.</li>
            </ul>

            <div className="callout-box">
              <h3>핵심 정리</h3>
              <ul>
                <li><strong>ChatGPT</strong>는 OpenAI의 대화형 AI로, 텍스트 생성, 코딩, 번역 등 다양한 작업을 수행한다.</li>
                <li><strong>GPT-4</strong> 이상은 더 정확한 추론과 멀티모달 기능을 제공한다.</li>
                <li>효과적인 활용을 위해 <strong>역할 부여, 구체적 지시, 단계적 요청</strong> 등의 프롬프트 기법을 사용한다.</li>
                <li>AI 응답은 반드시 <strong>사실 확인</strong>을 거쳐야 하며, 개인정보와 저작권에 주의한다.</li>
              </ul>
            </div>

            <div className="lesson-nav">
              <Link to="/ai-tips" className="lesson-nav-btn prev">← 목록으로</Link>
              <Link to="/ai-tips/claude" className="lesson-nav-btn next">Claude 활용법 →</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AiTipsChatGPT;
