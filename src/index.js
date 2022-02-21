import 'nprogress/nprogress.css';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import StyledEngineProvider from '@material-ui/core/StyledEngineProvider';
import App from './App';
import { AuthProvider } from './contexts/JWTContext';
import store from './store';

ReactDOM.render(
  <StrictMode>
    <ReduxProvider store={store}>
      <StyledEngineProvider injectFirst>
        <BrowserRouter>
          <AuthProvider>
            <App />
          </AuthProvider>
        </BrowserRouter>
      </StyledEngineProvider>
    </ReduxProvider>
  </StrictMode>, document.getElementById('root')
);
