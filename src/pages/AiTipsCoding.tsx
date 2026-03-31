import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import { useLanguage } from '../contexts/LanguageContext';

const AiTipsCoding = () => {
  const { t } = useLanguage();

  return (
    <>
      <SEOHead title={t('site.aiTips.coding.title')} path="/ai-tips/coding" />

      <section className="page-header">
        <div className="container">
          <h1>{t('site.aiTips.coding.title')}</h1>
          <p>{t('site.aiTips.coding.subtitle')}</p>
        </div>
      </section>

      <section className="section lesson-content">
        <div className="container">
          <div className="lesson-body">

            <div className="callout-box">
              <h3>학습 목표</h3>
              <ul>
                <li>AI를 활용한 코드 생성 방법과 효과적인 요청법을 익힌다.</li>
                <li>AI를 활용한 디버깅 기법을 이해하고 적용할 수 있다.</li>
                <li>AI를 활용한 코드 리뷰와 리팩토링 방법을 배운다.</li>
                <li>AI 코딩 도구 사용 시 주의사항을 파악한다.</li>
              </ul>
            </div>

            <h2>1. AI 코드 생성</h2>

            <h3>1.1 코드 생성 요청 방법</h3>
            <p>
              AI에게 코드를 요청할 때는 <strong>요구사항을 구체적으로</strong> 설명할수록 좋습니다.
              입력, 처리, 출력을 명확히 설명하고, 사용할 언어와 라이브러리를 지정합니다.
            </p>

            <div className="code-block">
              <div className="code-header">효과적인 코드 생성 프롬프트</div>
              <pre><code>{`"파이썬으로 구구단 프로그램을 작성해주세요.
요구사항:
1. 사용자로부터 시작 단과 끝 단을 입력받음
2. 입력 검증: 1~9 사이의 숫자만 허용
3. 지정 범위의 구구단을 출력
4. 각 단 사이에 빈 줄 구분
5. 주석을 포함하여 코드 설명"`}</code></pre>
            </div>

            <h3>1.2 AI 생성 코드 예시</h3>
            <div className="code-block">
              <div className="code-header">AI가 생성한 구구단 프로그램</div>
              <pre><code>{`# 구구단 프로그램
# 사용자가 지정한 범위의 구구단을 출력합니다

def get_valid_input(prompt):
    """1~9 사이의 유효한 숫자를 입력받는 함수"""
    while True:
        try:
            num = int(input(prompt))
            if 1 <= num <= 9:
                return num
            print("1~9 사이의 숫자를 입력하세요.")
        except ValueError:
            print("숫자를 입력하세요.")

# 시작 단과 끝 단 입력
start = get_valid_input("시작 단을 입력하세요 (1~9): ")
end = get_valid_input("끝 단을 입력하세요 (1~9): ")

# 범위 확인 및 조정
if start > end:
    start, end = end, start

# 구구단 출력
for dan in range(start, end + 1):
    print(f"=== {dan}단 ===")
    for i in range(1, 10):
        print(f"{dan} x {i} = {dan * i}")
    print()  # 단 사이 빈 줄`}</code></pre>
            </div>

            <h2>2. AI 디버깅</h2>

            <h3>2.1 오류 해결 요청</h3>
            <p>
              코드에서 오류가 발생했을 때, <strong>오류 메시지와 코드를 함께</strong> AI에게 제공하면
              원인 분석과 해결 방법을 빠르게 얻을 수 있습니다.
            </p>

            <div className="code-block">
              <div className="code-header">디버깅 프롬프트 템플릿</div>
              <pre><code>{`"다음 파이썬 코드에서 오류가 발생합니다.

[코드]
scores = [85, 92, 78, 95, 88]
for i in range(1, len(scores)):
    avg = sum(scores) / len(scores)
    if scores[i] > avg:
        print(f"{i}번 학생은 평균 이상입니다")

[오류 메시지]
(오류 메시지 또는 예상과 다른 결과 설명)

[기대 동작]
모든 학생의 점수를 평균과 비교하고 싶습니다.

원인을 분석하고 수정된 코드를 알려주세요."`}</code></pre>
            </div>

            <h3>2.2 디버깅 전략</h3>
            <table className="lesson-table">
              <thead>
                <tr><th>전략</th><th>설명</th><th>프롬프트 예시</th></tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>오류 메시지 분석</strong></td>
                  <td>오류 메시지의 의미와 원인을 파악</td>
                  <td>"이 TypeError가 발생하는 이유를 설명해주세요"</td>
                </tr>
                <tr>
                  <td><strong>단계별 실행 추적</strong></td>
                  <td>코드의 실행 흐름을 단계별로 따라가기</td>
                  <td>"이 코드를 한 줄씩 실행할 때 변수값의 변화를 보여주세요"</td>
                </tr>
                <tr>
                  <td><strong>엣지 케이스 확인</strong></td>
                  <td>경계값이나 예외 상황 검토</td>
                  <td>"이 함수에서 발생할 수 있는 엣지 케이스를 알려주세요"</td>
                </tr>
                <tr>
                  <td><strong>유사 오류 예방</strong></td>
                  <td>같은 유형의 오류를 방지하는 방법</td>
                  <td>"이런 오류를 예방하려면 어떤 습관을 들여야 하나요?"</td>
                </tr>
              </tbody>
            </table>

            <h2>3. AI 코드 리뷰</h2>

            <h3>3.1 코드 리뷰 요청</h3>
            <div className="code-block">
              <div className="code-header">코드 리뷰 프롬프트</div>
              <pre><code>{`"다음 코드를 리뷰해주세요. 다음 관점에서 평가해주세요:
1. 코드 가독성 (변수명, 구조)
2. 효율성 (불필요한 연산, 개선 가능한 부분)
3. 잠재적 버그 (예외 상황 처리)
4. 파이썬 스타일 가이드(PEP 8) 준수 여부

개선된 코드도 함께 보여주세요.

[코드 첨부]"`}</code></pre>
            </div>

            <h2>4. AI 리팩토링</h2>

            <h3>4.1 리팩토링 요청</h3>
            <div className="code-block">
              <div className="code-header">리팩토링 전 코드</div>
              <pre><code>{`# 개선 전 코드
def process(d):
    r = []
    for i in range(len(d)):
        if d[i] >= 60:
            r.append("합격")
        else:
            r.append("불합격")
    return r`}</code></pre>
            </div>

            <div className="code-block">
              <div className="code-header">AI에게 리팩토링 요청 후</div>
              <pre><code>{`# 개선 후 코드 - AI 리팩토링 결과
def evaluate_scores(scores, passing_score=60):
    """점수 리스트를 받아 합격/불합격을 판정합니다."""
    return [
        "합격" if score >= passing_score else "불합격"
        for score in scores
    ]`}</code></pre>
            </div>

            <h3>4.2 리팩토링 포인트</h3>
            <table className="lesson-table">
              <thead>
                <tr><th>개선 항목</th><th>설명</th></tr>
              </thead>
              <tbody>
                <tr><td><strong>변수명 개선</strong></td><td>d → scores, r → results 등 의미 있는 이름 사용</td></tr>
                <tr><td><strong>리스트 컴프리헨션</strong></td><td>for 루프를 간결한 리스트 컴프리헨션으로 변환</td></tr>
                <tr><td><strong>매개변수 기본값</strong></td><td>하드코딩된 값(60)을 매개변수로 추출</td></tr>
                <tr><td><strong>문서화</strong></td><td>함수의 역할을 설명하는 독스트링 추가</td></tr>
              </tbody>
            </table>

            <h2>5. 주의사항</h2>
            <ul>
              <li><strong>코드 이해 우선</strong>: AI가 생성한 코드를 반드시 이해한 후 사용합니다. 이해하지 못하면 학습 효과가 없습니다.</li>
              <li><strong>테스트 필수</strong>: AI 생성 코드도 반드시 테스트하여 정상 동작을 확인합니다.</li>
              <li><strong>보안 검토</strong>: SQL 인젝션, XSS 등 보안 취약점이 없는지 확인합니다.</li>
              <li><strong>점진적 활용</strong>: 처음에는 직접 코드를 작성하고, AI를 검증/개선 도구로 활용하는 것을 권장합니다.</li>
              <li><strong>학습 윤리</strong>: 과제 제출 시 AI 도구 사용 여부를 명시하고, 학습 보조 도구로 활용합니다.</li>
            </ul>

            <div className="callout-box">
              <h3>핵심 정리</h3>
              <ul>
                <li>AI <strong>코드 생성</strong> 시에는 요구사항을 구체적으로 설명할수록 좋은 결과를 얻는다.</li>
                <li>AI <strong>디버깅</strong>에는 오류 메시지와 코드를 함께 제공하고, 기대 동작을 설명한다.</li>
                <li>AI <strong>코드 리뷰</strong>로 가독성, 효율성, 버그, 스타일 등을 종합적으로 개선할 수 있다.</li>
                <li>AI <strong>리팩토링</strong>으로 변수명 개선, 코드 간결화, 문서화 등을 수행할 수 있다.</li>
                <li>AI 생성 코드는 반드시 <strong>이해하고 테스트</strong>한 후 사용한다.</li>
              </ul>
            </div>

            <div className="lesson-nav">
              <Link to="/ai-tips/prompt" className="lesson-nav-btn prev">← 프롬프트 작성법</Link>
              <Link to="/ai-tips/writing" className="lesson-nav-btn next">AI 문서 작성 →</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AiTipsCoding;
