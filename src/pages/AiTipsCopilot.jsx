import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import { useLanguage } from '../contexts/LanguageContext';

const AiTipsCopilot = () => {
  const { t } = useLanguage();

  return (
    <>
      <SEOHead title={t('site.aiTips.copilot.title')} path="/ai-tips/copilot" />

      <section className="page-header">
        <div className="container">
          <h1>{t('site.aiTips.copilot.title')}</h1>
          <p>{t('site.aiTips.copilot.subtitle')}</p>
        </div>
      </section>

      <section className="section lesson-content">
        <div className="container">
          <div className="lesson-body">

            <div className="callout-box">
              <h3>학습 목표</h3>
              <ul>
                <li>GitHub Copilot의 개념과 작동 방식을 이해한다.</li>
                <li>VS Code에서 Copilot을 설정하고 활용하는 방법을 익힌다.</li>
                <li>Copilot을 활용한 효율적인 코딩 방법을 배운다.</li>
              </ul>
            </div>

            <h2>1. GitHub Copilot이란?</h2>
            <p>
              <strong>GitHub Copilot</strong>은 GitHub과 OpenAI가 공동 개발한 AI 코딩 어시스턴트입니다.
              코드 에디터(VS Code 등)에 통합되어, 코드를 작성하는 도중 실시간으로
              다음 코드를 예측하고 자동 완성해줍니다. 주석이나 함수명만 작성하면
              전체 함수를 자동으로 생성하기도 합니다.
            </p>

            <h3>1.1 이용 조건</h3>
            <table className="lesson-table">
              <thead>
                <tr><th>플랜</th><th>가격</th><th>대상</th></tr>
              </thead>
              <tbody>
                <tr><td><strong>Free</strong></td><td>무료</td><td>월 2,000회 코드 자동완성</td></tr>
                <tr><td><strong>Pro</strong></td><td>$10/월</td><td>무제한 자동완성 + 채팅</td></tr>
                <tr><td><strong>학생 무료</strong></td><td>무료</td><td>GitHub Education 인증 학생</td></tr>
              </tbody>
            </table>

            <h2>2. VS Code 설정</h2>

            <h3>2.1 설치 과정</h3>
            <ol>
              <li><strong>GitHub 계정 생성</strong>: github.com에서 계정을 만듭니다.</li>
              <li><strong>Copilot 활성화</strong>: GitHub 설정에서 Copilot을 활성화합니다 (학생은 Education Pack 신청).</li>
              <li><strong>VS Code 확장 설치</strong>: VS Code에서 "GitHub Copilot" 확장을 검색하여 설치합니다.</li>
              <li><strong>로그인</strong>: VS Code에서 GitHub 계정으로 로그인합니다.</li>
            </ol>

            <h3>2.2 기본 사용법</h3>
            <table className="lesson-table">
              <thead>
                <tr><th>동작</th><th>단축키</th><th>설명</th></tr>
              </thead>
              <tbody>
                <tr><td><strong>제안 수락</strong></td><td><code>Tab</code></td><td>Copilot 제안 코드를 수락</td></tr>
                <tr><td><strong>제안 거부</strong></td><td><code>Esc</code></td><td>현재 제안을 무시</td></tr>
                <tr><td><strong>다음 제안</strong></td><td><code>Alt + ]</code></td><td>다른 제안 보기</td></tr>
                <tr><td><strong>이전 제안</strong></td><td><code>Alt + [</code></td><td>이전 제안으로 돌아가기</td></tr>
                <tr><td><strong>채팅 열기</strong></td><td><code>Ctrl + I</code></td><td>Copilot Chat 인라인 열기</td></tr>
              </tbody>
            </table>

            <h2>3. 코딩 활용법</h2>

            <h3>3.1 주석으로 코드 생성</h3>
            <div className="code-block">
              <div className="code-header">주석을 작성하면 Copilot이 코드를 제안</div>
              <pre><code>{`# 1부터 100까지의 소수를 구하는 함수
def find_primes():
    # Copilot이 자동으로 아래 코드를 제안합니다
    primes = []
    for num in range(2, 101):
        is_prime = True
        for i in range(2, int(num**0.5) + 1):
            if num % i == 0:
                is_prime = False
                break
        if is_prime:
            primes.append(num)
    return primes`}</code></pre>
            </div>

            <h3>3.2 함수명으로 자동 완성</h3>
            <div className="code-block">
              <div className="code-header">의미 있는 함수명만 작성</div>
              <pre><code>{`# 함수명만 입력하면 내용을 자동 생성
def calculate_bmi(weight, height):
    # Copilot 제안:
    bmi = weight / (height ** 2)
    if bmi < 18.5:
        return bmi, "저체중"
    elif bmi < 25:
        return bmi, "정상"
    elif bmi < 30:
        return bmi, "과체중"
    else:
        return bmi, "비만"`}</code></pre>
            </div>

            <h3>3.3 Copilot Chat 활용</h3>
            <div className="code-block">
              <div className="code-header">Copilot Chat 명령어</div>
              <pre><code>{`# VS Code에서 Ctrl+I로 Copilot Chat을 열고:

/explain    → 선택한 코드를 설명해줌
/fix        → 선택한 코드의 버그를 수정
/tests      → 선택한 코드의 테스트 코드 생성
/doc        → 선택한 코드에 문서화 주석 추가`}</code></pre>
            </div>

            <h2>4. 효과적인 활용 팁</h2>
            <table className="lesson-table">
              <thead>
                <tr><th>팁</th><th>설명</th></tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>명확한 주석 작성</strong></td>
                  <td>주석이 구체적일수록 정확한 코드를 제안합니다. "리스트를 정렬"보다 "학생 점수 리스트를 내림차순으로 정렬"이 더 좋습니다.</td>
                </tr>
                <tr>
                  <td><strong>패턴 반복 활용</strong></td>
                  <td>비슷한 패턴의 코드를 먼저 작성하면 나머지를 자동으로 완성합니다.</td>
                </tr>
                <tr>
                  <td><strong>제안 코드 검증</strong></td>
                  <td>Copilot의 제안을 그대로 사용하지 말고, 반드시 이해하고 검증 후 사용합니다.</td>
                </tr>
                <tr>
                  <td><strong>파일 컨텍스트 활용</strong></td>
                  <td>관련 파일을 열어두면 Copilot이 프로젝트의 맥락을 더 잘 이해합니다.</td>
                </tr>
              </tbody>
            </table>

            <h2>5. 주의사항</h2>
            <ul>
              <li><strong>코드 이해 필수</strong>: Copilot이 생성한 코드를 이해하지 못하고 사용하면 학습 효과가 떨어집니다. 반드시 코드를 이해한 후 활용하세요.</li>
              <li><strong>보안 검토</strong>: 자동 생성된 코드에 보안 취약점이 있을 수 있으므로 주의합니다.</li>
              <li><strong>라이선스 주의</strong>: Copilot이 생성한 코드가 오픈소스 라이선스와 충돌할 수 있습니다.</li>
              <li><strong>학습용으로 활용</strong>: 과제 제출 시 AI 도구 사용 여부를 명시하고, 학습 도구로 활용합니다.</li>
            </ul>

            <div className="callout-box">
              <h3>핵심 정리</h3>
              <ul>
                <li><strong>GitHub Copilot</strong>은 VS Code에 통합되는 AI 코딩 어시스턴트로, 실시간 코드 자동 완성을 제공한다.</li>
                <li><strong>주석</strong>이나 <strong>함수명</strong>을 작성하면 전체 코드를 자동으로 제안한다.</li>
                <li><strong>Copilot Chat</strong>을 통해 코드 설명, 버그 수정, 테스트 생성 등을 요청할 수 있다.</li>
                <li>학생은 <strong>GitHub Education Pack</strong>으로 무료 사용이 가능하다.</li>
              </ul>
            </div>

            <div className="lesson-nav">
              <Link to="/ai-tips/gemini" className="lesson-nav-btn prev">← Gemini 활용법</Link>
              <Link to="/ai-tips/prompt" className="lesson-nav-btn next">프롬프트 작성법 →</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AiTipsCopilot;
