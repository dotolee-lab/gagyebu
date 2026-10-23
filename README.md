# 우리집 가계부

GitHub Pages(화면) + Supabase(DB·로그인)로 서버 없이 운영하는 부부 공용 가계부.

## 처음 한 번만 설정 (약 15분)

### 1. Supabase
1. https://supabase.com 가입 → **New project** (Region: Northeast Asia (Seoul))
2. 왼쪽 **SQL Editor** → `schema.sql` 내용 붙여넣기 → 맨 아래 이메일 두 개를 실제 이메일로 수정 → **Run**
3. **Authentication → Users → Add user → Create new user** 로 두 사람 계정 생성 (이메일·비밀번호, *Auto Confirm User* 체크)
4. **Authentication → Sign In / Providers** 에서 **Allow new users to sign up** 끄기
5. **Project Settings → API** 에서 `Project URL` 과 `anon public` 키 복사

### 2. config.js
복사한 두 값을 `config.js` 에 붙여넣기. (`service_role` 키는 절대 넣지 마세요)

### 3. GitHub Pages
1. GitHub에서 새 저장소 만들기 (예: `gagyebu`) → 이 폴더 파일 전부 업로드
2. 저장소 **Settings → Pages** → Source: *Deploy from a branch*, Branch: `main` / `(root)` → Save
3. 1~2분 뒤 `https://<아이디>.github.io/gagyebu/` 접속 → 로그인

### 4. (선택) 휴대폰 홈 화면에 추가
사파리/크롬에서 주소 열고 "홈 화면에 추가"하면 앱처럼 쓸 수 있어요.

## 알아둘 점
- 저장소가 공개여도 괜찮아요. 코드와 anon 키만 보이고, 데이터는 `allowed_users` 에 등록된 두 이메일로 로그인해야만 읽고 쓸 수 있어요.
- Supabase 무료 플랜은 **7일 동안 접속이 없으면 프로젝트가 일시정지**돼요. 대시보드에서 Restore 누르면 데이터 그대로 돌아와요. 매주 가계부를 쓰면 문제없어요.
- 백업: 설정 탭 → **전체 백업 (JSON)** 을 한 달에 한 번 받아두세요.

## 도토리 방앗간 경기 데이터 연결 (선택)

1. **SQL Editor**: `sports_schema.sql` 실행 (경기 데이터 캐시 테이블)
2. **Edge Functions → Secrets**에 추가
   - `FD_KEY` = football-data.org API 키 (필수)
   - `TSDB_KEY` = TheSportsDB 키 (선택, 없으면 무료 공용 키 사용)
3. **Edge Functions → Deploy a new function → Via Editor**
   - 함수 이름: `sports`
   - `supabase/functions/sports/index.ts` 내용을 통째로 붙여넣고 **Deploy**
   - 배포 후 Settings에서 "Verify JWT with legacy secret"은 끄세요 (함수 안에서 허용 목록을 직접 확인해요)
4. GitHub에 `toto.html` 올리기 → 도토리 방앗간 **경기** 탭에서 확인

데이터 출처: 유럽 5대 리그 football-data.org / MLB 공식 Stats API / NBA ESPN 공개 데이터 / KBO TheSportsDB (KBO 순위는 무료 데이터 없음).
한 번 불러온 경기는 DB에 저장돼서(지난 경기 7일, 오늘 10분, 미래 6시간) 무료 한도를 아껴요.

## 여행 계획 페이지 (travel.html)

1. **SQL Editor**: `travel_schema.sql` 실행 (한 번만)
2. GitHub에 `travel.html` 올리고, 수정된 `index.html` 덮어쓰기
3. 가계부 위쪽 「가계부 | 여행」 버튼으로 이동 — 가계부와 같은 계정·같은 로그인

기능: 여행 목록(D-day) / 날짜별 일정(지도 링크) / 사람별 준비물 체크 / 예약(항공·숙소 등, 결제 여부) / 예산(가계부 '여행비' 지출을 자동으로 가져와 비교) / 메모

## 건강 기록 페이지 (health.html)

1. **SQL Editor**: `health_schema.sql` 실행 (한 번만)
2. GitHub에 `health.html` 올리고, 수정된 `index.html`·`travel.html` 덮어쓰기
3. 위쪽 「가계부 | 여행 | 건강」 버튼으로 이동 — 같은 계정, 두 사람 모두 서로 기록을 볼 수 있음

기능: 요약(국가검진 대상 연도·다음 검진 D-day·최근 수치 변화) / 검진 예약·준비 체크리스트·결과 수치·소견 / 결과 추이 그래프 / 예방접종 / 비용(가계부 의료비 연동) / 설정(출생연도, 결과지 정상 범위)

## 다람이 — 자동차 관리 (car.html)

1. **SQL Editor**: `car_schema.sql` 실행 (한 번만)
2. GitHub에 `car.html` 올리고, 수정된 `index.html`·`travel.html`·`health.html` 덮어쓰기
3. 처음엔 **서류·일정 → 수정**에서 차량번호·보험 만기·검사 유효기간을, **정비·소모품 → 교체 주기 고치기**에서 마지막 교체 날짜를 넣기

기능: 홈(주행거리·주차 위치·곧 챙길 것) / 주유(가계부 주유 결제 불러와 주행거리만 입력, 연비 자동 계산) / 정비·소모품(투싼 2018 디젤 기본 주기, 남은 km·기간) / 서류·일정(보험·정기검사·자동차세·할부·차량 정보) / 비용(가계부 차량비 항목별·km당 비용)
곧 챙길 게 있으면 다른 페이지의 「다람이」 버튼에 빨간 점이 떠요.

## 큩토리 부엌 — 레시피·냉장고·장보기 (kitchen.html)

1. **SQL Editor**: `kitchen_schema.sql` 실행 (한 번만)
2. GitHub에 `kitchen.html` 올리고, 수정된 `index.html`·`travel.html`·`health.html`·`car.html` 덮어쓰기

기능: 오늘 뭐 먹지(지금 재료로 만들 수 있는 요리·유통기한 임박) / 냉장고(있음·조금·없음 간단 모드) / 레시피(재료 있음·없음 표시, 해 먹었어요) / 장보기(체크하면 냉장고로, 이번 달 장보기·배달비) / 식단(주간 저녁 메뉴)

## 앱(PWA)·아이콘
- `manifest.json`, `sw.js`, `favicon.ico`, `favicon.png`, `apple-touch-icon.png`, `icon-192.png`, `icon-512.png`, `icon-maskable-192.png`, `icon-maskable-512.png` 를 저장소 맨 위에 올리기
- 휴대폰: 안드로이드 크롬은 메뉴 → "앱 설치(홈 화면에 추가)", 아이폰 사파리는 공유 → "홈 화면에 추가"
- 화면 파일을 고쳤는데 앱에 바로 안 보이면 `sw.js`의 `dotori-v1` 숫자를 올려서 같이 올리기
