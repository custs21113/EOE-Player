import React, { Fragment } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./index.module.less";
import 'antd/dist/antd.css';
import { BrowserRouter, Router, HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '@/states/store.ts';
export default function Index(props: {}) {

  return (
    <Provider store={store as any}>

      {
        process.env.NODE_ENV === "development" ?
          <BrowserRouter basename='/'>
            <App />
          </BrowserRouter> :
          <HashRouter basename='/'>
            <App />
          </HashRouter>
      }
    </Provider>
  )
}

ReactDOM.createRoot(document.getElementById("root") as any).render(<Index />);