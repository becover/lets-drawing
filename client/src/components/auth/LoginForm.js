import Axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import config from '../../_config/config.json';
import Alert from '../../Alert';

export default function LoginForm({ onLogin, onModal, onModalProps }) {
  const refs = {
    usernameRef: useRef(),
    passwordRef: useRef(),
  };
  const [loginInput, setLoginInput] = useState({
    username: '',
    password: '',
  });

  const [feedbackMessage, setFeedbackMessage] = useState('');

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
      Axios.post(`${config.URI}users/signin`, body)
        .then((res) => {
          localStorage.setItem('dw-token', JSON.stringify(res.data.token));
          localStorage.setItem('dw-user', JSON.stringify(res.data.username));
          onLogin(res.data.username);
          onModalProps({ message: '로그인 되었습니다.' });
        })
        .then(() => setLoginInput({ username: '', password: '' }))
        .then(() => onModal(false, null))
        .then(() => onModal(true, Alert))
        .catch((e) => {
          setFeedbackMessage('입력하신 정보가 일치 하지 않습니다.');
        });
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
          <p className="err_message">{feedbackMessage}</p>
          <button type="submit">로그인</button>
        </fieldset>
      </form>
    </>
  );
}
