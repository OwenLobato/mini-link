import { Login, Register, Dashboard, Profile } from './components/modules';
import { NotFoundPage } from './components/globals';

export const PublicAppRoutes = [
  { path: '/*', component: <NotFoundPage /> },
  { path: '/', component: <Login /> },
  { path: '/register', component: <Register /> },
];

export const AppRoutes = [
  { path: '/dashboard', component: <Dashboard /> },
  { path: '/profile', component: <Profile /> },
];
