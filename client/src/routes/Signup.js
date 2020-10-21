import React, { useCallback } from 'react';
import SingupForm from '../components/auth/SingupForm';
import styled from 'styled-components';
import { modal } from '../redux/modules/portal';
import { useDispatch } from 'react-redux';
import Login from './Login';

const SignUpLayout = styled.div`
  width: 30%;
  height: 40%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  h2 {
    font-size: 2.2rem;
    font-weight: 800;
    margin-bottom: 20px;
  }
  > p {
    text-align: center;
    font-size: 0.8rem;
    padding: 10px;
    span {
      vertical-align: top;
      font-weight: 800;
      color: #00a9ff;
      &:hover {
        text-decoration: underline;
      }
    }
  }
  form {
    width: 60%;
  }

  form p {
    color: #a0a0a0;
    font-size: 0.8rem;
  }
  form input {
    background: #e8f0fe;
    padding: 8px 10px;
    border-radius: 3px;
    border: inherit;
    margin-bottom: 10px;
    width: 100%;
    &:focus {
      outline: 1px solid #00a9ff;
    }
  }

  form button {
    width: 100%;
    text-align: center;
    border: 1px solid #00bcd4;
    padding: 5px 0;
    border-radius: 3px;
    box-sizing: border-box;
    transition: ease-in 0.3s;
    margin-top: 5px;
    margin-bottom: 10px;
    color: #00bcd4;
    &:hover {
      background: #00bcd4;
      color: #fff;
    }
  }
`;

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
        회원이신가요? <span onClick={goLoginModal}>로그인하기</span>
      </p>
    </SignUpLayout>
  );
}
