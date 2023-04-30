import { Typography, Box, IconButton } from '@mui/material';
import { Label } from "../../../lib/projectTypes";
import { LighterDarkerColor } from '../lib/utils';
import { Delete } from '@mui/icons-material';

interface LabelCardProps {
    label: Label;
    withDeleteButton?: boolean;
    onDeleteClick?: () => void;
}

export const LabelCard = (props: LabelCardProps): JSX.Element => {
    const lighterBackground = LighterDarkerColor(props.label.color, 80);

    return (
        <div className='flex flex-row items-center'>
            <Box sx={{ borderWidth: '1px', 
                        borderColor: lighterBackground, 
                        color: lighterBackground, 
                        background: props.label.color,
                        height: 30,
                        paddingY: '1px',
                        paddingX: '10px',
                        borderRadius: 3 }}>
                <Typography>{props.label.name}</Typography>
            </Box>
            {props.onDeleteClick ? 
                <IconButton><Delete color='primary' /></IconButton>
                :
                null
            }
        </div>
    );
}