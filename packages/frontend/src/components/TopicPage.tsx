import { Typography, Box, TextField, IconButton } from '@mui/material';
import { UnderlineProjHeader } from "./UnderlineProjHeader";
import { palette } from '../context/ProjectThemeProvider';
import { Send } from '@mui/icons-material';
import { useProjectContext } from '../context/ProjectContext';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { CommentCard } from './CommentCard';
import { v4 } from 'uuid';
import { ChecklistDialog } from './ChecklistDialog';
import { CommentBody, Comment, Topic, Note, TicketBody, Ticket } from '../../../lib/projectTypes';
import { LoadingPage } from './LoadingPage';
import { ItemCard } from './ItemCard';
import { TicketCard } from './TicketCard';
import { useParams } from 'react-router-dom';
import { CreateTicketDialog } from './CreateTicketDialog';

interface TopicPageProps {
    topic: Topic;
    loading?: boolean;
}

export const TopicPage = (props: TopicPageProps): JSX.Element => {
    const context = useProjectContext();
    const [ comments, setComments ] = useState<Comment[]>();
    const [ topic ] = useState(props.topic);
    const [ notes, setNotes ] = useState<Note[]>([]);
    const [ notTopicNotes, setNotTopicNotes ] = useState<Note[]>([]);
    const [ commentText, setCommentText ] = useState('');
    const [ assignedTickets, setAssignedTickets ] = useState<Ticket[]>([]);
    const topicDate = new Date(topic.created_at.replace(' ', 'T'));
    const params = useParams();

    useEffect(() => {
        context.apiClient.getTopicComments(topic.id).then((res) => {
            setComments(res);
        })
        context.apiClient.getNotTopicNotes(topic.id, Number(params.retroId)).then((res) => {
            setNotTopicNotes(res)
        })
        context.apiClient.getTopicNotes(topic.id).then((res) => {
            setNotes(res);
        })
        context.apiClient.getAssignedToTopicTicket(topic.id).then((res) => {
            setAssignedTickets(res);
            console.log(JSON.stringify(res))
        })
    }, []);

    const addNotesToTopicHandler = (notesIds: number[]) => {
        context.apiClient.addNotesToTopic(topic.id, notesIds).then(() => {
            context.apiClient.getTopicNotes(topic.id).then((res) => {
                setNotes(res);
            })
            context.apiClient.getNotTopicNotes(topic.id, context.getProject()).then((res) => {
                setNotTopicNotes(res);
            })    
        })
    }

    const removeNoteFromTopic = (noteId: number) => {
        context.apiClient.removeNoteFromTopic(topic.id, noteId).then(() => {
            context.apiClient.getTopicNotes(topic.id).then((res) => {
                setNotes(res);
            })
            context.apiClient.getNotTopicNotes(topic.id, context.getProject()).then((res) => {
                setNotTopicNotes(res);
            })    
        })
    }

    const createTicketHandler = (ticketName: string, ticketDescription: string) => {
        if (!ticketName || ticketName === '') { toast.error('Ticket name cannot be empty'); return; }
        const ticket: TicketBody = { 
            project_id: context.getProject(),
            description: ticketDescription,
            name: ticketName,
            topic_id: topic.id
        }
        context.apiClient.createTicket(ticket).then(() => {
            context.apiClient.getAssignedToTopicTicket(topic.id).then((res) => {
                setAssignedTickets(res);
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
        context.apiClient.commentTopic(topic.id, comment).then(() => {
            context.apiClient.getTopicComments(topic.id).then((res) => {
                setComments(res);
                setCommentText('');
            })
        })
    }

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
                    {notes.map((note) => <ItemCard onDeleteClick={() => { removeNoteFromTopic(note.id) }} title={note.title}></ItemCard>)}
                    <ChecklistDialog buttonName='add notes'
                        onDialogSubmit={addNotesToTopicHandler}
                        layoutList={notTopicNotes.map((note) => { 
                            return { id: note.id, element: <div>{note.title}</div> 
                        }})}></ChecklistDialog>
                </div>

                <Typography variant='h4' sx={{ mb: 2 }}>Assigned ticket:</Typography>
                <div className='border mb-2'>
                    {/* <TicketCard ticket={{ name: 'Organize this process', description: 'fire all bad users', id: 0, project_id: 0, created_at: '5/10/2023', updated_at: '5/10/2023' }}></TicketCard> */}
                    {assignedTickets && assignedTickets.map((ticket) => <TicketCard ticket={ticket}></TicketCard>)}
                </div>
                <CreateTicketDialog onCreateButtonClick={createTicketHandler}></CreateTicketDialog>

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