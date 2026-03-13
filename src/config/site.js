/**
 * 사이트 설정 파일
 * 하위 사이트의 브랜드, 메뉴, 푸터 등을 정의합니다.
 * 이 파일만 수정하면 Navbar/Footer가 자동으로 반영됩니다.
 */

const site = {
  // 사이트 기본 정보
  name: 'Digital Biz 전략세미나',
  nameKo: '디지털비즈니스전략세미나',
  description: '디지털 시대의 비즈니스 전략을 설계하다 - DX, 플랫폼, AI 혁신까지',
  url: 'https://digitalbiz.dreamitbiz.com',

  // 부모 사이트
  parentSite: {
    name: 'DreamIT Biz',
    url: 'https://www.dreamitbiz.com'
  },

  // 브랜드 로고 텍스트
  brand: {
    parts: [
      { text: 'Digital', className: 'brand-dream' },
      { text: ' Biz', className: 'brand-it' },
      { text: ' 전략', className: 'brand-biz' }
    ]
  },

  // 테마 컬러 (meta theme-color)
  themeColor: '#1E40AF',

  // 네비게이션 메뉴
  menuItems: [
    { path: '/', labelKey: 'nav.home' },
    {
      labelKey: 'site.nav.course',
      path: '/course/overview',
      activePath: '/course',
      dropdown: [
        { path: '/course/overview', labelKey: 'site.nav.courseOverview' },
        { path: '/course/weekly-plan', labelKey: 'site.nav.weeklyPlan' },
        { path: '/course/syllabus', labelKey: 'site.nav.syllabus' },
        { path: '/course/case-study', labelKey: 'site.nav.caseStudy' },
      ]
    },
    {
      labelKey: 'site.nav.lessons',
      path: '/lessons',
      activePath: '/lessons',
      dropdown: [
        { path: '/lessons/intro', labelKey: 'site.nav.week01' },
        { path: '/lessons/transformation', labelKey: 'site.nav.week02' },
        { path: '/lessons/platform', labelKey: 'site.nav.week03' },
        { path: '/lessons/data-driven', labelKey: 'site.nav.week04' },
        { path: '/lessons/marketing', labelKey: 'site.nav.week05' },
        { path: '/lessons/ecommerce', labelKey: 'site.nav.week06' },
        { path: '/lessons/social-media', labelKey: 'site.nav.week07' },
        { path: '/lessons/ai-business', labelKey: 'site.nav.week09' },
        { path: '/lessons/fintech', labelKey: 'site.nav.week10' },
        { path: '/lessons/subscription', labelKey: 'site.nav.week11' },
        { path: '/lessons/startup', labelKey: 'site.nav.week12' },
        { path: '/lessons/ethics', labelKey: 'site.nav.week13' },
        { path: '/lessons/global', labelKey: 'site.nav.week14' },
      ]
    },
    {
      labelKey: 'site.nav.aiTips',
      path: '/ai-tips',
      activePath: '/ai-tips',
      dropdown: [
        { path: '/ai-tips/chatgpt', labelKey: 'site.nav.aiChatGPT' },
        { path: '/ai-tips/claude', labelKey: 'site.nav.aiClaude' },
        { path: '/ai-tips/gemini', labelKey: 'site.nav.aiGemini' },
        { path: '/ai-tips/copilot', labelKey: 'site.nav.aiCopilot' },
        { path: '/ai-tips/prompt', labelKey: 'site.nav.aiPrompt' },
        { path: '/ai-tips/coding', labelKey: 'site.nav.aiCoding' },
        { path: '/ai-tips/writing', labelKey: 'site.nav.aiWriting' },
        { path: '/ai-tips/learning', labelKey: 'site.nav.aiLearning' },
      ]
    },
    { path: '/lectures', labelKey: 'site.nav.lectureMaterials', activePath: '/lectures' },
    { path: '/references', labelKey: 'site.nav.references', activePath: '/references' },
    {
      labelKey: 'site.nav.community',
      path: '/community/board',
      activePath: '/community',
      dropdown: [
        { path: '/community/board', labelKey: 'site.nav.board' },
        { path: '/community/gallery', labelKey: 'site.nav.gallery' },
        { path: '/community/portfolio', labelKey: 'site.nav.portfolio' },
        { path: '/community/websites', labelKey: 'site.nav.websites' },
      ]
    }
  ],

  // 푸터 바로가기 링크
  footerLinks: [
    { path: '/', labelKey: 'nav.home' },
    { path: '/course/overview', labelKey: 'site.nav.course' },
    { path: '/lessons', labelKey: 'site.nav.lessons' },
    { path: '/ai-tips', labelKey: 'site.nav.aiTips' },
    { path: '/lectures', labelKey: 'site.nav.lectureMaterials' },
    { path: '/references', labelKey: 'site.nav.references' },
    { path: '/community/board', labelKey: 'site.nav.board' },
    { path: '/community/gallery', labelKey: 'site.nav.gallery' },
    { path: '/community/portfolio', labelKey: 'site.nav.portfolio' },
    { path: '/community/websites', labelKey: 'site.nav.websites' }
  ],

  // Family Site 목록
  familySites: [
    { name: 'DreamIT Biz (본사이트)', url: 'https://www.dreamitbiz.com' },
    { name: 'DreamIT Books', url: 'https://books.dreamitbiz.com' },
    { name: 'KoreaTech 컴퓨팅 사고', url: 'https://koreatech.dreamitbiz.com' }
  ]
};

export default site;
