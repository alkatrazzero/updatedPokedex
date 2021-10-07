import 'antd/dist/antd.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import App from './App';
import store from './store/store';

const rerenderEntireTree = (state) => {
  ReactDOM.render(
    <BrowserRouter>
      <React.StrictMode>
        <ReduxProvider store={store}>
          <App state={state} />
        </ReduxProvider>
      </React.StrictMode>
    </BrowserRouter>,
    document.getElementById('root'),
  );
};
rerenderEntireTree(store.getState());
