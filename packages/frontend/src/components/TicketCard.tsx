import { Box, Typography } from "@mui/material"
import { palette } from '../context/ProjectThemeProvider';
import { Link, useParams } from 'react-router-dom';
import { Ticket } from '../../../proj-api/dist/lib/projectTypes';

interface TicketCardProps {
    ticket: Ticket;
}

export const TicketCard = ({ ticket }: TicketCardProps): JSX.Element => {
    const { id } = useParams();
    const ticketDate = new Date(ticket.created_at.replace(' ', 'T'));

    return (
        <Box className="flex flex-row justify-between w-full h-16 border" sx={{ backgroundColor: palette.secondary.main }}>
            <div>
                <Link to={`/projects/${id}/ticket/${ticket.id}`}>{ticket.name}</Link>
                <Typography>Ticket short description</Typography>
            </div>

            <Typography>{ticketDate.toLocaleDateString()}</Typography>
        </Box>
    )
}