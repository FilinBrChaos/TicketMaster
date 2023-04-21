import { Typography } from "@mui/material";
import { palette } from '../context/ProjectThemeProvider';
import { Add } from "@mui/icons-material";

interface ProjectCardProps {
    title?: string;
    onClick?: () => void; 
    createCard?: boolean;
}

export function ProjectCard(props: ProjectCardProps): JSX.Element {
    let title = props.title ? props.title : 'Project';

    if (props.createCard) {
        return (
            <div className="flex justify-center items-center p-3 w-[90%] h-52 bg-opacity-30 bg-slate-500 rounded-lg cursor-pointer" onClick={props.onClick}>
                <Add fontSize="large" sx={{ width: 60, height: 60 }} />
            </div>
        )
    }

    return (
        <div className="flex flex-col-reverse p-3 w-[90%] h-52 rounded-lg bg-slate-200 cursor-pointer" onClick={props.onClick}>
            <Typography sx={{ color: palette.background.default, fontSize: 28 }}>{title}</Typography>
        </div>
    )
}