export interface ProjectType {

}

export interface User extends UserBody {
    id: number;
}

export interface UserBody extends ProjectType {
    name: string;
    color?: string;
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
}

export interface Ticket extends TicketBody {
    id: number;
}

export interface TicketBody extends ProjectType {
    name: string;
    description?: string;
    assigned_user_id?: number;
    project_id: number;
    topic_id?: number;
}

export interface TicketComment {
    id?: number;
    ticket_id: number;
    comment_id: number;
}

export interface TicketLabel {
    id?: number;
    ticket_id: number;
    label_id: number;
}

export interface Comment {
    id?: number;
    comment: string;
    user_name: string;
    project_id: number;
}

export interface Retro {
    id?: number;
    name: string;
    description: string;
    project_id: number;
}

export interface Topic {
    id?: number;
    name: string;
    description: string;
    retro_id: number;
}

export interface TopicComment {
    id?: number;
    topic_id: number;
    comment_id: number;
}

export interface Note {
    id?: number;
    title: string;
    description: string;
    retro_id: number;
    topic_id?: number;
}

export interface TopicRating {
    id?: number;
    score: number;
    user_id: number;
    topic_id: number;
}