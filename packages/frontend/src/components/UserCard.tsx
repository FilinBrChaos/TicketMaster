import { DeleteOutline } from '@mui/icons-material';
import { Typography, Box, IconButton } from '@mui/material';

interface UserCardProps {
    name: string;
    color: string;
    onUserClickHandler?: () => void;
    onDeleteUserHandler?: () => void;
    selected?: boolean;
}

export function UserCard(props: UserCardProps): JSX.Element {
    return (
        <div className={'flex flex-row items-center mt-3 rounded-lg p-2' + (props.selected ? ' bg-slate-300 bg-opacity-80 ' : '')} >
            {/* <Button onClick={props.onUserClickHandler} sx={{ mb: 1 }} > */}
                <div className="flex flex-row w-40 h-12 items-center cursor-pointer justify-between" onClick={props.onUserClickHandler}>
                    <Typography className=' max-w-[120px] truncate'>{props.name}</Typography>
                    <Box sx={{ width: 35, height: 35, borderRadius: 100, backgroundColor: props.color }}></Box>
                </div>
            {/* </Button> */}
            <IconButton sx={{ width: 40, height: 40 }} onClick={props.onDeleteUserHandler} color='primary'><DeleteOutline /></IconButton>
        </div>
    )
}