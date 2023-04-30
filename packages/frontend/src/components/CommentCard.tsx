import { Box, Typography } from "@mui/material";
import { Comment } from "../../../lib/projectTypes"
import { palette } from '../context/ProjectThemeProvider';

interface CommentCardProps {
    comment: Comment;
}

export const CommentCard = (props: CommentCardProps): JSX.Element => {
    const commentDate = new Date(props.comment.created_at.replace(' ', 'T'));

    return (
        <div className="flex flex-row mt-7 w-full">
            <Box sx={{ width: 30, height: 30, backgroundColor: props.comment.user_color, borderRadius: 100, marginRight: 1 }}></Box>
            <Box sx={{ backgroundColor: palette.secondary.main, width: '100%', borderRadius: 3, overflow: 'hidden' }}>
                <Box sx={{ backgroundColor: palette.secondary.light, 
                            padding: 1, 
                            display: 'flex', 
                            flexDirection: 'row', 
                            justifyContent: 'space-between' }}>
                    <Typography>{props.comment.user_name}</Typography>
                    <Typography>{commentDate.toLocaleDateString()}</Typography>
                </Box>
                <Box sx={{ padding: 2 }}>
                    <Typography>{props.comment.comment}</Typography>
                </Box>
            </Box>
        </div>
    )
}