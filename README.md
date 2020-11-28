# lets-drawing 1.0.0

자바스크립트로 만든 웹 그림판에 기능 추가하여 리액트와 노드 익스프레스로 리뉴얼한 프로젝트

<br>

## 개발 이슈

- 웹서버 사용하여 배포(OCI)
- 계획 밖의 반응형 추가(모바일 대응 터치이벤트 적용)

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
