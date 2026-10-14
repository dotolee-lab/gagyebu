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
