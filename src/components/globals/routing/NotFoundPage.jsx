import { Link } from 'react-router-dom';

export const NotFoundPage = () => {
  return (
    <section>
      <div>
        <div>
          <h1>404 - Page Not Found</h1>
          <p c>Sorry, the page you are looking for does not exist.</p>
          <div>
            <Link to='/'>Return to home</Link>
          </div>
        </div>
      </div>
    </section>
  );
};
