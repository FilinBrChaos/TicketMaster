export interface ProjectType {

}

export interface Client extends ProjectType {
    name: string;
}

export interface Project extends ProjectType {
    name: string;
    description: string;
}

export interface Label {
    name: string;
    project_id: number;
}

export interface Ticket {
    name: string;
    description: string;
    assigned_client_id?: number;
    project_id: number;
    topic_id?: number;
}

export interface TicketComment {
    ticket_id: number;
    comment_id: number;
}

export interface TicketLabel {
    ticket_id: number;
    label_id: number;
}

export interface Comment {
    comment: string;
    client_name: string;
    project_id: number;
}

export interface Retro {
    name: string;
    description: string;
    project_id: number;
}

export interface Topic {
    name: string;
    description: string;
    retro_id: number;
}

export interface TopicComment {
    topic_id: number;
    comment_id: number;
}

export interface Note {
    title: string;
    description: string;
    retro_id: number;
    topic_id?: number;
}

export interface TopicRating {
    score: number;
    user_id: number;
    topic_id: number;
}