import { Suspense } from 'react';
import { Project } from '../../../lib/types';
import { useLoaderData, Await } from 'react-router-dom';
import ProjectsPage from '../../components/ProjectsPage';

export default function Projects(): JSX.Element {
    const projectsPromise = useLoaderData() as { projects: Project[] };

    return (
        <Suspense fallback={<ProjectsPage projects={[]} loading></ProjectsPage>}>
            <Await resolve={projectsPromise.projects}>
                {(projects) => {
                    return <ProjectsPage projects={projects} loading={false} ></ProjectsPage>
                }}
            </Await>
        </Suspense>
    )
}