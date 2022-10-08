import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { observer } from 'mobx-react'
import RouterStore from '../store/RouterStore';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom'
import Header from './common/Header'
import Footer from './common/Footer'
import history from '../history'
import { Alert, AlertColor, Slide, SlideProps, Snackbar } from '@mui/material';
import CommonStore from '../store/CommonStore';

type TransitionProps = Omit<SlideProps, 'direction'>;

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

function TransitionUp(props: TransitionProps) {
  return <Slide {...props} direction="up" />;
}

function App() {

  const [open, setOpen] = React.useState(false);

  const [transition, setTransition] = React.useState<
    React.ComponentType<TransitionProps> | undefined
  >(undefined);

  // const handleClick = (Transition: React.ComponentType<TransitionProps>) => () => {
  //   setTransition(() => TransitionUp);
  //   setOpen(true);
  // };

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    console.log('handleClose')
    CommonStore.resetSnackBar()
    setOpen(CommonStore.flagShowMessage);
  };

  const routes = RouterStore.routes

  const type: AlertColor | undefined = CommonStore.type as AlertColor
  const message = CommonStore.message

  useEffect(() => {
    // if (CommonStore.flagShowMessage) {
    setTransition(() => TransitionUp);
    setOpen(CommonStore.flagShowMessage);
    // }
    console.log('useEffect')
    console.log(CommonStore.flagShowMessage)

  }, [CommonStore.flagShowMessage])

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
      {/* <button onClick={handleClick(TransitionUp)}>click</button> */}
      <footer style={footer}>
        <Footer />
      </footer>
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose} anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
        TransitionComponent={transition}
      >
        <Alert onClose={handleClose} severity={type} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </HistoryRouter>
  );
}

export default observer(App);
