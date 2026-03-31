import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import { useLanguage } from '../contexts/LanguageContext';

const AiTipsWriting = () => {
  const { t } = useLanguage();

  return (
    <>
      <SEOHead title={t('site.aiTips.writing.title')} path="/ai-tips/writing" />

      <section className="page-header">
        <div className="container">
          <h1>{t('site.aiTips.writing.title')}</h1>
          <p>{t('site.aiTips.writing.subtitle')}</p>
        </div>
      </section>

      <section className="section lesson-content">
        <div className="container">
          <div className="lesson-body">

            <div className="callout-box">
              <h3>학습 목표</h3>
              <ul>
                <li>AI를 활용한 보고서 작성 방법을 익힌다.</li>
                <li>AI를 활용한 요약 및 번역 기법을 이해한다.</li>
                <li>AI를 활용한 이메일 및 비즈니스 문서 작성법을 배운다.</li>
                <li>AI 문서 작성 시 주의사항과 윤리적 고려 사항을 파악한다.</li>
              </ul>
            </div>

            <h2>1. AI 보고서 작성</h2>

            <h3>1.1 보고서 구조 설계</h3>
            <p>
              보고서 작성 시 AI에게 먼저 <strong>개요(Outline)</strong>를 요청한 후,
              각 섹션을 상세하게 작성하는 <strong>단계적 접근</strong>이 효과적입니다.
            </p>

            <div className="code-block">
              <div className="code-header">1단계: 개요 요청</div>
              <pre><code>{`"'인공지능이 대학 교육에 미치는 영향'을 주제로
3000자 분량의 보고서 개요를 작성해주세요.

구성:
- 서론 (배경, 목적, 범위)
- 본론 (3개 섹션)
- 결론 (요약, 시사점, 전망)

각 섹션의 핵심 내용을 2-3줄로 요약해주세요."`}</code></pre>
            </div>

            <div className="code-block">
              <div className="code-header">2단계: 섹션별 상세 작성</div>
              <pre><code>{`"위 개요의 본론 1번 섹션을 800자 분량으로
상세하게 작성해주세요.

조건:
- 구체적인 통계 데이터나 사례 2개 포함
- 학술적 어투 사용
- 단락 구분을 명확하게"`}</code></pre>
            </div>

            <h3>1.2 보고서 유형별 프롬프트</h3>
            <table className="lesson-table">
              <thead>
                <tr><th>유형</th><th>핵심 포인트</th><th>프롬프트 키워드</th></tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>학술 보고서</strong></td>
                  <td>논리적 구조, 참고문헌</td>
                  <td>"학술적 어투로, 근거를 포함하여"</td>
                </tr>
                <tr>
                  <td><strong>비즈니스 보고서</strong></td>
                  <td>핵심 결론 우선, 데이터 기반</td>
                  <td>"경영진 대상, 핵심 요약 포함"</td>
                </tr>
                <tr>
                  <td><strong>기술 보고서</strong></td>
                  <td>정확한 기술 용어, 다이어그램</td>
                  <td>"기술적 세부사항 포함, 단계별"</td>
                </tr>
                <tr>
                  <td><strong>프로젝트 보고서</strong></td>
                  <td>진행 상황, 성과, 이슈</td>
                  <td>"진행률, 마일스톤, 리스크 포함"</td>
                </tr>
              </tbody>
            </table>

            <h2>2. AI 요약</h2>

            <h3>2.1 요약 유형</h3>
            <table className="lesson-table">
              <thead>
                <tr><th>유형</th><th>설명</th><th>프롬프트 예시</th></tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>핵심 요약</strong></td>
                  <td>핵심 내용만 간결하게</td>
                  <td>"이 글의 핵심을 3문장으로 요약해주세요"</td>
                </tr>
                <tr>
                  <td><strong>구조적 요약</strong></td>
                  <td>항목별로 정리</td>
                  <td>"이 글을 주제별로 분류하여 불릿 포인트로 정리해주세요"</td>
                </tr>
                <tr>
                  <td><strong>단계별 요약</strong></td>
                  <td>단계별/시간순 정리</td>
                  <td>"이 과정을 시간순으로 단계별로 요약해주세요"</td>
                </tr>
                <tr>
                  <td><strong>비교 요약</strong></td>
                  <td>차이점 중심 요약</td>
                  <td>"A안과 B안의 차이점을 표로 비교해주세요"</td>
                </tr>
              </tbody>
            </table>

            <h3>2.2 요약 프롬프트 팁</h3>
            <div className="code-block">
              <div className="code-header">효과적인 요약 프롬프트</div>
              <pre><code>{`"다음 글을 요약해주세요.

조건:
- 대상: 대학생 (배경 지식 중간 수준)
- 분량: 원문의 1/5 수준
- 형식: 핵심 주장 1개 + 근거 3개의 불릿 리스트
- 원문에 없는 내용은 추가하지 마세요

[원문 텍스트]"`}</code></pre>
            </div>

            <h2>3. AI 번역</h2>

            <h3>3.1 번역 품질 높이기</h3>
            <p>
              단순히 "번역해주세요"보다 <strong>문맥, 대상, 용도</strong>를 함께 알려주면
              더 자연스러운 번역을 얻을 수 있습니다.
            </p>

            <div className="code-block">
              <div className="code-header">효과적인 번역 프롬프트</div>
              <pre><code>{`"다음 영어 기술 문서를 한국어로 번역해주세요.

조건:
- 기술 용어는 영어 원문을 괄호에 병기
  (예: 인공지능(AI))
- 자연스러운 한국어 어순 사용
- 학술 논문 스타일의 존댓말
- 약어는 처음 등장 시 풀어서 설명

[영어 원문]"`}</code></pre>
            </div>

            <h2>4. AI 이메일 작성</h2>

            <h3>4.1 상황별 이메일 프롬프트</h3>
            <div className="code-block">
              <div className="code-header">공식 이메일 작성</div>
              <pre><code>{`"교수님께 과제 제출 기한 연장을 요청하는
이메일을 작성해주세요.

상황:
- 컴퓨팅 사고 수업의 5주차 과제
- 가족 경조사로 인해 2일 연장 요청
- 공손하고 격식 있는 어투
- 대안 제시 (기한 내 중간 결과물 제출 가능)"`}</code></pre>
            </div>

            <div className="code-block">
              <div className="code-header">비즈니스 이메일 작성</div>
              <pre><code>{`"프로젝트 진행 상황을 팀원들에게 공유하는
이메일을 작성해주세요.

포함 내용:
- 완료된 작업 3가지
- 진행 중인 작업 2가지
- 도움이 필요한 부분 1가지
- 다음 주 계획

어투: 간결하고 전문적, 불릿 포인트 활용"`}</code></pre>
            </div>

            <h2>5. 주의사항과 윤리</h2>
            <table className="lesson-table">
              <thead>
                <tr><th>주의사항</th><th>설명</th></tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>사실 확인</strong></td>
                  <td>AI가 생성한 통계, 인용, 사례는 반드시 원문을 확인합니다. AI는 없는 내용을 그럴듯하게 만들 수 있습니다.</td>
                </tr>
                <tr>
                  <td><strong>표절 주의</strong></td>
                  <td>AI 생성 문서를 그대로 제출하면 학술 윤리에 위배될 수 있습니다. 참고 자료로 활용하고, 자신의 관점으로 재작성합니다.</td>
                </tr>
                <tr>
                  <td><strong>AI 사용 명시</strong></td>
                  <td>학술 보고서나 과제에서 AI 도구를 사용한 경우 반드시 명시합니다.</td>
                </tr>
                <tr>
                  <td><strong>개인 검토</strong></td>
                  <td>AI가 작성한 문서를 반드시 직접 읽고 검토합니다. 맥락에 맞지 않거나 부정확한 내용을 수정합니다.</td>
                </tr>
                <tr>
                  <td><strong>기밀 정보</strong></td>
                  <td>회사 기밀, 개인정보 등 민감한 정보를 AI에 입력하지 않도록 주의합니다.</td>
                </tr>
              </tbody>
            </table>

            <div className="callout-box">
              <h3>핵심 정리</h3>
              <ul>
                <li>AI <strong>보고서 작성</strong>은 개요 → 섹션별 작성의 단계적 접근이 효과적이다.</li>
                <li>AI <strong>요약</strong>은 대상, 분량, 형식을 지정하면 더 유용한 결과를 얻는다.</li>
                <li>AI <strong>번역</strong>은 문맥, 대상, 용도를 함께 알려주면 품질이 향상된다.</li>
                <li>AI <strong>이메일</strong>은 상황, 어투, 포함 내용을 구체적으로 지시한다.</li>
                <li>AI 생성 문서는 반드시 <strong>사실 확인</strong>과 <strong>개인 검토</strong>를 거쳐야 한다.</li>
              </ul>
            </div>

            <div className="lesson-nav">
              <Link to="/ai-tips/coding" className="lesson-nav-btn prev">← AI 코딩 활용</Link>
              <Link to="/ai-tips/learning" className="lesson-nav-btn next">AI 학습 활용 →</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AiTipsWriting;
