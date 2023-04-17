import { Typography } from "@mui/material";
import { palette } from '../context/ProjectThemeProvider';

export function ProjectCard(): JSX.Element {
    return (
        <div className="flex flex-col-reverse p-3 w-80 h-52 rounded-lg bg-slate-200 cursor-pointer">
            <Typography sx={{ color: palette.background.default, fontSize: 28 }}>Project</Typography>
        </div>
    )
}