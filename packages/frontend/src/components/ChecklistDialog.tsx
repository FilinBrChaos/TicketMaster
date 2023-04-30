import { CheckBox } from '@mui/icons-material';
import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useState } from 'react';
import { v4 } from 'uuid';

interface ChecklistDialogProps {
    buttonName: string;
    layoutList: { id: number, element: JSX.Element }[];
    onDialogSubmit?: (checkedElementsIds: number[]) => void;
}

export const ChecklistDialog = (props: ChecklistDialogProps):JSX.Element => {
    const [ openDialog, setOpenDialog ] = useState(false);
    const [ checkedIds, setCheckedIds ] = useState<number[]>([]);

    return (
        <div>
            <Button variant="contained" onClick={() => { setOpenDialog(true); setCheckedIds([]) }}>{props.buttonName}</Button>
            <Dialog open={openDialog}>
                <DialogTitle>Select</DialogTitle>
                <DialogContent>
                    {props.layoutList.map((element) => 
                        <div className='flex flex-row items-center'>
                            <Checkbox onChange={(e) => { 
                                console.log(JSON.stringify(e.target.checked));
                                let newArr;
                                if (e.target.checked) {
                                    newArr = [element.id].concat(...checkedIds);
                                } else {
                                    newArr = checkedIds.filter(id => id !== element.id)
                                }
                                //console.log(JSON.stringify(newArr));
                                setCheckedIds(newArr as number[])
                            }} />
                            {element.element}
                        </div>)}
                </DialogContent>
                <DialogActions sx={{ padding: 2 }}>
                    <Button variant='contained' onClick={() => {
                        if (props.onDialogSubmit) props.onDialogSubmit(checkedIds);
                        setOpenDialog(false);
                        setCheckedIds([]);
                    }}>ok</Button>
                    <Button onClick={() => { setCheckedIds([]); setOpenDialog(false) }}>cancel</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}