import React, { useCallback } from 'react';
import SingupForm from '../components/auth/SingupForm';
import { modal } from '../redux/modules/portal';
import { useDispatch } from 'react-redux';
import Login from './Login';
import FormStyle from '../FormStyle';

const SignUpLayout = FormStyle;

export default function Signup() {
  const dispatch = useDispatch();
  const onModal = useCallback((state, compo) => dispatch(modal(state, compo)), [
    dispatch,
  ]);
  const handleModal = (e) => {
    e.stopPropagation();
  };
  const goLoginModal = () => {
    onModal(true, Login);
  };
  return (
    <SignUpLayout onClick={(e) => handleModal(e)}>
      <h2>SIGNUP</h2>
      <SingupForm />
      <p>
        이미 회원이신가요? <span onClick={goLoginModal}>로그인하기</span>
      </p>
    </SignUpLayout>
  );
}
