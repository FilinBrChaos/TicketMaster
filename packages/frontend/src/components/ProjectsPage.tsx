import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { useState } from 'react';
import { useProjectContext } from '../context/ProjectContext';
import { Header } from './Header';
import { ProjectCard } from './ProjectCard';
import { Project } from '../../lib/types';
import { LoadingPage } from './LoadingPage';
import { v4 } from 'uuid';

interface ProjectsPageProps {
    projects: Project[];
    loading: boolean;
}

export default function ProjectsPage(props: ProjectsPageProps): JSX.Element {
    const context = useProjectContext();
    const [ openCreateProjectDialog, setOpenCreateProjectDialog ] = useState(false);

    console.log('logged ' + context.userIsAuthenticated + " user id " + context.userId);

    const createProjectButtonHandler = () => {
        
    }

    if (props.loading) return <LoadingPage />
    return (
        <div className="flex flex-col items-center w-screen h-screen">
            <Header title="Ticket master"></Header>
            <div className="w-9/12 h-5/6 mt-10">
                <div className=" w-full grid grid-cols-3 gap-y-8 justify-items-center">
                    {props.projects.length > 0 ? props.projects.map((project) => <ProjectCard title={project.name} key={v4()}></ProjectCard>) : null}
                    <ProjectCard createCard onClick={() => { setOpenCreateProjectDialog(true) }} ></ProjectCard>
                </div>

            </div>
            <Dialog open={openCreateProjectDialog} maxWidth='sm' fullWidth>
                <DialogTitle>Create project</DialogTitle>
                <DialogContent sx={{ display: 'flex', flexDirection: 'column' }}>
                    <TextField label='Name' sx={{ mt: 2 }} />
                    <TextField label='Description' sx={{ mt: 2 }} multiline minRows={2} />
                </DialogContent>
                <DialogActions>
                    <Button>Create</Button>
                    <Button onClick={() => { setOpenCreateProjectDialog(false) }}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}