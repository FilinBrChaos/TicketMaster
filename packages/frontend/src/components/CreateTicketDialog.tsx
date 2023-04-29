import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { useState } from 'react';
import { useProjectContext } from '../context/ProjectContext';
import { TicketBody } from '../../../proj-api/dist/lib/projectTypes';
import { toast } from 'react-toastify';

interface CreateTicketDialogProps {
    onTicketCreate?: () => void;
}

export const CreateTicketDialog = (props: CreateTicketDialogProps): JSX.Element => {
    const context = useProjectContext();
    const [ openDialog, setOpenDialog ] = useState(false);
    const [ ticketName, setTicketName ] = useState('');
    const [ ticketDescription, setTicketDescription ] = useState('');

    const createTicketHandler = () => {
        if (!ticketName || ticketName === '') { console.log('here'); toast.error('Ticket name cannot be empty'); return; }
        const ticket: TicketBody = { 
            project_id: context.getProject(),
            description: ticketDescription,
            name: ticketName
        }
        context.apiClient.createTicket(ticket).then(() => {
            if (props.onTicketCreate) props.onTicketCreate();
        })
    }

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
                    <Button onClick={createTicketHandler}>create</Button>
                    <Button onClick={() => { setOpenDialog(false) }}>cancel</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}