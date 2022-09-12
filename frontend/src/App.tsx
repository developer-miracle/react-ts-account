import React from 'react';
import { Route, Routes } from 'react-router'
import { BrowserRouter as Router } from 'react-router-dom'
import { observer } from 'mobx-react'
import RouterStore from './store/RouterStore';

import Header from './components/Header'

function App() {
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          {RouterStore.routes.map(route => {
            return <Route key={route.path} path={route.path} element={<route.Component />}></Route>
          })}
        </Routes>
      </Router>
    </div >
  );
}

export default observer(App);
