import React from 'react';

export default function LoginForm() {
  return (
    <>
      <form>
        <fieldset>
          <legend>로그인 화면</legend>
          <div>
            <p>
              <label htmlFor="username">ID</label>
            </p>
            <input
              type="text"
              id="username"
              placeholder="아이디"
              ref={(ref) => ref && ref.focus()}
            />
          </div>
          <div>
            <p>
              <label htmlFor="userPassword">PASSWORD</label>
            </p>
            <input type="password" id="userPassword" placeholder="비밀번호" />
          </div>
          <button>로그인</button>
        </fieldset>
      </form>
    </>
  );
}
