import { Add } from "@mui/icons-material";
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from "@mui/material";
import { useState } from "react";

interface ItemCardProps {
    size?: 'small' | 'middle' | 'large';
    onDialogCreateClick?: (name: string, description: string) => void;
}

export function CreateItemCard(props: ItemCardProps): JSX.Element {
    const [ openCreateProjectDialog, setOpenCreateProjectDialog ] = useState(false);
    const [ dialogProjectName, setDialogProjectName ] = useState<string>('');
    const [ dialogProjectDescription, setDialogProjectDescription ] = useState('');

    return (
        <div className="flex justify-center items-center p-3 w-[90%] h-52 bg-opacity-30 bg-slate-500 rounded-lg">
            <div className="flex justify-center items-center cursor-pointer w-full h-full" 
                onClick={() => { setOpenCreateProjectDialog(true) }}>
                <Add fontSize="large" sx={{ width: 60, height: 60 }} />
            </div>

            <Dialog open={openCreateProjectDialog} maxWidth='sm' fullWidth>
                <DialogTitle>Create</DialogTitle>
                <DialogContent sx={{ display: 'flex', flexDirection: 'column' }}>
                    <TextField label='Name' 
                    sx={{ mt: 2 }} 
                    onChange={(e) => { setDialogProjectName(e.target.value) }} />
                    <TextField label='Description' 
                    sx={{ mt: 2 }} 
                    multiline 
                    minRows={2} 
                    onChange={(e) => { setDialogProjectDescription(e.target.value) }} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { 
                        setOpenCreateProjectDialog(false);
                        if (props.onDialogCreateClick) 
                            props.onDialogCreateClick(dialogProjectName, dialogProjectDescription);
                        setDialogProjectDescription('');
                    }}>Create</Button>
                    <Button onClick={() => { 
                        setDialogProjectDescription(''); 
                        setOpenCreateProjectDialog(false) }}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}