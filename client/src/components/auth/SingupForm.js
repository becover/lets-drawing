import Axios from 'axios';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import config from '../../_config/config.json';

import styled from 'styled-components';
import Alert from '../../Alert';
import debounce from '../../utils/debounce';

const Checked = styled.span`
  margin-left: 5px;
  font-size: 0.5rem;
  ${(props) => props.validations && `color:royalblue`}
  ${(props) => !props.validations && `color:tomato`};
`;
export default function SingupForm({ onModal, onModalProps }) {
  const refs = {
    usernameRef: useRef(),
    passwordRef: useRef(),
    confirmPasswordRef: useRef(),
  };

  const [signUpInput, setSignUpInput] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });

  const [feedbackMassege, setFeedbackMassege] = useState('');
  const [validations, setValidations] = useState({
    validation: false,
    available: false,
  });

  const onChangeInput = (e) => {
    setSignUpInput({
      ...signUpInput,
      [e.target.name]: e.target.value,
    });
  };

  const onCheckUsername = useCallback(() => {
    const username = refs.usernameRef.current.value;
    Axios.get(`${config.URI}users/ckeckUsername?username=${username}`)
      .then((res) => {
        if (res.status === 404) {
          setFeedbackMassege('사용할 수 없는 아이디 입니다.');
        } else {
          setFeedbackMassege(res.data.message);
          setValidations({ validation: true, available: true });
        }
      })
      .catch((e) => {
        setFeedbackMassege('사용할 수 없는 아이디 입니다.');
        setValidations({ validation: true, available: false });
      });
  }, [refs.usernameRef]);

  const checkUsername = (username) => {
    const usernameRegExp = /^[A-Za-z0-9]{4,12}$/;
    if (!username) {
      alert('아이디를 입력하세요');
      refs.usernameRef.current.focus();
      return false;
    } else if (usernameRegExp.test(username)) {
      return true;
    } else {
      alert('영문 대소문자와 숫자 4~12자리로 입력해 주세요');
      refs.usernameRef.current.focus();
      return false;
    }
  };

  const checkPassword = (password, confirmPassword) => {
    const passwordRegExp = /^[a-zA-z0-9]{4,12}$/;
    if (!password) {
      alert('비밀번호를 입력하세요');
      refs.passwordRef.current.focus();
      return false;
    } else if (!confirmPassword) {
      alert('비밀번호를 확인해주세요');
      refs.confirmPasswordRef.current.focus();
      return false;
    } else if (!passwordRegExp.test(password)) {
      alert('영문 대소문자와 숫자 4~12자리로 입력해 주세요');
      refs.passwordRef.current.focus();
      return false;
    } else if (password !== confirmPassword) {
      alert('비밀번호와 똑같이 입력해 주세요.');
      refs.confirmPasswordRef.current.focus();
      return false;
    } else {
      return true;
    }
  };

  const onSubmitForm = (e) => {
    e.preventDefault();
    if (
      checkUsername(signUpInput.username) &&
      checkPassword(signUpInput.password, signUpInput.confirmPassword)
    ) {
      if (feedbackMassege === '가입 할 수 있는 아이디입니다.') {
        const body = signUpInput;
        Axios.post(`${config.URI}users/signup`, body)
          .then((res) => {
            onModalProps({ message: res.data.message });
          })
          .then(() => onModal(false, null))
          .then(() => onModal(true, Alert))
          .then(() => setSignUpInput({ username: '', password: '' }));
      } else {
        alert('아이디를 확인 해 주세요');
      }
    }
  };

  useEffect(() => {
    refs.usernameRef.current && refs.usernameRef.current.focus();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    refs.usernameRef.current.addEventListener(
      'input',
      debounce(onCheckUsername, 1500),
    );
    return () =>
      refs.usernameRef.current.removeEventListener('input', onCheckUsername);
  }, [onCheckUsername, refs.usernameRef]);
  return (
    <>
      <form autoComplete="chrome-off" onSubmit={onSubmitForm}>
        <fieldset>
          <legend>회원가입 화면</legend>
          <div>
            <p>
              <label htmlFor="username">ID</label>
              <Checked validations={validations.available}>
                {validations.validation && feedbackMassege}
              </Checked>
            </p>
            <input
              type="text"
              id="username"
              placeholder="아이디(영문 대소문자와 숫자 4~12자리)"
              name="username"
              ref={refs.usernameRef}
              value={signUpInput.username}
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
              placeholder="비밀번호(영문 대소문자와 숫자 4~12자리)"
              ref={refs.passwordRef}
              value={signUpInput.userPassword}
              autoComplete="off"
              onChange={onChangeInput}
            />
          </div>
          <div>
            <p>
              <label htmlFor="confirmPassword">CONFIRM PASSWORD</label>
            </p>
            <input
              type="password"
              id="confirmPassword"
              placeholder="비밀번호를 한번 더 입력해 주세요"
              name="confirmPassword"
              ref={refs.confirmPasswordRef}
              value={signUpInput.confirmPassword}
              onChange={onChangeInput}
              autoComplete="off"
            />
          </div>
          <button>회원가입</button>
        </fieldset>
      </form>
    </>
  );
}
