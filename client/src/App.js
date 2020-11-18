import React, { useCallback, useEffect } from 'react';
import config from './_config/config.json';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Gallery from './routes/Gallery';
import Main from './routes/Main';
import Axios from 'axios';
import { useDispatch } from 'react-redux';
import { login, logout } from './redux/modules/auth';
export default function App() {
  const dispatch = useDispatch();
  const onLogin = useCallback(
    (username) => {
      dispatch(login(username));
    },
    [dispatch],
  );

  const onLogout = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);
  // const byebye = (e) => {
  //   e.preventDefault();
  //   e.returnValue = '';
  //   localStorage.removeItem('dw-token');
  //   localStorage.removeItem('dw-user');
  //   alert('정말 그만 그리실 건가요?');
  // };
  useEffect(() => {
    Axios.get(`${config.URI}`).then((res) => console.log(res.data));
    // window.addEventListener('beforeunload', byebye);
  }, []);

  useEffect(() => {
    if (localStorage.getItem('dw-token') && localStorage.getItem('dw-user')) {
      const body = {
        username: JSON.parse(localStorage.getItem('dw-user')),
        Authorization: JSON.parse(localStorage.getItem('dw-token')),
      };
      Axios.post(`${config.URI}/users/`, body).then((res) => {
        if (res.status === 200) onLogin(body.username);
        else onLogout();
      });
    }
  }, [onLogin, onLogout]);
  return (
    <>
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/gallery" component={Gallery} />
      </Switch>
    </>
  );
}
