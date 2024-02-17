import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { PrivateRoute, NavBar } from './components/globals';
import { PublicAppRoutes, AppRoutes } from './routes';

const PublicLayout = ({ children }) => {
  return (
    <div className='flex flex-col items-center min-h-screen'>{children}</div>
  );
};

const AppLayout = ({ children }) => {
  return (
    <>
      <NavBar />
      <div className='flex flex-col items-center min-h-screen'>
        <div className='flex justify-center w-11/12 min-h-screen pb-5 pt-16'>
          {children}
        </div>
      </div>
    </>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        {/* PUBLIC ROUTES*/}
        {PublicAppRoutes.map(({ path, component }, index) => (
          <Route
            key={index}
            path={path}
            element={<PublicLayout>{component}</PublicLayout>}
          />
        ))}
        {/* PRIVATE ROUTES */}
        {AppRoutes.map(({ path, component }, index) => (
          <Route
            key={index}
            path={path}
            element={
              <AppLayout>
                <PrivateRoute>{component}</PrivateRoute>
              </AppLayout>
            }
          />
        ))}
      </Routes>
    </Router>
  );
};

export default App;
