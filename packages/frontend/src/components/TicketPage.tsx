import { Button, Typography, Box, TextField, IconButton } from '@mui/material';
import { UnderlineProjHeader } from "./UnderlineProjHeader";
import { UserCard } from "./UserCard";
import { palette } from '../context/ProjectThemeProvider';
import { Send } from '@mui/icons-material';
import { useProjectContext } from '../context/ProjectContext';
import { useState, useEffect } from 'react';
import { CommentBody, Comment, Ticket, User, Label } from '../../../lib/projectTypes';
import { toast } from 'react-toastify';
import { CommentCard } from './CommentCard';
import { v4 } from 'uuid';
import { ChecklistDialog } from './ChecklistDialog';

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
    const [ commentText, setCommentText ] = useState('');

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

    return (
        <div className="flex flex-col items-center h-screen">
            <UnderlineProjHeader title={props.ticket.name}></UnderlineProjHeader>
            <div className="flex flex-row h-[86%] w-[70%] mt-[2%]">
                <div className="flex flex-col h-full w-[70%] p-5 overflow-auto">
                    <Typography variant="h4">{props.ticket.name}</Typography>
                    <Box sx={{ backgroundColor: palette.secondary.main, marginTop: 3, borderRadius: 3, padding: 3 }}>
                        <Typography>{props.ticket.description}</Typography>

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
                    <div className=" py-4 border-b">
                        <Typography>Labels</Typography>
                        <Button variant="contained">add</Button>
                    </div>
                    <div className=" py-4 border-b">
                        <Typography>Status</Typography>
                        <Button variant="contained">Change</Button>
                    </div>
                    <div className=" py-4 border-b">
                        <Typography>Topic</Typography>
                        <Button variant="contained">add</Button>

                    </div>
                </div>
            </div>
        </div>
    )
}