import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import SEOHead from '../components/SEOHead';

const PDF_LIST = [
  { week: 1, file: 'week01.pdf', title: '입력과 출력 (변수, print, input)', titleEn: 'Input & Output (Variables, print, input)' },
  { week: 2, file: 'week02.pdf', title: '데이터 연산 (계산기 만들기)', titleEn: 'Data Operations (Building a Calculator)' },
  { week: 3, file: 'week03.pdf', title: '데이터 표현 및 조작 (리스트)', titleEn: 'Data Representation & Manipulation (Lists)' },
  { week: 4, file: 'week04.pdf', title: '문제 정의와 핵심아이디어', titleEn: 'Problem Definition & Key Ideas' },
  { week: 5, file: 'week05.pdf', title: '컴퓨터로 이해하기 (터틀 그래픽)', titleEn: 'Understanding with Computers (Turtle Graphics)' },
  { week: 6, file: 'week06.pdf', title: '기능 단위 분리 (함수)', titleEn: 'Modular Design (Functions)' },
  { week: 7, file: 'week07.pdf', title: '알고리즘 표현 (순서도)', titleEn: 'Algorithm Representation (Flowchart)' },
  { week: 8, file: 'week08.pdf', title: '조건문 실습 (if-else)', titleEn: 'Conditionals Practice (if-else)' },
  { week: 9, file: 'week09.pdf', title: '반복문 실습 (while, for)', titleEn: 'Loops Practice (while, for)' },
  { week: 10, file: 'week10.pdf', title: '알고리즘 심화 (정렬 등)', titleEn: 'Advanced Algorithms (Sorting, etc.)' },
  { week: 11, file: 'week11.pdf', title: '에러와 디버깅', titleEn: 'Errors & Debugging' },
  { week: 12, file: 'week12.pdf', title: '프로젝트 (포트폴리오 만들기)', titleEn: 'Project (Building a Portfolio)' },
];

const LectureMaterials = () => {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const { isLoggedIn } = useAuth();
  const { showToast } = useToast();

  const getPdfUrl = (file) => `${import.meta.env.BASE_URL}pdf/${file}`;

  const handleDownload = (e, file) => {
    if (!isLoggedIn) {
      e.preventDefault();
      showToast(t('download.loginRequired'), 'error');
      navigate('/login');
    }
  };

  return (
    <>
      <SEOHead title={t('site.lectures.title')} path="/lectures" />

      <section className="page-header">
        <div className="container">
          <h1>{t('site.lectures.title')}</h1>
          <p>{t('site.lectures.subtitle')}</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="materials-table-wrapper">
            <table className="materials-table">
              <thead>
                <tr>
                  <th className="materials-col-week">{t('site.lectures.materials.week')}</th>
                  <th>{t('site.lectures.materials.titleLabel')}</th>
                  <th className="materials-col-file">{t('site.lectures.materials.fileName')}</th>
                  <th className="materials-col-actions">{t('site.lectures.materials.actions')}</th>
                </tr>
              </thead>
              <tbody>
                {PDF_LIST.map((pdf) => (
                  <tr key={pdf.week}>
                    <td className="materials-col-week">
                      <span className="materials-week-badge">
                        {pdf.week}{t('site.lectures.materials.weekUnit')}
                      </span>
                    </td>
                    <td className="materials-title-cell">
                      {language === 'ko' ? pdf.title : pdf.titleEn}
                    </td>
                    <td className="materials-col-file materials-file-cell">{pdf.file}</td>
                    <td className="materials-col-actions">
                      <div className="materials-btn-group">
                        <a
                          className="materials-btn newtab"
                          href={getPdfUrl(pdf.file)}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => handleDownload(e, pdf.file)}
                        >
                          {t('site.lectures.materials.view')}
                        </a>
                        <a
                          className="materials-btn download"
                          href={getPdfUrl(pdf.file)}
                          download={pdf.file}
                          onClick={(e) => handleDownload(e, pdf.file)}
                        >
                          {t('site.lectures.materials.download')}
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
};

export default LectureMaterials;
