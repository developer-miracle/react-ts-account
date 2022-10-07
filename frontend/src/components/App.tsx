import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { observer } from 'mobx-react'
import RouterStore from '../store/RouterStore';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom'
import Header from './common/Header'
import Footer from './common/Footer'
import history from '../history'
import { Alert, Slide, SlideProps, Snackbar } from '@mui/material';
import CommonStore from '../store/CommonStore';

type TransitionProps = Omit<SlideProps, 'direction'>;

function TransitionUp(props: TransitionProps) {
  return <Slide {...props} direction="up" />;
}

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

  const [open, setOpen] = React.useState(false);

  const [transition, setTransition] = React.useState<
    React.ComponentType<TransitionProps> | undefined
  >(undefined);

  const handleClick = (Transition: React.ComponentType<TransitionProps>) => () => {
    setTransition(() => TransitionUp);
    setOpen(true);
  };

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
    CommonStore.resetSnackBar()
  };

  const routes = RouterStore.routes
  const successMessage = CommonStore.successMessage
  const flagShowSuccessMessage = CommonStore.flagShowSuccessMessage

  useEffect(() => {
    setTransition(() => TransitionUp);
    setOpen(CommonStore.flagShowSuccessMessage);
  }, [CommonStore.flagShowSuccessMessage])

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
      <button onClick={handleClick(TransitionUp)}>click</button>
      <footer style={footer}>
        <Footer />
      </footer>
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose} anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
        TransitionComponent={transition}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          {successMessage}
        </Alert>
      </Snackbar>
    </HistoryRouter>
  );
}

export default observer(App);
