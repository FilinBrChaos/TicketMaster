import { createBrowserRouter, defer, LoaderFunctionArgs, Navigate, RouterProvider } from 'react-router-dom';
import Projects from './pages/projects';
import './App.css'
import { RootError } from './components/RootError';
import { useProjectContext } from './context/ProjectContext';
import Register from './pages/register';
import Labels from './pages/projects/project/labels';
import { TicketLoader } from './pages/projects/project/ticket';
import ProjectLoader from './pages/projects/project/index';

function App() {
  const { apiClient, getProject } = useProjectContext();
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Navigate to="/projects"></Navigate>,
      errorElement: <RootError />,
      // loader: () => {
      //   return defer({ projects: apiClient.getProjects() });
      // }
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
          element: <ProjectLoader />,
          loader: async (args: LoaderFunctionArgs) => {
            const id = args.params.id;
            if (!id) throw Error('project id is not present in path parameters');
            const response = Promise.all([
              apiClient.getProject(id ? Number(id) : 0).then((res) => res),
              apiClient.getTickets(id ? Number(id) : 0).then((res) => res)
            ])
            const [project, tickets] = await response;
            return defer({ project, tickets });
          },
          children: [
            {
              path: 'labels',
              element: <Labels />,
              loader: (args: LoaderFunctionArgs) => {
                const id = Number(args.params.id);
                if (!id) return Error('project id is not present in path params');
                return defer({ labels: apiClient.getLabels(Number(id)) });
              }
            },
            {
              path: 'ticket/:ticketId',
              element: <TicketLoader />,
              loader: (args: LoaderFunctionArgs) => {
                const ticketId = Number(args.params.ticketId);
                if (!ticketId) throw Error('ticketId is not present in params')
                return defer({ ticket: apiClient.getTicket(ticketId) });
              }
            }

          ]
        },
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
