import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import { useLanguage } from '../contexts/LanguageContext';

const AiTipsPrompt = () => {
  const { t } = useLanguage();

  return (
    <>
      <SEOHead title={t('site.aiTips.prompt.title')} path="/ai-tips/prompt" />

      <section className="page-header">
        <div className="container">
          <h1>{t('site.aiTips.prompt.title')}</h1>
          <p>{t('site.aiTips.prompt.subtitle')}</p>
        </div>
      </section>

      <section className="section lesson-content">
        <div className="container">
          <div className="lesson-body">

            <div className="callout-box">
              <h3>학습 목표</h3>
              <ul>
                <li>프롬프트 엔지니어링의 개념과 중요성을 이해한다.</li>
                <li>효과적인 프롬프트의 구성 요소와 작성 원칙을 익힌다.</li>
                <li>좋은 프롬프트와 나쁜 프롬프트의 차이를 구분할 수 있다.</li>
                <li>다양한 상황에 맞는 프롬프트 작성 기법을 활용할 수 있다.</li>
              </ul>
            </div>

            <h2>1. 프롬프트 엔지니어링이란?</h2>
            <p>
              <strong>프롬프트 엔지니어링(Prompt Engineering)</strong>은 AI에게 원하는 결과를 얻기 위해
              입력(프롬프트)을 체계적으로 설계하는 기술입니다. 같은 AI라도 프롬프트를 어떻게
              작성하느냐에 따라 결과의 품질이 크게 달라집니다.
            </p>
            <p>
              마치 검색 엔진에서 검색어를 잘 입력해야 원하는 결과를 찾을 수 있는 것처럼,
              AI에게도 명확하고 구체적인 지시를 해야 좋은 결과를 얻을 수 있습니다.
            </p>

            <h2>2. 프롬프트의 구성 요소</h2>

            <h3>2.1 기본 구성</h3>
            <table className="lesson-table">
              <thead>
                <tr><th>구성 요소</th><th>설명</th><th>예시</th></tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>역할(Role)</strong></td>
                  <td>AI에게 특정 역할을 부여</td>
                  <td>"당신은 파이썬 전문 강사입니다"</td>
                </tr>
                <tr>
                  <td><strong>맥락(Context)</strong></td>
                  <td>배경 정보와 상황 설명</td>
                  <td>"대학교 1학년 파이썬 입문 수업에서..."</td>
                </tr>
                <tr>
                  <td><strong>지시(Instruction)</strong></td>
                  <td>수행할 작업을 명확히 기술</td>
                  <td>"for문을 사용한 예제 3개를 작성해주세요"</td>
                </tr>
                <tr>
                  <td><strong>형식(Format)</strong></td>
                  <td>원하는 출력 형식 지정</td>
                  <td>"표 형식으로, 한국어로 작성"</td>
                </tr>
                <tr>
                  <td><strong>제약(Constraint)</strong></td>
                  <td>결과의 범위나 제한 사항</td>
                  <td>"500자 이내로, 전문 용어 없이"</td>
                </tr>
              </tbody>
            </table>

            <h3>2.2 구조화된 프롬프트 템플릿</h3>
            <div className="code-block">
              <div className="code-header">효과적인 프롬프트 구조</div>
              <pre><code>{`[역할] 당신은 ___입니다.
[맥락] ___ 상황에서
[지시] ___를 해주세요.
[형식] ___ 형식으로 작성하되,
[제약] ___ 조건을 지켜주세요.`}</code></pre>
            </div>

            <h2>3. 좋은 프롬프트 vs 나쁜 프롬프트</h2>

            <h3>3.1 예시 비교</h3>
            <table className="lesson-table">
              <thead>
                <tr><th>나쁜 프롬프트</th><th>좋은 프롬프트</th><th>개선 포인트</th></tr>
              </thead>
              <tbody>
                <tr>
                  <td>"파이썬 알려줘"</td>
                  <td>"파이썬 초보자를 위한 for문 사용법을 예제 3개와 함께 설명해주세요"</td>
                  <td>대상, 주제, 분량 구체화</td>
                </tr>
                <tr>
                  <td>"코드 짜줘"</td>
                  <td>"학생 5명의 점수를 입력받아 평균을 계산하는 파이썬 프로그램을 작성해주세요. 입력 검증을 포함하고 주석을 달아주세요"</td>
                  <td>요구사항, 언어, 세부조건 명시</td>
                </tr>
                <tr>
                  <td>"이거 왜 안 돼?"</td>
                  <td>"다음 파이썬 코드에서 IndexError가 발생합니다. 원인과 해결 방법을 알려주세요. [코드 첨부]"</td>
                  <td>오류 정보, 코드 첨부</td>
                </tr>
                <tr>
                  <td>"에세이 써줘"</td>
                  <td>"'AI 시대의 교육 변화'를 주제로 800자 분량의 에세이를 작성해주세요. 서론-본론-결론 구조로, 구체적 사례 2개를 포함해주세요"</td>
                  <td>주제, 분량, 구조, 내용 지정</td>
                </tr>
              </tbody>
            </table>

            <h2>4. 핵심 프롬프트 기법</h2>

            <h3>4.1 Zero-shot 프롬프트</h3>
            <p>예시 없이 바로 지시하는 방식입니다. 간단한 작업에 적합합니다.</p>
            <div className="code-block">
              <div className="code-header">Zero-shot 예시</div>
              <pre><code>{`"다음 문장의 감정을 긍정/부정/중립으로 분류해주세요:
'오늘 날씨가 정말 좋아서 기분이 좋습니다'"`}</code></pre>
            </div>

            <h3>4.2 Few-shot 프롬프트</h3>
            <p>몇 가지 예시를 함께 제공하여 AI가 패턴을 학습하도록 합니다.</p>
            <div className="code-block">
              <div className="code-header">Few-shot 예시</div>
              <pre><code>{`"다음 패턴에 따라 분류해주세요:

입력: '맛있는 저녁이었습니다' → 감정: 긍정
입력: '서비스가 너무 느렸어요' → 감정: 부정
입력: '오늘 회의가 있습니다' → 감정: 중립

입력: '이 제품 정말 실망스럽네요' → 감정: ?"`}</code></pre>
            </div>

            <h3>4.3 Chain-of-Thought (사고 연쇄)</h3>
            <p>AI에게 단계적으로 사고하도록 요청하면 복잡한 문제에서 더 정확한 결과를 얻습니다.</p>
            <div className="code-block">
              <div className="code-header">Chain-of-Thought 예시</div>
              <pre><code>{`"다음 문제를 단계별로 풀어주세요:

영희는 사과 5개를 가지고 있었습니다.
친구에게 2개를 주고, 엄마가 3개를 더 사왔습니다.
그 중 1개가 상해서 버렸습니다.
영희가 가진 사과는 몇 개인가요?

각 단계의 계산 과정을 보여주세요."`}</code></pre>
            </div>

            <h3>4.4 역할 부여 (Role Playing)</h3>
            <p>AI에게 특정 전문가 역할을 부여하면 해당 분야에 맞는 전문적인 답변을 얻을 수 있습니다.</p>
            <div className="code-block">
              <div className="code-header">역할 부여 예시</div>
              <pre><code>{`"당신은 10년 경력의 파이썬 시니어 개발자입니다.
초보 개발자가 작성한 다음 코드를 멘토링 관점에서
코드 리뷰해주세요. 잘한 점과 개선할 점을
친절하게 설명해주세요.

[코드 첨부]"`}</code></pre>
            </div>

            <h2>5. 프롬프트 개선 전략</h2>
            <table className="lesson-table">
              <thead>
                <tr><th>전략</th><th>설명</th></tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>반복 개선(Iteration)</strong></td>
                  <td>첫 결과가 마음에 들지 않으면 프롬프트를 수정하여 다시 요청합니다. "더 짧게", "예시를 추가해서", "초보자 수준으로" 등으로 조정합니다.</td>
                </tr>
                <tr>
                  <td><strong>부정 지시 활용</strong></td>
                  <td>"~하지 마세요"라는 부정 지시로 원하지 않는 결과를 방지합니다. 예: "전문 용어를 사용하지 마세요"</td>
                </tr>
                <tr>
                  <td><strong>구분자 사용</strong></td>
                  <td>큰따옴표, 삼중 백틱, XML 태그 등으로 데이터와 지시를 명확히 구분합니다.</td>
                </tr>
                <tr>
                  <td><strong>결과물 시범 제공</strong></td>
                  <td>원하는 결과물의 일부를 예시로 보여주면 형식을 정확히 맞출 수 있습니다.</td>
                </tr>
              </tbody>
            </table>

            <div className="callout-box">
              <h3>핵심 정리</h3>
              <ul>
                <li><strong>프롬프트 엔지니어링</strong>은 AI에게 최적의 결과를 얻기 위한 입력 설계 기술이다.</li>
                <li>좋은 프롬프트는 <strong>역할, 맥락, 지시, 형식, 제약</strong>의 5가지 요소를 포함한다.</li>
                <li><strong>Zero-shot, Few-shot, Chain-of-Thought</strong> 등의 기법을 상황에 맞게 활용한다.</li>
                <li>결과가 만족스럽지 않으면 <strong>반복 개선</strong>을 통해 프롬프트를 점진적으로 발전시킨다.</li>
              </ul>
            </div>

            <div className="lesson-nav">
              <Link to="/ai-tips/copilot" className="lesson-nav-btn prev">← Copilot 활용법</Link>
              <Link to="/ai-tips/coding" className="lesson-nav-btn next">AI 코딩 활용 →</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AiTipsPrompt;
