import { createBrowserRouter, defer, LoaderFunctionArgs, RouterProvider } from 'react-router-dom';
import Projects from './pages/projects';
import './App.css'
import { RootError } from './components/RootError';
import { useProjectContext } from './context/ProjectContext';
import Register from './pages/register';
import Project from './pages/projects/project';

function App() {
  const { apiClient } = useProjectContext();
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Projects />,
      errorElement: <RootError />,
      // loader: () => {
      //   if (!userIsAuthenticated) {
      //     throw new Error(USER_NOT_LOGGED_IN);
      //   }
      //   return null;
    },
    {
      path: 'register',
      element: <Register />,
      loader: () => {
        return defer({ users: apiClient.getUsers() });
      }
    },
    {
      path: 'projects',
      element: <Projects />,
      loader: () => {
        return defer({ projects: apiClient.getProjects() });
      },
      children: [
        {
          path: ':id',
          element: <Project />,
          loader: (args: LoaderFunctionArgs) => {
            const id = args.params.id;
            return defer({ project: apiClient.getProject(id ? Number(id) : 0) });
          }
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
