import {
  Login,
  Register,
  Dashboard,
  Profile,
  SaveLink,
} from './components/modules';
import { NotFoundPage, LinkRedirect } from './components/globals';

export const PublicAppRoutes = [
  { path: '/*', component: <NotFoundPage /> },
  { path: '/', component: <Login /> },
  { path: '/register', component: <Register /> },
  { path: '/s/:urlCode', component: <LinkRedirect /> },
];

export const AppRoutes = [
  { path: '/dashboard', component: <Dashboard /> },
  { path: '/profile', component: <Profile /> },
  { path: '/link', component: <SaveLink /> },
  { path: '/link/:id', component: <SaveLink isEditMode /> },
];
