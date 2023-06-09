import { createBrowserRouter, defer, LoaderFunctionArgs, Navigate, RouterProvider } from 'react-router-dom';
import Projects from './pages/projects';
import './App.css'
import { RootError } from './components/RootError';
import { useProjectContext } from './context/ProjectContext';
import Register from './pages/register';
import Labels from './pages/projects/project/labels';
import { TicketLoader } from './pages/projects/project/ticket';
import ProjectLoader from './pages/projects/project/index';
import { Slide, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RetrosLoader } from './pages/projects/project/retros/index';
import { RetroPage } from './components/RetroPage';
import { TopicLoader } from './pages/projects/project/retro/topic/topic';
import { RetroLoader } from './pages/projects/project/retro/index';

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
            return defer({ project: apiClient.getProject(Number(id)) })
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
              loader: async (args: LoaderFunctionArgs) => {
                const ticketId = Number(args.params.ticketId);
                if (!ticketId) throw Error('ticketId is not present in params')
                const response = Promise.all([
                  apiClient.getTicket(ticketId).then((res) => res),
                  apiClient.getUsers().then((res) => res),
                  apiClient.getLabels(getProject()).then((res) => res)
                ]);
                const [ ticket, assignedUsers, labels ] = await response;
                return defer({ ticket, assignedUsers, labels });
              }
            },
            {
              path: 'retros',
              element: <RetrosLoader />,
              loader: async (args: LoaderFunctionArgs) => {
                return defer({ retros: apiClient.getRetros(getProject()) });
              }
            },
            {
              path: 'retros/:retroId',
              element: <RetroLoader />,
              loader: async (args: LoaderFunctionArgs) => {
                const retroId = Number(args.params.retroId);
                if (!retroId) throw Error('retroId is not present in params')
                return defer({ retro: apiClient.getRetro(retroId), 
                  notes: apiClient.getNotes(retroId), 
                  topics: apiClient.getTopics(retroId) 
                });
              },
              children: [
                {
                  path: 'topics/:topicId',
                  element: <TopicLoader />,
                  loader: async (args: LoaderFunctionArgs) => {
                    if (!args.params.topicId) throw Error('topicId is not present in params');
                    return defer({ topic: apiClient.getTopic(Number(args.params.topicId)) });
                  }
                }
              ]
            }
          ]
        },
      ]
    }
  ]);
  return (
    <>
      <ToastContainer
        position="top-right"
        transition={Slide}
        autoClose={3000}
        hideProgressBar
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
