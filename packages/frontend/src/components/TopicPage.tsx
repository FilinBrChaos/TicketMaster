import { Button, Typography, Box, TextField, IconButton } from '@mui/material';
import { UnderlineProjHeader } from "./UnderlineProjHeader";
import { UserCard } from "./UserCard";
import { palette } from '../context/ProjectThemeProvider';
import { Adjust, CheckCircleOutline, Send } from '@mui/icons-material';
import { useProjectContext } from '../context/ProjectContext';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { CommentCard } from './CommentCard';
import { v4 } from 'uuid';
import { ChecklistDialog } from './ChecklistDialog';
import { LabelCard } from './LabelCard';
import { Ticket, User, Label, CommentBody, Comment, Topic, Note } from '../../../lib/projectTypes';
import { LoadingPage } from './LoadingPage';

interface TopicPageProps {
    topic: Topic;
    loading?: boolean;
}

export const TopicPage = (props: TopicPageProps): JSX.Element => {
    const context = useProjectContext();
    const [ comments, setComments ] = useState<Comment[]>();
    const [ topic ] = useState(props.topic);
    const [ unassignedUsers, setUnassignedUsers ] = useState<User[]>([]);
    const [ assignedUsers, setAssignedUsers ] = useState<User[]>([]);
    const [ ticketLabels, setTicketLabels ] = useState<Label[]>([]);
    const [ notTicketLabels, setNotTicketLabels ] = useState<Label[]>([]);
    const [ commentText, setCommentText ] = useState('');
    const topicDate = new Date(topic.created_at.replace(' ', 'T'));

    useEffect(() => {
        context.apiClient.getTopicComments(topic.id).then((res) => {
            setComments(res);
        })
    }, []);

    // const assignUsersHandler = (usersIds: number[]) => {
    //     context.apiClient.assignUsersToTicket(ticket.id, usersIds).then(() => {
    //         context.apiClient.getAssignedUsers(ticket.id).then((res) => {
    //             setAssignedUsers(res);
    //         })
    //         context.apiClient.getUnassignedUsers(ticket.id).then((res) => {
    //             setUnassignedUsers(res);
    //         })
    //     })
    // }

    // const unassignUserHandler = (userId: number) => {
    //     context.apiClient.unassignUserFromTicket(ticket.id, userId).then(() => {
    //         context.apiClient.getAssignedUsers(ticket.id).then((res) => {
    //             setAssignedUsers(res);
    //         })
    //         context.apiClient.getUnassignedUsers(ticket.id).then((res) => {
    //             setUnassignedUsers(res);
    //         })
    //     })
    // }

    // const addLabelsToTicketHandler = (labelsIds: number[]) => {
    //     context.apiClient.addLabelsToTicket(ticket.id, labelsIds).then(() => {
    //         context.apiClient.getTicketLabels(ticket.id).then((res) => {
    //             setTicketLabels(res);
    //         })
    //         context.apiClient.getNotTicketLabels(ticket.id, context.getProject()).then((res) => {
    //             setNotTicketLabels(res);
    //         })    
    //     })
    // }

    // const removeLabelFromTicketHandler = (labelId: number) => {
    //     context.apiClient.removeLabelFromTicket(ticket.id, labelId).then(() => {
    //         context.apiClient.getTicketLabels(ticket.id).then((res) => {
    //             setTicketLabels(res);
    //         })
    //         context.apiClient.getNotTicketLabels(ticket.id, context.getProject()).then((res) => {
    //             setNotTicketLabels(res);
    //         })    
    //     })
    // }

    // const commentHandler = () => {
    //     if (!commentText || commentText === '') toast.error('Cannot post empty comment');
    //     const comment: CommentBody = {
    //         user_id: context.getUser().toString(),
    //         comment: commentText,
    //         project_id: context.getProject()
    //     }
    //     context.apiClient.commentTicket(ticket.id, comment).then(() => {
    //         context.apiClient.getTicketComments(ticket.id).then((res) => {
    //             console.log(JSON.stringify(res));
    //             setComments(res);
    //             setCommentText('');
    //         })
    //     })
    // }

    // const changeTicketStatusHandler = (newStatus: 'Open' | 'Closed') => {
    //     context.apiClient.changeTicketStatus(ticket.id, newStatus).then(() => {
    //         context.apiClient.getTicket(ticket.id).then((res) => {
    //             setTicket(res);
    //         })
    //     })
    // }

    if (props.loading) return <LoadingPage />
    return (
        <div className="flex flex-col items-center h-screen w-screen overflow-x-hidden">
            <UnderlineProjHeader title={props.topic.name}></UnderlineProjHeader>
            <div className="flex flex-col  min-h-[86%] w-[70%] mt-[2%]">
                    <Typography variant="h4">{props.topic.name}</Typography>
                    <Box sx={{ backgroundColor: palette.secondary.main, 
                                marginTop: 3, 
                                borderRadius: 3, 
                                marginBottom: 2 }}>
                        <Box sx={{ backgroundColor: palette.secondary.light, 
                                    padding: 1, 
                                    display: 'flex', 
                                    flexDirection: 'row', 
                                    justifyContent: 'space-between',
                                    borderRadius: 3 }}>
                            <Typography></Typography>
                            <Typography>{topicDate.toLocaleDateString()}</Typography>
                        </Box>
                        <div className=' p-3'>
                            <Typography sx={{ fontSize: 19 }}>{props.topic.description}</Typography>
                        </div>
                    </Box>

                {comments ? comments.map((comment) => <CommentCard comment={comment} key={v4()}></CommentCard>) : null}

                {context.userId ?
                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'end', mt: 4 }}>
                        <TextField label='Comment' 
                        sx={{ mr: -5 }} 
                        multiline 
                        fullWidth 
                        onChange={(e) => { setCommentText(e.target.value) }}
                        value={commentText}
                        minRows={2} />
                        {/* <IconButton onClick={commentHandler}><Send color='primary' /></IconButton> */}
                    </Box>
                    :
                    <Typography>You can't comment. Login first</Typography>
                }
            </div>
        </div>
    )
}