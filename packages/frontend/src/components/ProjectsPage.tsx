import { useState } from 'react';
import { useProjectContext } from '../context/ProjectContext';
import { BaseHeader } from './BaseHeader';
import { ItemCard } from './ItemCard';
import { LoadingPage } from './LoadingPage';
import { v4 } from 'uuid';
import { CreateItemCard } from './CreateItemCard';
import { useNavigate } from 'react-router-dom';
import { Project, ProjectBody } from '../../../proj-api/dist/lib/projectTypes';

interface ProjectsPageProps {
    projects: Project[];
    loading: boolean;
}

export default function ProjectsPage(props: ProjectsPageProps): JSX.Element {
    const [ projectsList, setProjectList ] = useState(props.projects ? props.projects : []);
    const { apiClient: client } = useProjectContext();
    const navigate = useNavigate();

    const createProjectButtonHandler = (projName: string, projDescription: string) => {
        client.createProject({ name: projName, description: projDescription } as ProjectBody).then(() => {
            client.getProjects().then((res) => {
                setProjectList(res);
            })
        })
    }

    const deleteProjectHandler = (projectId: number) => {
        client.deleteProject(projectId).then(() => {
            client.getProjects().then((res) => {
                setProjectList(res)
            })
        })
    }

    const onProjectCardClickHandler = (projectId: number) => {
        //setProject(projectId)
        navigate(`/projects/${projectId}`);
    }

    if (props.loading) return <LoadingPage />
    return (
        <div className="flex flex-col items-center w-screen h-screen">
            <BaseHeader title="Ticket master"></BaseHeader>
            <div className="w-9/12 h-5/6 mt-10">
                <div className=" w-full grid grid-cols-3 gap-y-8 justify-items-center">
                    {projectsList.length > 0 ? 
                    projectsList.map((project) => 
                        <ItemCard 
                            title={project.name}
                            description={project.description}
                            color='red'
                            onClick={() => { onProjectCardClickHandler(project.id) }}
                            onDeleteClick={() => { deleteProjectHandler(project.id) }}
                            key={v4()}></ItemCard>) :
                        null}
                    <CreateItemCard onDialogCreateClick={createProjectButtonHandler} />
                </div>
            </div>
        </div>
    );
}