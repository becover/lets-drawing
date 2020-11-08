import React, { useCallback } from 'react';
import LoginForm from '../components/auth/LoginForm';
import Signup from './Signup';
import { useDispatch } from 'react-redux';
import { modal } from '../redux/modules/portal';
import FormStyle from '../FormStyle';
import { authentication } from '../redux/modules/auth';

const LoginLayout = FormStyle;

export default function Login() {
  const dispatch = useDispatch();
  const onModal = useCallback((state, compo) => dispatch(modal(state, compo)), [
    dispatch,
  ]);
  const onAuth = useCallback(
    (kinds, value) => dispatch(authentication(kinds, value)),
    [dispatch],
  );
  const handleModal = (e) => {
    e.stopPropagation();
  };
  const goSignupModal = () => {
    onModal(true, Signup);
  };
  return (
    <LoginLayout onClick={(e) => handleModal(e)}>
      <h2>LOGIN</h2>
      <LoginForm onAuth={onAuth} onModal={onModal} />
      <p>
        아이디가 없나요? <span onClick={goSignupModal}>가입하기</span>
      </p>
    </LoginLayout>
  );
}
