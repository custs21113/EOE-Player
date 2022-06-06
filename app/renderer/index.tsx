import React, { Fragment } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./index.module.less";
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './states/store';
export default function Index(props: {}) {

  return (
    <Provider store={store as any}>
      <BrowserRouter>
        <App />
      </BrowserRouter>

    </Provider>
  )
}

ReactDOM.createRoot(document.getElementById("root") as any).render(<Index />);