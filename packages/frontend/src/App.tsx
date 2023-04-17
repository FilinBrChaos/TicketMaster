import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Projects from './pages/projects';
import './App.css'
import Project from './pages/projects/project';
import { RootError } from './components/RootError';
import { useProjectContext } from './context/ProjectContext';
import { USER_NOT_LOGGED_IN } from './lib/errors';
import Register from './pages/register';

function App() {
  const { userIsAuthenticated } = useProjectContext();
  const router = createBrowserRouter([
    {
      path: '/*',
      element: <Projects />,
      errorElement: <RootError />,
      loader: () => {
        if (!userIsAuthenticated) {
          throw new Error(USER_NOT_LOGGED_IN);
        }
        return null;
      },
      children: [
        {
          path: 'register',
          element: <Register />
        },
        {
          path: 'project',
          element: <Project />
        }
      ]
    }
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
