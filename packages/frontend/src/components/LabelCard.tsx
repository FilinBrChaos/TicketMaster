import { Typography, Box, IconButton } from '@mui/material';
import { Label } from "../../../lib/projectTypes";
import { LighterDarkerColor } from '../lib/utils';
import { Close, Delete } from '@mui/icons-material';

interface LabelCardProps {
    label: Label;
    withDeleteButton?: boolean;
    onDeleteClick?: () => void;
}

export const LabelCard = (props: LabelCardProps): JSX.Element => {
    const lighterBackground = LighterDarkerColor(props.label.color, 80);

    return (
        <Box sx={{ borderWidth: '1px', 
                    borderColor: lighterBackground, 
                    color: lighterBackground, 
                    background: props.label.color,
                    height: 30,
                    paddingY: '1px',
                    paddingLeft: '10px',
                    borderRadius: 3,
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'row' }}>
            <Typography>{props.label.name}</Typography>
            {props.onDeleteClick ? 
                <IconButton onClick={props.onDeleteClick}><Close color='secondary' /></IconButton>
                :
                null
            }
        </Box>
    );
}