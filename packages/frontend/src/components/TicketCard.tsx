import { Box, Typography } from "@mui/material"
import { palette } from '../context/ProjectThemeProvider';
import { Link, useParams } from 'react-router-dom';

interface TicketCardProps {
    title: string;
    description?: string;
    userColor?: string;
    date?: string
}

export const TicketCard = (props: TicketCardProps): JSX.Element => {
    const { id } = useParams();

    return (
        <Box className="flex flex-row w-full h-16 border" sx={{ backgroundColor: palette.secondary.main }}>
            <div>
                <Link to={`/projects/${id}/ticket/1`}>{props.title}</Link>
                <Typography>Ticket short description</Typography>
            </div>

            <Box sx={{ borderRadius: 100, width: 40, height: 40, backgroundColor: props.userColor }}></Box>
            <Typography>{props.date}</Typography>
        </Box>
    )
}