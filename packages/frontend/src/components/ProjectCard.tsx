import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography } from "@mui/material";
import { palette } from '../context/ProjectThemeProvider';
import { Delete } from "@mui/icons-material";
import { useState } from "react";

interface ProjectCardProps {
    title?: string;
    onClick?: () => void;
    onDeleteClick?: () => void;
}

export function ProjectCard(props: ProjectCardProps): JSX.Element {
    const [ openDeleteProjectDialog, setOpenDeleteProjectDialog ] = useState(false);

    let title = props.title ? props.title : 'Project';

    return (
        <div className="flex flex-col-reverse p-3 w-[90%] h-52 rounded-lg bg-slate-200">
            <div className="flex flex-row items-center justify-between cursor-pointer">
                <Typography sx={{ color: palette.background.default, fontSize: 28 }} onClick={props.onClick}>{title}</Typography>
                <IconButton sx={{ width: 30, height: 30 }} onClick={() => { setOpenDeleteProjectDialog(true) }}><Delete /></IconButton>
            </div>

            <Dialog open={openDeleteProjectDialog}>
                <DialogTitle>Conformation</DialogTitle>
                <DialogContent>Once you delete project this action can't be undone</DialogContent>
                <DialogActions>
                    <Button variant='contained' color='error' onClick={() => { 
                        setOpenDeleteProjectDialog(false);
                        if (props.onDeleteClick) props.onDeleteClick()
                    }}>Delete</Button>
                    <Button onClick={() => { setOpenDeleteProjectDialog(false) }}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}