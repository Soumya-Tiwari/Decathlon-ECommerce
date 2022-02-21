import { useRoutes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { createTheme, CssBaseline, ThemeProvider } from '@material-ui/core';
import SplashScreen from './components/SplashScreen';
import useAuth from './hooks/useAuth';
import useScrollReset from './hooks/useScrollReset';

import routes from './routes';

const App = () => {
  const content = useRoutes(routes);
  const auth = useAuth();

  useScrollReset();

  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Toaster position="top-left" />
      {auth.isInitialized ? content : <SplashScreen />}
    </ThemeProvider>
  );
};

export default App;
