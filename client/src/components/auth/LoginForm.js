import Axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';

export default function LoginForm({ onLogin, onModal }) {
  const refs = {
    usernameRef: useRef(),
    passwordRef: useRef(),
  };
  const [loginInput, setLoginInput] = useState({
    username: '',
    password: '',
  });

  const onChangeInput = (e) => {
    setLoginInput({
      ...loginInput,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitForm = (e) => {
    e.preventDefault();
    if (!loginInput.username) {
      alert('아이디를 입력하세요');
      refs.usernameRef.current.focus();
    } else if (!loginInput.password) {
      alert('비밀번호를 입력하세요');
      refs.passwordRef.current.focus();
    } else {
      const body = loginInput;
      Axios.post(`http://localhost:4000/users/signin`, body)
        .then((res) => {
          console.log(res);
          localStorage.setItem('dw-token', JSON.stringify(res.data.token));
          localStorage.setItem('dw-user', JSON.stringify(res.data.username));
          onLogin(res.data.username);
        })
        .then(() => setLoginInput({ username: '', password: '' }))
        .then(() => onModal(false, null));
    }
  };

  useEffect(() => {
    refs.usernameRef.current && refs.usernameRef.current.focus();
  }, []); // eslint-disable-line

  return (
    <>
      <form onSubmit={onSubmitForm}>
        <fieldset>
          <legend>로그인 화면</legend>
          <div>
            <p>
              <label htmlFor="username">ID</label>
            </p>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="아이디"
              ref={refs.usernameRef}
              value={loginInput.username}
              onChange={onChangeInput}
              autoComplete="off"
            />
          </div>
          <div>
            <p>
              <label htmlFor="userPassword">PASSWORD</label>
            </p>
            <input
              type="password"
              id="userPassword"
              name="password"
              placeholder="비밀번호"
              ref={refs.passwordRef}
              value={loginInput.password}
              onChange={onChangeInput}
              autoComplete="off"
            />
          </div>
          <button type="submit">로그인</button>
        </fieldset>
      </form>
    </>
  );
}
