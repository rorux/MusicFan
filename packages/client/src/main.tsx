import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import './resources/i18n';
import App from './App';
import { store } from '@store';
import './index.scss';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <App />
  </Provider>,
);
