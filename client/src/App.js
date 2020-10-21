import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Gallery from './routes/Gallery';
import GalleryDetail from './routes/GalleryDetail';
import Main from './routes/Main';

export default function App() {
  return (
    <>
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/gallery" component={Gallery} />
        <Route path="/gallery/:id" component={GalleryDetail} />
      </Switch>
    </>
  );
}
