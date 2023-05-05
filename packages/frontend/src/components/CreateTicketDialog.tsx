import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { useState } from 'react';

interface CreateTicketDialogProps {
    onCreateButtonClick?: (name: string, description: string) => void;
}

export const CreateTicketDialog = (props: CreateTicketDialogProps): JSX.Element => {
    const [ openDialog, setOpenDialog ] = useState(false);
    const [ ticketName, setTicketName ] = useState('');
    const [ ticketDescription, setTicketDescription ] = useState('');

    return (
        <div>
            <Button variant='contained' onClick={() => { setOpenDialog(true) }}>Create</Button>
            <Dialog open={openDialog} maxWidth='sm' fullWidth>
                <DialogTitle>Create ticket</DialogTitle>
                <DialogContent sx={{ display: 'flex', flexDirection: 'column' }}>
                    <TextField label='Name' 
                        sx={{ mt: 2 }} 
                        onChange={(e) => { setTicketName(e.target.value) }} />
                    <TextField label='Description' 
                        sx={{ mt: 2 }} 
                        multiline 
                        minRows={2} 
                        onChange={(e) => { setTicketDescription(e.target.value) }} />
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={() => {
                        setOpenDialog(false);
                        if (props.onCreateButtonClick) props.onCreateButtonClick(ticketName, ticketDescription);
                    }}>create</Button>
                    <Button onClick={() => { setOpenDialog(false) }}>cancel</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}