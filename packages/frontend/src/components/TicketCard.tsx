import { Box, Typography } from "@mui/material"
import { palette } from '../context/ProjectThemeProvider';

export const TicketCard = (): JSX.Element => {
    return (
        <Box className="flex flex-row w-full h-16 border" sx={{ backgroundColor: palette.secondary.main }}>
            <div>
                <Typography>Ticket name</Typography>
                <Typography>Ticket short description</Typography>

            </div>

            <Box sx={{ borderRadius: 100, width: 40, height: 40, backgroundColor: 'white' }}></Box>
        </Box>
    )
}