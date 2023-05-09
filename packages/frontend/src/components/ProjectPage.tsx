import { LoadingPage } from "./LoadingPage";
import { useLocation, useSearchParams, useNavigate } from 'react-router-dom';
import { useProjectContext } from '../context/ProjectContext';
import { UnderlineProjHeader } from "./UnderlineProjHeader";
import { Box, Button, Dialog, IconButton, Typography, DialogTitle, DialogActions, DialogContent, Checkbox } from '@mui/material';
import { ArrowDropDown, North, Sort } from "@mui/icons-material";
import { TicketCard } from "./TicketCard";
import { palette } from '../context/ProjectThemeProvider';
import { useEffect, useState } from 'react';
import { v4 } from 'uuid';
import { CreateTicketDialog } from "./CreateTicketDialog";
import { Project, Ticket, TicketBody } from "../../../lib/projectTypes";
import { toast } from "react-toastify";

interface ProjectPageProps {
    project?: Project;
    loading: boolean;
}

export const ProjectPage = (props: ProjectPageProps): JSX.Element => {
    const [ openFiltersDialog, setOpenFiltersDialog ] = useState(false);
    const [ tickets, setTickets ] = useState<Ticket[]>([]);
    const [ searchParams ] = useSearchParams();
    const navigate = useNavigate();
    const location = useLocation();
    const context = useProjectContext();
    context.setProject(Number(location.pathname.split('/')[2]));

    useEffect(() => {
        context.apiClient.getTickets(context.getProject(), `?status=${getPageSortParams(searchParams).ticketsStatus}`).then((res) => {
            setTickets(res);
        });
    }, [searchParams]);

    const createTicketHandler = (ticketName: string, ticketDescription: string) => {
        if (!ticketName || ticketName === '') { toast.error('Ticket name cannot be empty'); return; }
        const ticket: TicketBody = { 
            project_id: context.getProject(),
            description: ticketDescription,
            name: ticketName
        }
        context.apiClient.createTicket(ticket).then(() => {
            context.apiClient.getTickets(context.getProject()).then((res) => {
                setTickets(res);
            })
        })
    }

    if (props.loading || !props.project) return <LoadingPage />
    return (
        <div className="flex flex-col items-center h-screen">
            <UnderlineProjHeader title={props.project.name}></UnderlineProjHeader>
            <div className="flex flex-col h-[86%] w-[70%] mt-[2%]">
                <div className="flex flex-row items-center h-[7%]">
                    <IconButton color="primary" onClick={() => { setOpenFiltersDialog(true) }}><Sort /></IconButton>
                    <CreateTicketDialog onCreateButtonClick={createTicketHandler}></CreateTicketDialog>
                </div>
                <Box className={`flex flex-col max-h-[93%] rounded-lg overflow-hidden`}>
                    <Box className="flex flex-row items-center px-4 h-[40px] justify-between" sx={{ backgroundColor: palette.secondary.light }}>
                        <div className="flex flex-row">
                            <StatusSortButton button='Open'></StatusSortButton>
                            <div className="pl-3">
                                <StatusSortButton button='Closed'></StatusSortButton>
                            </div>
                        </div>
                        <div onClick={() => { navigate('') }}>

                        </div>
                        <Typography>date<ArrowDropDown /></Typography>
                    </Box>
                    {tickets && tickets.map((ticket) => <TicketCard ticket={ticket} key={v4()}></TicketCard>)}
                    
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

function StatusSortButton(props: { button: 'Open' | 'Closed' }): JSX.Element {
    const [ searchParams ] = useSearchParams();
    const navigate = useNavigate();

    return (
        <div onClick={() => { navigate('?status=' + props.button) }}>
            <Box sx={{
                    color: getPageSortParams(searchParams).ticketsStatus === props.button ? '' : palette.text.secondary,
                    cursor: 'pointer'
                }}>
                <Typography>{props.button}</Typography>
            </Box>
        </div>
    )
}

function getPageSortParams(params: URLSearchParams): { ticketsStatus: string } {
    const ticketsStatus = params.get('status') === 'Closed' ? 'Closed' : 'Open';

    return {
        ticketsStatus: ticketsStatus
    }
}