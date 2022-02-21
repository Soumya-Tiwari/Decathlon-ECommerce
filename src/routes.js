import { Suspense, lazy } from 'react';
import AuthGuard from './components/AuthGuard';
import DashboardLayout from './components/dashboard/DashboardLayout';
import GuestGuard from './components/GuestGuard';
import LoadingScreen from './components/LoadingScreen';

const Loadable = (Component) => (props) => (
  <Suspense fallback={<LoadingScreen />}>
    <Component {...props} />
  </Suspense>
);

// Authentication pages

const Login = Loadable(lazy(() => import('./pages/authentication/Login')));

// Account
const Account = Loadable(lazy(() => import('./pages/dashboard/Account')));

// Dashboard pages
const ProductListingPage = Loadable(lazy(() => import('./pages/dashboard/ProductListingPage')));

// Error pages
const AuthorizationRequired = Loadable(lazy(() => import('./pages/AuthorizationRequired')));
const NotFound = Loadable(lazy(() => import('./pages/NotFound')));

// Checkout pages
const Checkout = Loadable(lazy(() => import('./pages/checkout')));

const routes = [
  {
    path: 'authentication',
    children: [
      {
        path: 'login',
        element: (
          <GuestGuard>
            <Login />
          </GuestGuard>
        )
      },
      {
        path: 'login-unguarded',
        element: <Login />
      }
    ]
  },
  {
    path: 'dashboard',
    element: (
      <AuthGuard>
        <DashboardLayout />
      </AuthGuard>
    ),
    children: [
      {
        path: '/dashboard',
        children: [
          {
            path: '/dashboard/products',
            element: <ProductListingPage />
          },
        ]
      },
      {
        path: 'account',
        element: <Account />
      }
    ]
  },
  {
    path: '/',
    element: (
      <AuthGuard>
        <DashboardLayout />
      </AuthGuard>
    ),
    children: [
      {
        path: '/',
        element: <ProductListingPage />
      },
      {
        path: 'checkout',
        element: <Checkout />
      },
      {
        path: '401',
        element: <AuthorizationRequired />
      },
      {
        path: '404',
        element: <NotFound />
      },
      {
        path: '*',
        element: <NotFound />
      }
    ]
  }
];

export default routes;
