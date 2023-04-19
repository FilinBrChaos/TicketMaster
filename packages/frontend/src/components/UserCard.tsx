import { DeleteOutline } from '@mui/icons-material';
import { Button, Typography, Box, IconButton } from '@mui/material';

interface UserCardProps {
    name: string;
    color: string;
    onUserClickHandler?: () => void;
    onDeleteUserHandler?: () => void;
}

export function UserCard(props: UserCardProps): JSX.Element {
    return (
        <div className='flex flex-row items-center'>
            <Button onClick={props.onUserClickHandler} sx={{ mb: 1 }}>
                <div className=" flex flex-row w-64 h-12 items-center justify-between">
                    <Typography>{props.name}</Typography>
                        <Box sx={{ width: 35, height: 35, borderRadius: 100, backgroundColor: props.color }}></Box>
                </div>
            </Button>
            <IconButton sx={{ width: 40, height: 40 }} onClick={props.onDeleteUserHandler}><DeleteOutline /></IconButton>
        </div>
    )
}