import { Box, Typography } from "@mui/material";
import { Comment } from "../../../lib/projectTypes"
import { palette } from '../context/ProjectThemeProvider';

interface CommentCardProps {
    comment: Comment;
}

export const CommentCard = (props: CommentCardProps): JSX.Element => {
    return (
        <div className="flex flex-row mt-7 w-full">
            <Box sx={{ width: 30, height: 30, backgroundColor: props.comment.user_color, borderRadius: 100, marginRight: 1 }}></Box>
            <Box sx={{ backgroundColor: palette.secondary.main, width: '100%', borderRadius: 3, overflow: 'hidden' }}>
                <Box sx={{ backgroundColor: palette.secondary.light, padding: 1 }}>
                    <Typography>{props.comment.user_name}</Typography>
                </Box>
                <Box sx={{ padding: 2 }}>
                    <Typography>{props.comment.comment}</Typography>
                </Box>
            </Box>
        </div>
    )
}