import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Popover, Typography, Box } from '@mui/material';
import { palette } from '../context/ProjectThemeProvider';
import { Delete, Help, KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { useState } from "react";

interface TopicCardProps {
    title?: string;
    color?: string;
    description?: string;
    onClick?: () => void;
    onDeleteClick?: () => void;
}

export function TopicCard(props: TopicCardProps): JSX.Element {
    const [ openDeleteProjectDialog, setOpenDeleteProjectDialog ] = useState(false);
    const [ popoverAnchor, setPopoverAnchor ] = useState<HTMLButtonElement | null>(null);
    const cardColor = props.color && props.color !== '' ? props.color : 'rgb(241, 245, 249)';

    const popoverEnter = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setPopoverAnchor(e.currentTarget);
    }

    let title = props.title ? props.title : 'Project';
    let description = props.description ? props.description : 'No description'

    const openPopover = Boolean(popoverAnchor);
    const popoverId = openPopover ? 'simple-popover' : undefined;

    return (
        <Box className="flex flex-col-reverse justify-between items-end p-3 w-[90%] h-52 rounded-lg " sx={{ backgroundColor: cardColor }}>
            <div className="flex flex-row items-center justify-between w-full cursor-pointer bg">
                <Typography sx={{ color: palette.background.default, fontSize: 28 }} onClick={props.onClick}>{title}</Typography>
                <IconButton sx={{ width: 30, height: 30 }} onClick={() => { setOpenDeleteProjectDialog(true) }}><Delete /></IconButton>
            </div>
            <div className='flex flex-row justify-between items-start w-full'>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: palette.text.secondary }}>
                    <KeyboardArrowUp />
                    12
                    <KeyboardArrowDown />
                </Box>
                <IconButton onClick={popoverEnter} aria-describedby={popoverId}><Help /></IconButton>
            </div>
            <Popover 
                id={popoverId}
                open={openPopover} 
                anchorEl={popoverAnchor} 
                onClose={() => { setPopoverAnchor(null) }}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                    <div className="flex w-96 p-3">
                        {description}
                    </div>
            </Popover>

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
        </Box>
    )
}