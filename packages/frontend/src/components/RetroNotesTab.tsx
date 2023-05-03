import { Note, NoteBody } from "../../../lib/projectTypes"
import { useState, useEffect } from 'react';
import { ItemCard } from "./ItemCard";
import { CreateItemCard } from "./CreateItemCard";
import { useProjectContext } from '../context/ProjectContext';
import { useParams, useNavigate } from 'react-router-dom';
import { v4 } from 'uuid';

interface RetroNotesTabProps {
    notes: Note[];
}

export const RetroNotesTab = (props: RetroNotesTabProps): JSX.Element => {
    const [ notes, setNotes ] = useState(props.notes);
    const params = useParams();
    const { apiClient } = useProjectContext();
    const navigate = useNavigate();

    useEffect(() => {
        apiClient.getNotes(Number(params.retroId)).then((res) => {
            setNotes(res)
        })
    }, [])

    const createNoteHandler = (noteName: string, noteDescription: string) => {
        const note: NoteBody = {
            title: noteName,
            description: noteDescription,
            retro_id: Number(params.retroId)
        }
        apiClient.createNote(note).then(() => {
            apiClient.getNotes(Number(params.retroId)).then((res) => {
                setNotes(res);
            })
        })
    }

    const deleteNoteHandler = (noteId: number) => {
        apiClient.deleteNote(noteId).then(() => {
            apiClient.getNotes(Number(params.retroId)).then((res) => {
                setNotes(res)
            })
        })
    }

    return (
        <div className=" w-full grid grid-cols-4 gap-y-8 justify-items-center">
            {notes.length > 0 ? notes.map((note) => 
                    <ItemCard 
                        key={v4()}
                        title={note.title} 
                        description={note.description}
                        onDeleteClick={() => { deleteNoteHandler(note.id) }}
                        onClick={() => { navigate('note/' + note.id) }}></ItemCard>) 
                :
                null
            }
            <CreateItemCard onDialogCreateClick={createNoteHandler}></CreateItemCard>
        </div>
    )
}