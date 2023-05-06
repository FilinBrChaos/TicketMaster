import { useLoaderData, useParams, Outlet, useLocation, Await } from 'react-router-dom';
import { ProjectPage } from '../../../components/ProjectPage';
import { Project, Ticket } from '../../../../../proj-api/dist/lib/projectTypes';
import { Suspense } from 'react';

export default function ProjectLoader(): JSX.Element {
    const projectsPromise = useLoaderData() as { project: Project };
    const { pathname } = useLocation();
    const { id } = useParams();

    return (
        <div>
            {pathname === '/projects/' + id ?
                <Suspense fallback={<ProjectPage loading></ProjectPage>}>
                    <Await resolve={projectsPromise.project}>
                        {(proj) => {
                            return <ProjectPage project={proj} loading={false} ></ProjectPage>
                        }}
                    </Await>
                </Suspense>
                :
                <Outlet />
            }
        </div>
    )
}