import React from 'react';

export default function SingupForm() {
  return (
    <>
      <form autoComplete="chrome-off">
        <fieldset>
          <legend>회원가입 화면</legend>
          <div>
            <p>
              <label htmlFor="username">ID</label>
            </p>
            <input
              type="text"
              id="username"
              placeholder="아이디"
              ref={(ref) => ref && ref.focus()}
              autoComplete="off"
            />
          </div>
          <div>
            <p>
              <label htmlFor="userPassword">PASSWORD</label>
            </p>
            <input type="password" id="userPassword" placeholder="비밀번호" />
          </div>
          <div>
            <p>
              <label htmlFor="confirmPassword">CONFIRM PASSWORD</label>
            </p>
            <input
              type="password"
              id="confirmPassword"
              placeholder="비밀번호 확인"
            />
          </div>
          <button>회원가입</button>
        </fieldset>
      </form>
    </>
  );
}
