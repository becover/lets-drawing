import React, { useCallback, useEffect } from 'react';
import LoginForm from '../components/auth/LoginForm';
import Signup from './Signup';
import { useDispatch } from 'react-redux';
import { modal } from '../redux/modules/portal';
import FormStyle from '../FormStyle';
import { login, logout } from '../redux/modules/auth';

const LoginLayout = FormStyle;

export default function Login() {
  const dispatch = useDispatch();
  const onModal = useCallback((state, compo) => dispatch(modal(state, compo)), [
    dispatch,
  ]);
  const onLogout = useCallback(() => dispatch(logout()), [dispatch]);
  const onLogin = useCallback(
    (username, password) => dispatch(login(username, password)),
    [dispatch],
  );
  const handleModal = (e) => {
    e.stopPropagation();
  };
  const goSignupModal = () => {
    onModal(true, Signup);
  };
  useEffect(() => {
    onLogout();
  }, [onLogout]);
  return (
    <LoginLayout onClick={(e) => handleModal(e)}>
      <h2>LOGIN</h2>
      <LoginForm onLogin={onLogin} onModal={onModal} />
      <p>
        아이디가 없나요? <span onClick={goSignupModal}>가입하기</span>
      </p>
    </LoginLayout>
  );
}
