# 🚀 1인 크리에이터 통합 사업자등록 플랫폼 웹사이트

**대구광역시 규제혁신 아이디어 공모전 제안서 구현**

## 📋 프로젝트 개요

이 웹사이트는 2025년 대구광역시 규제혁신 아이디어 공모전에 제출된 "1인 크리에이터 통합 사업자등록 플랫폼 구축을 통한 디지털 경제 활성화" 제안서의 실현 가능성을 보여주는 **프로토타입**입니다.

### 🎯 핵심 아이디어
- **네이버 데이터랩 분석**: 2024년 신산업 분야 **400% 급증** 실증 데이터 기반
- **원스톱 플랫폼**: 복잡한 사업자등록을 **24시간 내** 완료
- **AI 기반 서비스**: 플랫폼 연동 및 업종 자동 추천
- **대구시 특화**: 지역 크리에이터 육성 정책 연계

## 🗂️ 파일 구조

```
website/
├── index.html              # 메인 홈페이지
├── register.html           # 사업자등록 시뮬레이션
├── data-analysis.html      # 네이버 데이터랩 분석
├── contact.html            # 문의하기
├── css/
│   └── style.css          # 커스텀 스타일
├── js/
│   ├── main.js            # 메인 자바스크립트
│   ├── register.js        # 등록 시뮬레이션
│   └── data-analysis.js   # 데이터 분석 차트
├── data/
│   ├── trend-data.json    # 네이버 데이터랩 트렌드 데이터
│   └── platform-data.json # 플랫폼 및 업종 정보
└── README.md              # 이 파일
```

## 🛠️ 기술 스택

### Frontend
- **HTML5**: 시맨틱 마크업
- **CSS3**: Flexbox, Grid, 애니메이션
- **Tailwind CSS**: 유틸리티 기반 스타일링
- **JavaScript (ES6+)**: 바닐라 JS, 모듈화
- **Chart.js**: 데이터 시각화

### Design
- **Pretendard 폰트**: 한국어 최적화 폰트
- **반응형 디자인**: Mobile First 접근법
- **접근성**: WCAG 2.1 AA 준수
- **다크모드**: 시스템 설정 연동

## 🚀 주요 기능

### 1. 메인 페이지 (index.html)
- **Hero Section**: 임팩트 있는 메인 메시지
- **실시간 차트**: 네이버 데이터랩 트렌드 미리보기
- **핵심 수치**: 시간단축, 세수증대, 창업지원 등
- **기능 소개**: 원스톱 시스템, AI 추천, 플랫폼 연동

### 2. 사업자등록 시뮬레이션 (register.html)
- **4단계 프로세스**: 기본정보 → 플랫폼 → 업종 → 완료
- **실시간 미리보기**: 사업자등록증 미리보기
- **진행률 표시**: 시각적 프로그레스 바
- **폼 검증**: 실시간 입력 검증 및 피드백

### 3. 데이터 분석 (data-analysis.html)
- **트렌드 차트**: 분야별 28개월 검색량 변화
- **비교 분석**: 5개 분야 평균 검색비율
- **상세 테이블**: 월별 상세 데이터
- **다운로드**: CSV, JSON, HTML 리포트 생성

### 4. 문의하기 (contact.html)
- **문의 폼**: 이메일 자동 발송 (시뮬레이션)
- **연락처 정보**: 대구시 기업지원과 정보
- **FAQ**: 자주 묻는 질문 정리
- **빠른 도움말**: 카테고리별 문의 안내

## 📱 반응형 지원

### 브레이크포인트
- **Mobile**: 0-767px (375px 기준)
- **Tablet**: 768-1023px
- **Desktop**: 1024px+

### 최적화 요소
- 모바일 햄버거 메뉴
- 터치 친화적 버튼 크기
- 가로/세로 방향 모두 지원
- 고해상도 디스플레이 대응

## 🎨 디자인 시스템

### 컬러 팔레트
```css
--primary-blue: #2563eb
--primary-purple: #8b5cf6
--success-green: #10b981
--warning-orange: #f59e0b
--danger-red: #ef4444
```

### 타이포그래피
- **Primary**: Pretendard
- **Fallback**: -apple-system, BlinkMacSystemFont, sans-serif
- **Size Scale**: 12px ~ 48px (반응형)

## 📊 데이터 기반 설계

### 네이버 데이터랩 실제 분석 결과 반영
- **신산업 분야**: 2024년 400% 급증 (실증 데이터)
- **5개 분야 비교**: 28개월간 상대적 검색량 분석
- **성공 확률 예측**: 데이터 기반 승률 계산

### JSON 데이터 구조
```json
{
  "metadata": { "분석 기간, 출처 등" },
  "summary": { "핵심 지표" },
  "monthly_data": [ "월별 상세 데이터" ],
  "insights": [ "핵심 인사이트" ],
  "predictions": { "예측 및 권장사항" }
}
```

## 🔧 개발자 가이드

### 로컬 개발 환경 설정
```bash
# 1. 파일 다운로드
git clone [repository-url]
cd website

# 2. 로컬 서버 실행 (Python)
python -m http.server 8000

# 3. 브라우저에서 접속
http://localhost:8000
```

### 주요 JavaScript 함수
```javascript
// 메인 페이지
initHeroChart()        // Hero 섹션 차트 초기화
initSmoothScroll()     // 부드러운 스크롤
initAnimations()       // 스크롤 애니메이션

// 등록 시뮬레이션
showStep(stepNumber)   // 단계별 화면 전환
validateCurrentStep() // 현재 단계 검증
updatePreview()       // 실시간 미리보기

// 데이터 분석
initTrendChart()      // 트렌드 차트 생성
downloadData(format)  // 데이터 다운로드
generateReport()      // HTML 리포트 생성
```

## 📈 성능 최적화

### 로딩 성능
- **이미지 최적화**: WebP 포맷 사용
- **코드 분할**: 페이지별 JavaScript 분리
- **CDN 활용**: Tailwind CSS, Chart.js
- **지연 로딩**: 스크롤 기반 콘텐츠 로딩

### 사용자 경험
- **로딩 상태**: 스켈레톤 UI, 스피너
- **에러 처리**: 친화적 오류 메시지
- **피드백**: 실시간 폼 검증
- **접근성**: 키보드 탐색, 스크린 리더 지원

## 🧪 테스트

### 브라우저 호환성
- **Chrome**: 90+ ✅
- **Firefox**: 88+ ✅
- **Safari**: 14+ ✅
- **Edge**: 90+ ✅

### 모바일 테스트
- **iOS Safari**: 14+ ✅
- **Android Chrome**: 90+ ✅
- **삼성 인터넷**: 최신 버전 ✅

## 📄 라이선스

이 프로젝트는 **MIT 라이선스**하에 배포됩니다.

## 📞 문의

**대구광역시 기업지원과**
- 📧 Email: angellimsc@korea.kr
- ☎️ Phone: 053-803-5859
- 🏢 Address: 대구광역시 북구 연암로 40

---

**🎯 이 웹사이트는 공모전 제안서의 실현 가능성을 입증하기 위한 프로토타입입니다.**  
**실제 서비스 구현 시에는 보안, 성능, 접근성 등을 더욱 강화하여 개발할 예정입니다.**