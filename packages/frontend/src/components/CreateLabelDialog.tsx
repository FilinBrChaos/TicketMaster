import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@mui/material"
import { useState } from 'react';

interface CreateLabelDialogProps {
    onCreateButtonClick?: (labelName: string) => void
}

export const CreateLabelDialog = (props: CreateLabelDialogProps): JSX.Element => {
    const [ open, setOpen ] = useState(false);
    const [ labelName, setLabelName ] = useState('');

    return (
        <div>
            <Button onClick={() => { setOpen(true) }}>create label</Button>
            <Dialog open={ open }>
                <DialogTitle>Create ticket</DialogTitle>
                <DialogContent>
                    <TextField onChange={(e) => {
                        if (!e.target.value) setLabelName('default');
                        else setLabelName(e.target.value);
                    }}></TextField>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { 
                        setOpen(false);
                        if (props.onCreateButtonClick) props.onCreateButtonClick(labelName);
                    }}>create</Button>
                    <Button onClick={() => { setOpen(false) }}>cancel</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}