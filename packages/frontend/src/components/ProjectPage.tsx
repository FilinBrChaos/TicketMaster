import { Project, TicketBody, Ticket } from '../../lib/types';
import { LoadingPage } from "./LoadingPage";
import { useLocation } from 'react-router-dom';
import { useProjectContext } from '../context/ProjectContext';
import { UnderlineProjHeader } from "./UnderlineProjHeader";
import { Box, Button, Dialog, IconButton, Typography, DialogTitle, DialogActions, DialogContent, Checkbox } from '@mui/material';
import { Sort } from "@mui/icons-material";
import { TicketCard } from "./TicketCard";
import { palette } from '../context/ProjectThemeProvider';
import { useState } from 'react';
import { v4 } from 'uuid';

interface ProjectPageProps {
    project?: Project;
    tickets?: Ticket[];
    loading: boolean;
}

export const ProjectPage = (props: ProjectPageProps): JSX.Element => {
    const [ openFiltersDialog, setOpenFiltersDialog ] = useState(false);
    const [ tickets, setTickets ] = useState(props.tickets);
    const location = useLocation();
    const context = useProjectContext();
    context.setProject(Number(location.pathname.split('/')[2]));

    // useEffect(() => {
    //     context.apiClient.getTicket(0);
    // }, []);

    const createTicketHandler = () => {
        const ticket: TicketBody = { 
            project_id: context.getProject(),
            name: 'name'
        }
        context.apiClient.createTicket(ticket).then(() => {
            context.apiClient.getTickets(context.getProject()).then((res) => {
                setTickets(res)
            })
        })
    }

    if (props.loading || !props.project) return <LoadingPage />
    return (
        <div className="flex flex-col items-center h-screen">
            <UnderlineProjHeader title={props.project.name}></UnderlineProjHeader>
            <div className="flex flex-col h-[86%] w-[70%] mt-[2%]">
                <div className=" h-[7%]">
                    <IconButton color="primary" onClick={() => { setOpenFiltersDialog(true) }}><Sort /></IconButton>
                    <Button onClick={createTicketHandler}>create</Button>
                </div>
                <Box className="flex flex-col h-[93%] rounded-lg">
                    <Box className="flex flex-row items-center border-b pl-4 h-[5%] rounded-t-lg" sx={{ backgroundColor: palette.secondary.main }}>
                        <Typography>Opened</Typography>
                        <Typography sx={{ pl: 3 }}>Closed</Typography>

                    </Box>
                    {tickets && tickets.map((ticket) => <TicketCard title={ticket.name} date={ticket.created_at} key={v4()}></TicketCard>)}
                    
                </Box>
            </div>

            <Dialog open={openFiltersDialog}>
                <DialogTitle>Filters</DialogTitle>
                <DialogContent>
                    <Checkbox  />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { setOpenFiltersDialog(false) }}>ok</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}