import { Project } from "../../lib/types";
import { LoadingPage } from "./LoadingPage";
import { useLocation } from 'react-router-dom';
import { useProjectContext } from '../context/ProjectContext';
import { UnderlineProjHeader } from "./UnderlineProjHeader";
import { Box, Button, IconButton, Typography } from '@mui/material';
import { Sort } from "@mui/icons-material";
import { TicketCard } from "./TicketCard";
import { palette } from '../context/ProjectThemeProvider';

interface ProjectPageProps {
    project?: Project;
    loading: boolean;
}

export const ProjectPage = (props: ProjectPageProps): JSX.Element => {
    const location = useLocation();
    const context = useProjectContext();
    context.setProject(Number(location.pathname.split('/')[2]));

    if (props.loading || !props.project) return <LoadingPage />
    return (
        <div className="flex flex-col items-center h-screen">
            <UnderlineProjHeader title="sdlfiv"></UnderlineProjHeader>
            <div className="flex flex-col h-[86%] w-[70%] mt-[2%]">
                <div className=" h-[7%]">
                    <IconButton color="primary"><Sort /></IconButton>

                </div>
                <Box className="flex flex-col h-[93%] rounded-lg">
                    <Box className="flex flex-row items-center border-b pl-4 h-[5%] rounded-t-lg" sx={{ backgroundColor: palette.secondary.main }}>
                        <Typography>Opened</Typography>
                        <Typography sx={{ pl: 3 }}>Closed</Typography>

                    </Box>
                    <TicketCard></TicketCard>
                    <TicketCard></TicketCard>
                    <TicketCard></TicketCard>
                    <TicketCard></TicketCard>

                </Box>
            </div>
        </div>
    )
}