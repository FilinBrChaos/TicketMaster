import { exitCode } from "process";

export interface ProjectType {

}

export interface User extends UserBody {
    id: number;
}

export interface UserBody extends ProjectType {
    name: string;
    color: string;
}

export interface Project extends ProjectBody {
    id: number;
}

export interface ProjectBody extends ProjectType {
    name: string;
    description?: string;
}

export interface Label extends LabelBody {
    id: number;
}

export interface LabelBody extends ProjectType {
    name: string;
    project_id: number;
    color: string;
}

export interface Ticket extends TicketBody {
    id: number;
    created_at: string;
    updated_at: string;
}

export interface TicketBody extends ProjectType {
    name: string;
    description?: string;
    assigned_user_id?: number;
    project_id: number;
    topic_id?: number;
    state?: TicketState;
}

export enum TicketState {
    'Open', 'Closed'
}

export interface AssignedUser extends ProjectType {
    id: number;
}

export interface AssignedUserBody extends ProjectType {
    user_id: number;
    ticket_id: number;
}

export interface TicketComment extends TicketCommentBody {
    id: number;
}

export interface TicketCommentBody extends ProjectType {
    ticket_id: number;
    comment_id: number;
}

export interface TicketLabel {
    id: number;
}

export interface TicketLabelBody {
    ticket_id: number;
    label_id: number;
}

export interface Comment extends CommentBody {
    id: number;
    user_name: string;
    user_color: string;
    created_at: string;
    updated_at: string;
}

export interface CommentBody extends ProjectType {
    comment: string;
    user_id: string;
    project_id: number;
}

export interface Retro extends RetroBody {
    id: number;
    created_at: string;
    updated_at: string;
}

export interface RetroBody {
    name: string;
    description?: string;
    project_id: number;
    state?: RetroState;
}

export enum RetroState {
    'noting', 'grouping', 'voting', 'discussions'
}

export interface Topic extends TopicBody {
    id: number;
    created_at: string;
    updated_at: string;
}

export interface TopicBody extends ProjectType {
    name: string;
    description?: string;
    retro_id: number;
}

export interface TopicComment extends TopicCommentBody {
    id: number;
}

export interface TopicCommentBody extends ProjectType {
    topic_id: number;
    comment_id: number;
}

export interface Note extends NoteBody {
    id: number;
    created_at: string;
    updated_at: string;
}

export interface NoteBody extends ProjectType {
    title: string;
    description?: string;
    retro_id: number;
    topic_id?: number;
}

export interface TopicNote extends TopicNoteBody {
    id: number
}

export interface TopicNoteBody extends ProjectType {
    note_id: number;
    topic_id: number;
}

export interface TopicRating extends TopicRatingBody {
    id: number;
    score_sum: number;
}

export interface TopicRatingBody extends ProjectType {
    score: number;
    user_id: number;
    topic_id: number;
}