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
import { Ticket, User, Label, CommentBody, Comment, Topic } from '../../../lib/projectTypes';

interface TicketPageProps {
    ticket: Ticket;
    users: User[];
    labels: Label[];
    loading?: boolean;
}

export const TicketPage = (props: TicketPageProps): JSX.Element => {
    const context = useProjectContext();
    const [ comments, setComments ] = useState<Comment[]>();
    const [ ticket, setTicket ] = useState(props.ticket);
    const [ unassignedUsers, setUnassignedUsers ] = useState<User[]>([]);
    const [ assignedUsers, setAssignedUsers ] = useState<User[]>([]);
    const [ ticketLabels, setTicketLabels ] = useState<Label[]>([]);
    const [ notTicketLabels, setNotTicketLabels ] = useState<Label[]>([]);
    const [ commentText, setCommentText ] = useState('');
    const [ parentTopic, setParentTopic ] = useState<Topic | null>(null);
    const ticketDate = new Date(ticket.created_at.replace(' ', 'T'));

    useEffect(() => {
        context.apiClient.getTicketComments(ticket.id).then((res) => {
            setComments(res);
        })
        context.apiClient.getUnassignedUsers(ticket.id).then((res) => {
            setUnassignedUsers(res);
            console.log(JSON.stringify(res))
        })
        context.apiClient.getAssignedUsers(ticket.id).then((res) => {
            setAssignedUsers(res);
        })
        context.apiClient.getTicketLabels(ticket.id).then((res) => {
            setTicketLabels(res);
        })
        context.apiClient.getNotTicketLabels(ticket.id, context.getProject()).then((res) => {
            setNotTicketLabels(res);
        })
        if (ticket.topic_id) context.apiClient.getTopic(ticket.topic_id).then((res) => {
            setParentTopic(res)
        })
    }, []);

    const assignUsersHandler = (usersIds: number[]) => {
        context.apiClient.assignUsersToTicket(ticket.id, usersIds).then(() => {
            context.apiClient.getAssignedUsers(ticket.id).then((res) => {
                setAssignedUsers(res);
            })
            context.apiClient.getUnassignedUsers(ticket.id).then((res) => {
                setUnassignedUsers(res);
            })
        })
    }

    const unassignUserHandler = (userId: number) => {
        context.apiClient.unassignUserFromTicket(ticket.id, userId).then(() => {
            context.apiClient.getAssignedUsers(ticket.id).then((res) => {
                setAssignedUsers(res);
            })
            context.apiClient.getUnassignedUsers(ticket.id).then((res) => {
                setUnassignedUsers(res);
            })
        })
    }

    const addLabelsToTicketHandler = (labelsIds: number[]) => {
        context.apiClient.addLabelsToTicket(ticket.id, labelsIds).then(() => {
            context.apiClient.getTicketLabels(ticket.id).then((res) => {
                setTicketLabels(res);
            })
            context.apiClient.getNotTicketLabels(ticket.id, context.getProject()).then((res) => {
                setNotTicketLabels(res);
            })    
        })
    }

    const removeLabelFromTicketHandler = (labelId: number) => {
        context.apiClient.removeLabelFromTicket(ticket.id, labelId).then(() => {
            context.apiClient.getTicketLabels(ticket.id).then((res) => {
                setTicketLabels(res);
            })
            context.apiClient.getNotTicketLabels(ticket.id, context.getProject()).then((res) => {
                setNotTicketLabels(res);
            })    
        })
    }

    const commentHandler = () => {
        if (!commentText || commentText === '') toast.error('Cannot post empty comment');
        const comment: CommentBody = {
            user_id: context.getUser().toString(),
            comment: commentText,
            project_id: context.getProject()
        }
        context.apiClient.commentTicket(ticket.id, comment).then(() => {
            context.apiClient.getTicketComments(ticket.id).then((res) => {
                console.log(JSON.stringify(res));
                setComments(res);
                setCommentText('');
            })
        })
    }

    const changeTicketStatusHandler = (newStatus: 'Open' | 'Closed') => {
        context.apiClient.changeTicketStatus(ticket.id, newStatus).then(() => {
            context.apiClient.getTicket(ticket.id).then((res) => {
                setTicket(res);
            })
        })
    }

    return (
        <div className="flex flex-col items-center h-screen w-screen overflow-x-hidden">
            <UnderlineProjHeader title={props.ticket.name}></UnderlineProjHeader>
            <div className="flex flex-row  min-h-[86%] w-[70%] mt-[2%]">
                <div className="flex flex-col w-[70%] p-5">
                    <Typography variant="h4">{props.ticket.name}</Typography>
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
                            <Typography>{ticketDate.toLocaleDateString()}</Typography>
                        </Box>
                        <div className=' p-3'>
                            <Typography sx={{ fontSize: 19 }}>{props.ticket.description}</Typography>
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
                        <IconButton onClick={commentHandler}><Send color='primary' /></IconButton>
                    </Box>
                    :
                    <Typography>You can't comment. Login first</Typography>
                }
                </div>
                <div className="flex flex-col h-full w-[30%] border-l p-4">
                    <div className=" py-4 border-b">
                        <Typography>Assigned users</Typography>
                        {assignedUsers.map((user) => <UserCard key={v4()} 
                                                                color={user.color} 
                                                                name={user.name}
                                                                onDeleteUserHandler={() => {unassignUserHandler(user.id)}}></UserCard>)}
                        <ChecklistDialog buttonName='add' 
                            onDialogSubmit={assignUsersHandler}
                            layoutList={unassignedUsers.map((user) => { 
                                return { 
                                    id: user.id, 
                                    element: <Typography>{user.name}</Typography> 
                                }
                            })}></ChecklistDialog>

                    </div>
                    <div className=" py-4 border-b flex flex-col items-start">
                        <Typography>Labels</Typography>
                        <div className='flex flex-row flex-wrap mb-3 mt-2'>
                            {ticketLabels.map((label) => <LabelCard key={v4()} 
                                                                    label={label}
                                                                    onDeleteClick={() => { 
                                                                        removeLabelFromTicketHandler(label.id) 
                                                                    }}></LabelCard>)}
                        </div>

                        <ChecklistDialog buttonName='add'
                            onDialogSubmit={addLabelsToTicketHandler}
                            layoutList={notTicketLabels.map((label) => {
                                return {
                                    id: label.id,
                                    element: <LabelCard label={label}></LabelCard>
                                }
                            })}></ChecklistDialog>
                    </div>
                    <div className="flex flex-row items-center py-4 border-b">
                        <Typography sx={{ mr: 2 }}>Status:</Typography>
                        
                        {ticket.state && ticket.state.toString() === 'Closed' ? 
                            <div className='flex flex-row border rounded-full p-1'>
                                <CheckCircleOutline sx={{ color: 'rgb(141, 103, 217)' }} />
                                <Typography sx={{ ml: 1, mr: 1 }}>Closed</Typography>
                            </div>
                            :
                            <div className='flex flex-row border rounded-full p-1'>
                                <Adjust color='success' />
                                <Typography sx={{ ml: 1, mr: 1 }}>Open</Typography>
                            </div> 
                        }

                        <Button variant="contained" 
                                sx={{ ml: 2 }} 
                                onClick={() => {
                                    console.log(ticket.state?.toString())
                                    changeTicketStatusHandler(ticket.state?.toString() === 'Closed' ? 'Open' : 'Closed') 
                                }}>Change</Button>
                    </div>
                    <div className="flex flex-row items-center py-4 border-b">
                        <Typography>Parent topic: </Typography>
                        { parentTopic ? <Typography variant='h5' sx={{ ml: 3 }}>{parentTopic.name}</Typography> : null }
                    </div>
                </div>
            </div>
        </div>
    )
}