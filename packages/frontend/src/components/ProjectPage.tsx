import { LoadingPage } from "./LoadingPage";
import { useLocation, useSearchParams, useNavigate } from 'react-router-dom';
import { useProjectContext } from '../context/ProjectContext';
import { UnderlineProjHeader } from "./UnderlineProjHeader";
import { Box, Button, Dialog, IconButton, Typography, DialogTitle, DialogActions, DialogContent, Checkbox, TextField } from '@mui/material';
import { ArrowDropDown, ArrowDropUp, North, Search, Sort } from "@mui/icons-material";
import { TicketCard } from "./TicketCard";
import { palette } from '../context/ProjectThemeProvider';
import { useEffect, useState } from 'react';
import { v4 } from 'uuid';
import { CreateTicketDialog } from "./CreateTicketDialog";
import { Project, Ticket, TicketBody } from "../../../lib/projectTypes";
import { toast } from "react-toastify";

interface TicketPageSearchParams {
    byStatus: 'Open' | 'Closed';
    byDate: 'ASC' | 'DESC';
    byPattern?: string;
}

const searchParamsKeys = {
    byStatusKey: 'byStatus',
    byDateKey: 'byDate',
    byPatternKey: 'byPattern'
}

interface ProjectPageProps {
    project?: Project;
    loading: boolean;
}

export const ProjectPage = (props: ProjectPageProps): JSX.Element => {
    const [ tickets, setTickets ] = useState<Ticket[]>([]);
    const [ searchParams ] = useSearchParams();
    const [ searchText, setSearchText ] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const context = useProjectContext();
    context.setProject(Number(location.pathname.split('/')[2]));

    useEffect(() => {
        context.apiClient.getTickets(context.getProject(), createParamsSequence(getPageSortParams(searchParams))).then((res) => {
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
            context.apiClient.getTickets(context.getProject(), createParamsSequence(getPageSortParams(searchParams))).then((res) => {
                setTickets(res);
            })
        })
    }

    const textSearchButtonHandler = () => {
        let currentParams = getPageSortParams(searchParams);
        currentParams.byPattern = searchText;
        setSearchText('');
        navigate(createParamsSequence(currentParams))
    }

    if (props.loading || !props.project) return <LoadingPage />
    return (
        <div className="flex flex-col items-center h-screen">
            <UnderlineProjHeader title={props.project.name}></UnderlineProjHeader>
            <div className="flex flex-col h-[86%] w-[70%] mt-[2%]">
                <div className="flex w-full flex-row items-center justify-between h-[7%] mb-3">
                    <div className="flex flex-row items-center">
                        <TextField variant="standard" label="search" sx={{ h: 10 }} onChange={(e) => { setSearchText(e.target.value) }} />
                        <Button onClick={textSearchButtonHandler}>search<Search /></Button>
                    </div>
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
                        <SortByDateButton></SortByDateButton>
                    </Box>
                    {tickets && tickets.map((ticket) => <TicketCard ticket={ticket} key={v4()}></TicketCard>)}
                    
                </Box>
            </div>
        </div>
    )
}

function StatusSortButton(props: { button: 'Open' | 'Closed' }): JSX.Element {
    const [ searchParams ] = useSearchParams();
    const navigate = useNavigate();

    return (
        <div onClick={() => { 
                let currentParams = getPageSortParams(searchParams);
                currentParams.byStatus = props.button;
                navigate(createParamsSequence(currentParams)) 
            }}>
            <Box sx={{
                    color: getPageSortParams(searchParams).byStatus === props.button ? '' : palette.text.secondary,
                    cursor: 'pointer'
                }}>
                <Typography>{props.button}</Typography>
            </Box>
        </div>
    )
}

function SortByDateButton(): JSX.Element {
    const [ searchParams ] = useSearchParams();
    const navigate = useNavigate();

    return (
        <div>
            {getPageSortParams(searchParams).byDate === 'ASC' ?
                <div className="cursor-pointer" 
                    onClick={() => {
                        let currentParams = getPageSortParams(searchParams);
                        currentParams.byDate = 'DESC'
                        navigate(createParamsSequence(currentParams));
                }}>date<ArrowDropUp /></div>
                :
                <div className="cursor-pointer"
                    onClick={() => {
                        let currentParams = getPageSortParams(searchParams);
                        currentParams.byDate = 'ASC'
                        navigate(createParamsSequence(currentParams));
                    }}>date<ArrowDropDown /></div>
            }
        </div>
    )
}

function getPageSortParams(params: URLSearchParams): TicketPageSearchParams {
    const ticketsStatus = params.get(searchParamsKeys.byStatusKey) === 'Closed' ? 'Closed' : 'Open';
    const byDate = params.get(searchParamsKeys.byDateKey) === 'DESC' ? 'DESC' : 'ASC';
    const pattern = params.get(searchParamsKeys.byPatternKey);
    const findPattern = pattern && pattern !== '' ? pattern : undefined;

    return {
        byStatus: ticketsStatus,
        byDate: byDate,
        byPattern: findPattern
    }
}

function createParamsSequence(newParams: TicketPageSearchParams): string {
    let params = `?${searchParamsKeys.byStatusKey}=${newParams.byStatus}&${searchParamsKeys.byDateKey}=${newParams.byDate}`
    if (newParams.byPattern) { 
        params += `&${searchParamsKeys.byPatternKey}=${encodeURI(newParams.byPattern)}`
        console.log(encodeURI(newParams.byPattern));
    }
    return params;
}