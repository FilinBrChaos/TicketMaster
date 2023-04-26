import { Suspense } from 'react';
import { useLoaderData, Await, useLocation, Outlet } from 'react-router-dom';
import ProjectsPage from '../../components/ProjectsPage';
import { Project } from '../../../../proj-api/dist/lib/projectTypes';

export default function Projects(): JSX.Element {
    const projectsPromise = useLoaderData() as { projects: Project[] };
    const { pathname } = useLocation();

    return (
        <div>
            {pathname === '/projects' ?
                <Suspense fallback={<ProjectsPage projects={[]} loading></ProjectsPage>}>
                    <Await resolve={projectsPromise.projects}>
                        {(projects) => {
                            return <ProjectsPage projects={projects} loading={false} ></ProjectsPage>
                        }}
                    </Await>
                </Suspense>
                :
                <Outlet />
            }
        </div>
    )
}