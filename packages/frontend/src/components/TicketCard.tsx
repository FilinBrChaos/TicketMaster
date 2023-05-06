import { Box, Typography } from "@mui/material"
import { palette } from '../context/ProjectThemeProvider';
import { Link, useParams } from 'react-router-dom';
import { Ticket } from '../../../proj-api/dist/lib/projectTypes';
import { Adjust, CheckCircleOutline } from "@mui/icons-material";

interface TicketCardProps {
    ticket: Ticket;
}

export const TicketCard = ({ ticket }: TicketCardProps): JSX.Element => {
    const { id } = useParams();
    const ticketDate = new Date(ticket.created_at.replace(' ', 'T'));

    return (
        <Box className={`flex flex-row justify-between w-full px-3 py-3 hover:bg-zinc-900`} sx={{ backgroundColor: palette.secondary.main }}>
            <div className="flex flex-row items-center">
                <div className="mr-3">
                    { ticket.state && ticket.state.toString() === 'Closed' ? 
                        <div>
                            <CheckCircleOutline sx={{ color: 'rgb(141, 103, 217)' }} />
                        </div>
                        :
                        <div>
                            <Adjust color='success' />
                        </div>
                    }
                </div>
                <div>
                    <Link to={`/projects/${id}/ticket/${ticket.id}`}>
                        <Typography variant="h6">
                            {ticket.name}
                        </Typography>
                    </Link>
                    <Typography className=" max-w-[250px] truncate">{ticket.description}</Typography>
                </div>
            </div>

            <Typography>{ticketDate.toLocaleDateString()}</Typography>
        </Box>
    )
}