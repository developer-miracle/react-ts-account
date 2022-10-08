import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import { Provider } from 'mobx-react'
import routerStore from './store/RouterStore'
import userStore from './store/UserStore'


const stores = {
  routerStore,
  userStore
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>

    <Provider {...stores}>
      <App />
    </Provider>


  </React.StrictMode>
);


