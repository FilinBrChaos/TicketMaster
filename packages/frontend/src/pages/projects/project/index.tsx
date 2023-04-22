import { Suspense } from 'react';
import { useLoaderData, Await } from 'react-router-dom';
import { Project } from '../../../../lib/types';
import { ProjectPage } from '../../../components/ProjectPage';

export default function Projects(): JSX.Element {
    const projectsPromise = useLoaderData() as { project: Project };

    return (
        <Suspense fallback={<ProjectPage loading></ProjectPage>}>
            <Await resolve={projectsPromise.project}>
                {(project) => {
                    return <ProjectPage project={project} loading={false} ></ProjectPage>
                }}
            </Await>
        </Suspense>
    )
}