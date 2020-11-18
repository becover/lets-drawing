import styled from 'styled-components';
const FormStyle = styled.div`
  width: 25%;
  height: 40%;
  min-width: 320px;
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
      cursor: pointer;
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

  .err_message {
    color: tomato;
    font-size: 0.6rem;
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

export default FormStyle;
