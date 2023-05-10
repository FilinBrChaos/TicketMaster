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
import { ItemCard } from './ItemCard';
import { CreateItemCard } from './CreateItemCard';
import { TicketCard } from './TicketCard';

interface TopicPageProps {
    topic: Topic;
    loading?: boolean;
}

export const TopicPage = (props: TopicPageProps): JSX.Element => {
    const context = useProjectContext();
    const [ comments, setComments ] = useState<Comment[]>();
    const [ topic ] = useState(props.topic);
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

    const commentHandler = () => {
        if (!commentText || commentText === '') toast.error('Cannot post empty comment');
        const comment: CommentBody = {
            user_id: context.getUser().toString(),
            comment: commentText,
            project_id: context.getProject()
        }
        context.apiClient.commentTopic(topic.id, comment).then(() => {
            context.apiClient.getTopicComments(topic.id).then((res) => {
                setComments(res);
                setCommentText('');
            })
        })
    }

    // const changeTicketStatusHandler = (newStatus: 'Open' | 'Closed') => {
    //     context.apiClient.changeTicketStatus(ticket.id, newStatus).then(() => {
    //         context.apiClient.getTicket(ticket.id).then((res) => {
    //             setTicket(res);
    //         })
    //     })
    // }

    if (props.loading) return <LoadingPage />
    return (
        <div className="flex flex-col items-center h-screen w-screen overflow-y-auto overflow-x-hidden">
            <UnderlineProjHeader title={props.topic.name}></UnderlineProjHeader>
            <div className="flex flex-col min-h-[86%] w-[70%] mt-[2%] pb-5">
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

                <Typography variant='h4' sx={{ mt: 3, mb: 2 }}>Notes:</Typography>
                <div className=" w-full grid grid-cols-5 gap-y-8 justify-items-center mb-10">
                    <ItemCard title='bad names' ></ItemCard>
                    <ItemCard title='it is really bad' ></ItemCard>
                    <CreateItemCard></CreateItemCard>
                </div>

                <Typography variant='h4' sx={{ mb: 2 }}>Assigned ticket:</Typography>
                <div className='border rounded-lg h-32'>
                    <TicketCard ticket={{ name: 'Organize this process', description: 'fire all bad users', id: 0, project_id: 0, created_at: '5/10/2023', updated_at: '5/10/2023' }}></TicketCard>
                </div>

                <Typography variant='h4' sx={{ mt: 4 }}>Discussion: </Typography>

                {comments ? comments.map((comment) => <CommentCard comment={comment} key={v4()}></CommentCard>) : null}

                {context.userId ?
                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'end', mt: 4, pb: 10 }}>
                        <TextField label='Comment' 
                        sx={{ mr: -5 }} 
                        multiline 
                        fullWidth 
                        onChange={(e) => { setCommentText(e.target.value) }}
                        value={commentText}
                        minRows={2} />
                        <IconButton onClick={commentHandler}><Send color='primary' /></IconButton>
                    </Box>
                    :
                    <Typography>You can't comment. Login first</Typography>
                }
            </div>
        </div>
    )
}