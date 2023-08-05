import store from '@/Store';
import React from 'react'
import { Provider } from 'react-redux'
import App from '../_app'

const main = () => {
  return (
    <div>
      <Provider store={store}>
        <App />
      </Provider>
    </div>
  );
}

export default main