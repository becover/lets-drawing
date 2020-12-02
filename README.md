# lets-drawing 1.0.0

자바스크립트로 만든 웹 그림판에 기능 추가하여 리액트와 노드 익스프레스로 리뉴얼한 프로젝트

<br>

<img src="https://github.com/becover/lets-drawing/blob/master/readmeImg/pc_main.png" width="40%" title="pc메인화면" alt="pc메인화면"></img><img src="https://github.com/becover/lets-drawing/blob/master/readmeImg/pc_logged.png" width="40%" title="pc로그인한 메인화면" alt="pc로그인한 메인화면"></img><img src="https://github.com/becover/lets-drawing/blob/master/readmeImg/pc_login.png" width="40%" title="login모달" alt="login모달"></img><img src="https://github.com/becover/lets-drawing/blob/master/readmeImg/pc_signup.png" width="40%" title="signup모달" alt="signup모달"></img><img src="https://github.com/becover/lets-drawing/blob/master/readmeImg/pc_gallery.png" width="40%" title="pc갤러리페이지" alt="pc갤러리페이지"></img><img src="https://github.com/becover/lets-drawing/blob/master/readmeImg/pc_gallerydetail.png" width="40%" title="pc갤러리디테일모달" alt="pc갤러리디테일모달"></img>

## 개발 이슈

- 웹서버 사용하여 배포(OCI)
- 계획 밖의 반응형 추가(모바일 대응 터치이벤트 적용)

<img src="https://github.com/becover/lets-drawing/blob/master/readmeImg/m_fold.png" width="40%" title="mobile메인 접힌툴" alt="mobile메인 접힌툴"></img><img src="https://github.com/becover/lets-drawing/blob/master/readmeImg/m_unflod.png" width="40%" title="mobile메인 펼쳐진툴" alt="mobile메인 펼쳐진툴"></img>

## 사용한 기술들

- React.js
- React-redux
- Node.js
- express
- MongoDB
- Canvas
- Jwt
- SSL(Let's encrypt)

## 그림판 기능

### 1. Drawing

- 그리기
- 칠하기(Paint all)

### 2. History

- 실행 취소(undo) : <code>ctrl</code> + <code>z</code>
- 되돌리기(redo) : <code>ctrl</code> + <code>shift</code> + <code>z</code>

### 3. Text

- 채워진 글씨
- 테두리 글씨
- 스타일 수정(색, 크기, 테두리, 투명도) 가능 (확정 전까지 수정 가능)
- 위치 이동 가능 (draggable, 확정 전까지 수정 가능)

### 4. Shapes

- Rectangle
- Triangle
- Circle

### 5. Colors

- View current color
- Color picker
- Pipette
- Color opacity control with range scroll

### 6. Gallery

- Infinity scroll pagination
- Repaint
- Save (to local)
- Load (from cloud)
- Delete

### 7. System

- Save (to cloud)
- Load (from local)
- New page
- login/logout
