import { useLoaderData, useParams, Outlet, useLocation } from 'react-router-dom';
import { ProjectPage } from '../../../components/ProjectPage';
import { Project, Ticket } from '../../../../../proj-api/dist/lib/projectTypes';

export default function ProjectLoader(): JSX.Element {
    const projectsPromise = useLoaderData() as { project: Project, tickets: Ticket[] };
    const { pathname } = useLocation();
    const { id } = useParams();

    return (
        <div>
            {pathname === '/projects/' + id ?
                // <Suspense fallback={<ProjectPage loading></ProjectPage>}>
                    // <Await resolve={projectsPromise}>
                        // {(result) => {
                            <ProjectPage project={projectsPromise.project} tickets={projectsPromise.tickets} loading={false} ></ProjectPage>
                        // }}
                    // </Await>
                // </Suspense>
                :
                <Outlet />
            }
        </div>
    )
}