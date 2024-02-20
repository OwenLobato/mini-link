import {
  Login,
  Register,
  Dashboard,
  Profile,
  SaveLink,
} from './components/modules';
import { NotFoundPage } from './components/globals';

export const PublicAppRoutes = [
  { path: '/*', component: <NotFoundPage /> },
  { path: '/', component: <Login /> },
  { path: '/register', component: <Register /> },
];

export const AppRoutes = [
  { path: '/dashboard', component: <Dashboard /> },
  { path: '/profile', component: <Profile /> },
  { path: '/link', component: <SaveLink /> },
  { path: '/link/:id', component: <SaveLink isEditMode /> },
];
