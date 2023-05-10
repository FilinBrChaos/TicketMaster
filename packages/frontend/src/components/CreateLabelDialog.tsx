import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Box } from "@mui/material"
import { useState } from 'react';

interface CreateLabelDialogProps {
    onCreateButtonClick?: (labelName: string, labelColor: string) => void
}

export const CreateLabelDialog = (props: CreateLabelDialogProps): JSX.Element => {
    const [ open, setOpen ] = useState(false);
    const [ labelName, setLabelName ] = useState('');
    const [ newLabelColor, setNewLabelColor ] = useState('#F9FAFB');

    return (
        <div>
            <Button onClick={() => { setOpen(true) }}>create label</Button>
            <Dialog open={ open }>
                <DialogTitle>Create ticket</DialogTitle>
                <DialogContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Box sx={{ width: 50, height: 50, borderRadius: 8, mt: 4, mb: 2, backgroundColor: newLabelColor }}></Box>
                    <Button sx={{ mb: 4 }} onClick={() => { 
                        setNewLabelColor('#'+(0x1000000+Math.random()*0xffffff).toString(16).substr(1,6).toUpperCase()) 
                    }}>change</Button>

                    <TextField label="Name" onChange={(e) => {
                        if (!e.target.value) setLabelName('default');
                        else setLabelName(e.target.value);
                    }}></TextField>
                </DialogContent>
                <DialogActions sx={{ padding: 2 }}>
                    <Button variant="contained"
                        onClick={() => { 
                        setOpen(false);
                        if (props.onCreateButtonClick) props.onCreateButtonClick(labelName, newLabelColor);
                    }}>create</Button>
                    <Button onClick={() => { setOpen(false) }}>cancel</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}