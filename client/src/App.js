import React, { useEffect } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Gallery from './routes/Gallery';
import Main from './routes/Main';
import Axios from 'axios';

export default function App() {
  useEffect(() => {
    Axios.get('http://localhost:4000/').then((res) => console.log(res.data));
  }, []);
  return (
    <>
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/gallery" component={Gallery} />
      </Switch>
    </>
  );
}
