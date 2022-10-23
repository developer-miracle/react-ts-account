import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { observer } from 'mobx-react'
import RouterStore from '../store/RouterStore';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom'
import Header from './common/Header'
import Footer from './common/Footer'
import history from '../history'
import Snackbar from './common/Snackbar';
import UserStore from '../store/UserStore';

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

  useEffect(() => {
    UserStore.check()
  }, [])

  const routes = RouterStore.routes
  const routes2 = RouterStore.routes

  return (
    <HistoryRouter history={history}>
      <header style={header}>
        <Header />
      </header>
      <section style={section}>
        <Routes>
          {routes.map(route => {
            return <Route key={route.path} path={route.path} element={<route.Component />}></Route>
          })}
        </Routes>
      </section>
      <footer style={footer}>
        <Footer />
      </footer>
      <Snackbar />
    </HistoryRouter>
  );
}

export default observer(App);
