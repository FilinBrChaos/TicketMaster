import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Projects from './pages/projects';
import './App.css'
import Project from './pages/projects/project';
import Register from './pages/register';
import { RootError } from './components/RootError';
import { useProjectContext } from './context/ProjectContext';

function App() {
  const { userIsAuthenticated } = useProjectContext();
  const router = createBrowserRouter([
    {
      path: '/*',
      //element: <Projects />,
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
