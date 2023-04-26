import { Typography } from "@mui/material";

interface LabelCardProps {
    title: string;
    withDeleteButton?: boolean;
    onDeleteClick?: () => void;
}

export const LabelCard = (props: LabelCardProps): JSX.Element => {
    return (
        <div>
            <Typography>{props.title}</Typography>
        </div>
    );
}