import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { PrivateRoute, NavBar } from './components/globals';
import { PublicAppRoutes, AppRoutes } from './routes';

const App = () => {
  return (
    <Router>
      <NavBar />
      <div className='flex flex-col items-center min-h-screen'>
        <div className='flex justify-center w-11/12 min-h-screen pb-5 pt-16'>
          <Routes>
            {/* PUBLIC ROUTES*/}
            {PublicAppRoutes.map(({ path, component }, index) => (
              <Route key={index} path={path} element={component} />
            ))}
            {/* PRIVATE ROUTES */}
            {AppRoutes.map(({ path, component }, index) => (
              <Route
                key={index}
                path={path}
                element={<PrivateRoute>{component}</PrivateRoute>}
              />
            ))}
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
