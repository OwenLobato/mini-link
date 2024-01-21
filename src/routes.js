import { Login, Register, Dashboard } from './components/modules';
import { NotFoundPage } from './components/globals';

export const PublicAppRoutes = [
  { path: '/*', component: <NotFoundPage /> },
  { path: '/', component: <Login /> },
  { path: '/register', component: <Register /> },
];

export const AppRoutes = [{ path: '/dashboard', component: <Dashboard /> }];
