import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import { useLanguage } from '../contexts/LanguageContext';

const AiTipsClaude = () => {
  const { t } = useLanguage();

  return (
    <>
      <SEOHead title={t('site.aiTips.claude.title')} path="/ai-tips/claude" />

      <section className="page-header">
        <div className="container">
          <h1>{t('site.aiTips.claude.title')}</h1>
          <p>{t('site.aiTips.claude.subtitle')}</p>
        </div>
      </section>

      <section className="section lesson-content">
        <div className="container">
          <div className="lesson-body">

            <div className="callout-box">
              <h3>학습 목표</h3>
              <ul>
                <li>Claude의 주요 특징과 다른 AI와의 차이점을 이해한다.</li>
                <li>Claude를 학습과 코딩에 효과적으로 활용하는 방법을 익힌다.</li>
                <li>Claude의 강점을 활용한 프롬프트 작성법을 배운다.</li>
              </ul>
            </div>

            <h2>1. Claude란?</h2>
            <p>
              <strong>Claude</strong>는 Anthropic에서 개발한 AI 어시스턴트입니다.
              안전하고 유용한 AI를 목표로 설계되었으며, 긴 문서 분석, 정교한 코딩,
              논리적 추론에서 뛰어난 성능을 보입니다.
            </p>

            <h3>1.1 주요 버전</h3>
            <table className="lesson-table">
              <thead>
                <tr><th>버전</th><th>특징</th><th>이용 조건</th></tr>
              </thead>
              <tbody>
                <tr><td><strong>Claude 3.5 Haiku</strong></td><td>빠른 응답, 간단한 작업에 적합</td><td>무료 / API</td></tr>
                <tr><td><strong>Claude 3.5 Sonnet</strong></td><td>균형 잡힌 성능, 코딩에 강점</td><td>무료 제한 / Pro</td></tr>
                <tr><td><strong>Claude 3.5 Opus</strong></td><td>최고 성능, 복잡한 추론과 분석</td><td>Pro 구독 ($20/월)</td></tr>
              </tbody>
            </table>

            <h2>2. 주요 기능</h2>

            <h3>2.1 긴 문서 분석</h3>
            <p>
              Claude는 최대 200K 토큰(약 15만 단어)의 긴 문맥을 처리할 수 있어,
              긴 논문, 보고서, 코드베이스를 한 번에 분석하는 데 탁월합니다.
              PDF, 이미지 등 다양한 파일을 직접 업로드하여 분석할 수 있습니다.
            </p>

            <h3>2.2 정교한 코딩</h3>
            <p>
              코드 생성, 디버깅, 리팩토링에서 높은 정확도를 보이며,
              코드의 맥락을 잘 이해하여 일관성 있는 코드를 작성합니다.
              특히 파이썬, JavaScript, TypeScript 등에서 강점을 보입니다.
            </p>

            <h3>2.3 논리적 추론</h3>
            <p>
              복잡한 논리 문제, 수학 문제, 단계적 추론이 필요한 작업에서
              체계적이고 정확한 답변을 제공합니다.
            </p>

            <h3>2.4 안전한 AI</h3>
            <p>
              Constitutional AI 방식으로 학습되어 유해하거나 편향된 콘텐츠 생성을 최소화합니다.
              불확실한 정보에 대해서는 솔직하게 모른다고 답하는 경향이 있습니다.
            </p>

            <h2>3. 활용 예시</h2>

            <h3>3.1 코드 리뷰</h3>
            <div className="code-block">
              <div className="code-header">프롬프트 예시 - 코드 리뷰 요청</div>
              <pre><code>{`"다음 파이썬 코드를 리뷰해주세요.
버그, 성능 개선점, 코드 스타일 개선 사항을 알려주세요.

def calc_avg(scores):
    total = 0
    for i in range(len(scores)):
        total = total + scores[i]
    avg = total / len(scores)
    return avg"`}</code></pre>
            </div>

            <h3>3.2 학습 자료 정리</h3>
            <div className="code-block">
              <div className="code-header">프롬프트 예시 - 개념 정리</div>
              <pre><code>{`"파이썬의 자료구조(리스트, 튜플, 딕셔너리, 집합)를
비교 표로 정리해주세요.
각 자료구조의 특징, 생성 방법, 주요 메서드,
사용 사례를 포함해주세요."`}</code></pre>
            </div>

            <h3>3.3 긴 문서 요약</h3>
            <div className="code-block">
              <div className="code-header">프롬프트 예시 - 문서 분석</div>
              <pre><code>{`"첨부한 PDF 논문을 읽고 다음 내용을 정리해주세요:
1. 연구 목적 (2-3문장)
2. 연구 방법 (핵심 3가지)
3. 주요 결과 (표 형식)
4. 한계점 및 향후 연구 방향"`}</code></pre>
            </div>

            <h2>4. 프롬프트 팁</h2>
            <table className="lesson-table">
              <thead>
                <tr><th>팁</th><th>설명</th><th>예시</th></tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>XML 태그 활용</strong></td>
                  <td>Claude는 XML 태그로 구조화된 입력을 잘 처리함</td>
                  <td>{'<context>...</context>'} 태그로 맥락 제공</td>
                </tr>
                <tr>
                  <td><strong>체계적 지시</strong></td>
                  <td>번호를 매겨 단계별로 지시하면 정확도 향상</td>
                  <td>"1단계: ... 2단계: ... 3단계: ..."</td>
                </tr>
                <tr>
                  <td><strong>출력 형식 지정</strong></td>
                  <td>원하는 출력 형식을 명확히 지정</td>
                  <td>"마크다운 표 형식으로 작성해주세요"</td>
                </tr>
                <tr>
                  <td><strong>사고 과정 요청</strong></td>
                  <td>추론 과정을 보여달라고 하면 더 정확한 결과</td>
                  <td>"단계별로 사고 과정을 보여주세요"</td>
                </tr>
              </tbody>
            </table>

            <h2>5. ChatGPT와의 차이점</h2>
            <table className="lesson-table">
              <thead>
                <tr><th>항목</th><th>Claude</th><th>ChatGPT</th></tr>
              </thead>
              <tbody>
                <tr><td><strong>문맥 길이</strong></td><td>최대 200K 토큰</td><td>최대 128K 토큰</td></tr>
                <tr><td><strong>코딩</strong></td><td>정교하고 일관된 코드</td><td>빠른 프로토타이핑에 강점</td></tr>
                <tr><td><strong>안전성</strong></td><td>Constitutional AI 기반</td><td>RLHF 기반</td></tr>
                <tr><td><strong>솔직성</strong></td><td>모르는 것을 인정하는 경향</td><td>답변을 시도하는 경향</td></tr>
                <tr><td><strong>플러그인</strong></td><td>Artifacts, Projects</td><td>GPTs, 플러그인 생태계</td></tr>
              </tbody>
            </table>

            <div className="callout-box">
              <h3>핵심 정리</h3>
              <ul>
                <li><strong>Claude</strong>는 Anthropic의 AI로, 긴 문서 분석과 정교한 코딩에 강점이 있다.</li>
                <li><strong>200K 토큰</strong>의 긴 문맥을 처리할 수 있어 대규모 문서 분석에 적합하다.</li>
                <li><strong>XML 태그</strong>와 체계적 지시로 구조화된 프롬프트를 작성하면 더 좋은 결과를 얻을 수 있다.</li>
                <li>불확실한 정보에 대해 솔직하게 응답하며, <strong>안전성</strong>을 중시하는 AI이다.</li>
              </ul>
            </div>

            <div className="lesson-nav">
              <Link to="/ai-tips/chatgpt" className="lesson-nav-btn prev">← ChatGPT 활용법</Link>
              <Link to="/ai-tips/gemini" className="lesson-nav-btn next">Gemini 활용법 →</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AiTipsClaude;
