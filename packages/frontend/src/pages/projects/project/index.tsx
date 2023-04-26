import { Suspense } from 'react';
import { useLoaderData, Await, useParams, Outlet, useLocation } from 'react-router-dom';
import { Project, Ticket } from '../../../../lib/types';
import { ProjectPage } from '../../../components/ProjectPage';

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