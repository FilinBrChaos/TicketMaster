import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useProjectContext } from './context/projectContext';
import Projects from './pages/projects';
import RootError from './components/rootError';
import Project from './pages/projects/project';

function App() {
  const { userIsAuthenticated } = useProjectContext();
  const router = createBrowserRouter([
    {
      path: '/*',
      element: <Projects />,
      errorElement: <RootError />,
      loader: () => {
        if (userIsAuthenticated) {
          throw new Error('not logged in');
        }
        return null;
      },
      children: [
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
