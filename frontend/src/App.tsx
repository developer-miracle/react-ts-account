import React from 'react';
import { Route, Routes } from 'react-router'
import { BrowserRouter as Router } from 'react-router-dom'
import { observer } from 'mobx-react'
import RouterStore from './store/RouterStore';

import Header from './components/Header'
import Footer from './components/Footer';
const header = {
  /* 0 flex-grow, 0 flex-shrink, auto flex-basis */
  flex: '0 0 auto'
}
const section = {
  /* 1 flex-grow, 0 flex-shrink, auto flex-basis */
  flex: '1 0 auto'
}
const footer = {
  /* 0 flex-grow, 0 flex-shrink, auto flex-basis */
  flex: '0 0 auto'
}
function App() {
  return (
    <Router>
      <header style={header}>
        <Header />
      </header>
      <section style={section}>
        <Routes>
          {RouterStore.routes.map(route => {
            return <Route key={route.path} path={route.path} element={<route.Component />}></Route>
          })}
        </Routes>
      </section>
      <footer style={footer}>
        <Footer />
      </footer>
    </Router>
  );
}

export default observer(App);
