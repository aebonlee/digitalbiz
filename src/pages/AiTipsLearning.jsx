import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import { useLanguage } from '../contexts/LanguageContext';

const AiTipsLearning = () => {
  const { t } = useLanguage();

  return (
    <>
      <SEOHead title={t('site.aiTips.learning.title')} path="/ai-tips/learning" />

      <section className="page-header">
        <div className="container">
          <h1>{t('site.aiTips.learning.title')}</h1>
          <p>{t('site.aiTips.learning.subtitle')}</p>
        </div>
      </section>

      <section className="section lesson-content">
        <div className="container">
          <div className="lesson-body">

            <div className="callout-box">
              <h3>학습 목표</h3>
              <ul>
                <li>AI를 활용한 개념 학습 방법을 이해한다.</li>
                <li>AI를 활용한 퀴즈 생성과 자기 평가 방법을 익힌다.</li>
                <li>AI를 활용한 학습 계획 수립 방법을 배운다.</li>
                <li>AI를 학습 도구로 올바르게 활용하는 자세를 기른다.</li>
              </ul>
            </div>

            <h2>1. AI로 개념 학습하기</h2>

            <h3>1.1 맞춤형 설명 요청</h3>
            <p>
              AI에게 자신의 수준에 맞는 설명을 요청하면 교과서보다 이해하기 쉬운
              맞춤형 학습이 가능합니다. 핵심은 <strong>자신의 현재 수준</strong>과
              <strong>이해하고 싶은 깊이</strong>를 명시하는 것입니다.
            </p>

            <div className="code-block">
              <div className="code-header">수준별 설명 요청</div>
              <pre><code>{`"파이썬의 '재귀 함수'를 설명해주세요.

내 수준: 파이썬 기본 문법(변수, 조건문, 반복문)은 알지만
         함수를 배운 지 얼마 안 됐습니다.

요청사항:
1. 일상생활 비유로 개념 설명
2. 가장 간단한 예제부터 시작
3. 단계적으로 복잡한 예제 3개
4. 재귀 vs 반복문 비교
5. 주의할 점(무한 재귀 등)"`}</code></pre>
            </div>

            <h3>1.2 소크라테스식 학습</h3>
            <p>
              AI에게 답을 바로 알려달라고 하기보다, <strong>질문을 통해 스스로 답을
              찾도록 유도</strong>하면 더 깊은 학습이 됩니다.
            </p>

            <div className="code-block">
              <div className="code-header">소크라테스식 학습 프롬프트</div>
              <pre><code>{`"파이썬 반복문을 학습하고 있습니다.
답을 직접 알려주지 말고, 질문을 통해 제가
스스로 이해할 수 있도록 도와주세요.

먼저 for문과 while문의 차이에 대한
첫 번째 질문을 해주세요."`}</code></pre>
            </div>

            <h3>1.3 개념 연결</h3>
            <div className="code-block">
              <div className="code-header">연관 개념 학습</div>
              <pre><code>{`"파이썬에서 리스트, 튜플, 딕셔너리, 집합의
관계를 마인드맵 형태로 정리해주세요.

각 자료구조가 어떤 상황에서 사용되는지
실생활 예시와 함께 설명해주세요."`}</code></pre>
            </div>

            <h2>2. AI로 퀴즈 만들기</h2>

            <h3>2.1 퀴즈 생성 요청</h3>
            <div className="code-block">
              <div className="code-header">시험 대비 퀴즈 생성</div>
              <pre><code>{`"파이썬 조건문(if, elif, else) 단원의
시험 대비 퀴즈를 만들어주세요.

구성:
- 객관식 5문제 (4지선다)
- 코드 빈칸 채우기 3문제
- 코드 결과 예측 3문제
- 서술형 2문제

난이도: 중간 (기본 개념 + 약간의 응용)
정답과 해설을 별도로 마지막에 제공해주세요."`}</code></pre>
            </div>

            <h3>2.2 틀린 문제 분석</h3>
            <div className="code-block">
              <div className="code-header">오답 분석 요청</div>
              <pre><code>{`"다음 문제에서 제가 3번을 선택했는데 틀렸습니다.

[문제와 보기 첨부]

1. 왜 3번이 틀린 답인지 설명해주세요
2. 정답이 맞는 이유를 설명해주세요
3. 이 개념을 확실히 이해할 수 있는
   유사 문제를 2개 더 만들어주세요"`}</code></pre>
            </div>

            <h2>3. AI로 학습 계획 세우기</h2>

            <h3>3.1 학습 계획 수립</h3>
            <div className="code-block">
              <div className="code-header">학습 계획 요청</div>
              <pre><code>{`"컴퓨팅 사고 중간고사를 2주 후에 봅니다.

시험 범위: 1~7주차
- 1주차: 파이썬 설치 및 환경 구성
- 2주차: 입출력과 변수
- 3주차: 자료형과 연산
- 4주차: IPO와 PDC
- 5주차: 터틀 그래픽
- 6주차: 순서도
- 7주차: IF 조건문

현재 수준: 1~4주차는 이해함, 5~7주차 복습 필요

조건:
- 평일 하루 2시간, 주말 하루 3시간 학습 가능
- 일별 구체적인 학습 내용과 목표 제시
- 복습과 모의 테스트 시간 포함"`}</code></pre>
            </div>

            <h3>3.2 학습 진도 점검</h3>
            <div className="code-block">
              <div className="code-header">학습 진도 점검 프롬프트</div>
              <pre><code>{`"오늘 파이썬 조건문을 학습했습니다.
다음 내용을 이해했는지 점검해주세요:

1. if-elif-else 기본 구조
2. 비교 연산자 (==, !=, <, >, <=, >=)
3. 논리 연산자 (and, or, not)
4. 중첩 조건문

각 항목에 대해 간단한 확인 문제를 1개씩
출제해주세요. 제가 답하면 맞는지 확인해주세요."`}</code></pre>
            </div>

            <h2>4. 효과적인 AI 학습법</h2>
            <table className="lesson-table">
              <thead>
                <tr><th>학습법</th><th>설명</th><th>프롬프트 예시</th></tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>파인만 기법</strong></td>
                  <td>AI에게 개념을 설명해보고 피드백 받기</td>
                  <td>"제가 for문을 설명할 테니 틀린 부분을 지적해주세요"</td>
                </tr>
                <tr>
                  <td><strong>간격 반복</strong></td>
                  <td>AI에게 주기적 복습 일정과 문제 요청</td>
                  <td>"1주 전 학습한 변수 개념의 복습 퀴즈를 만들어주세요"</td>
                </tr>
                <tr>
                  <td><strong>능동적 회상</strong></td>
                  <td>AI에게 질문을 받아 답하기</td>
                  <td>"파이썬 기초에 대해 질문을 해주세요. 제가 답하겠습니다"</td>
                </tr>
                <tr>
                  <td><strong>비유 학습</strong></td>
                  <td>어려운 개념을 친숙한 비유로 이해</td>
                  <td>"파이썬의 변수를 일상생활에 비유해서 설명해주세요"</td>
                </tr>
              </tbody>
            </table>

            <h2>5. 올바른 AI 학습 자세</h2>
            <ul>
              <li><strong>먼저 시도하기</strong>: 문제를 AI에게 바로 물어보지 말고, 먼저 직접 생각하고 시도합니다. 막혔을 때 AI에게 힌트를 요청합니다.</li>
              <li><strong>과정 중심 학습</strong>: AI의 답을 보기만 하지 말고, 왜 그런 답이 나왔는지 과정을 이해합니다.</li>
              <li><strong>직접 코딩하기</strong>: AI의 코드를 복사하지 말고, 이해한 후 직접 타이핑합니다. 손으로 치면서 학습하는 것이 효과적입니다.</li>
              <li><strong>오류 경험하기</strong>: 에러를 두려워하지 말고, 스스로 디버깅을 시도한 후 AI에게 확인합니다.</li>
              <li><strong>비판적 사고</strong>: AI의 답변이 항상 맞는 것은 아닙니다. 교재나 공식 문서와 비교하여 검증합니다.</li>
            </ul>

            <div className="callout-box">
              <h3>핵심 정리</h3>
              <ul>
                <li>AI에게 <strong>수준과 목표</strong>를 명시하면 맞춤형 학습이 가능하다.</li>
                <li><strong>퀴즈 생성</strong>과 <strong>오답 분석</strong>을 통해 자기 평가를 효과적으로 할 수 있다.</li>
                <li>AI에게 <strong>학습 계획 수립</strong>과 <strong>진도 점검</strong>을 요청하면 체계적 학습이 가능하다.</li>
                <li><strong>파인만 기법, 간격 반복, 능동적 회상</strong> 등의 학습법을 AI와 함께 활용한다.</li>
                <li>AI는 학습 <strong>보조 도구</strong>이며, 직접 사고하고 코딩하는 것이 가장 중요하다.</li>
              </ul>
            </div>

            <div className="lesson-nav">
              <Link to="/ai-tips/writing" className="lesson-nav-btn prev">← AI 문서 작성</Link>
              <Link to="/ai-tips" className="lesson-nav-btn next">목록으로 →</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AiTipsLearning;
